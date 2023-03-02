import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { promisify } from "util"
import { Recipe } from '../home/recipe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../Recipe/ingredient';
import { Content } from '../Recipe/content';
import { Video } from './video';
import { HttpErrorResponse } from '@angular/common/http';
import { Image } from './image';
import {UserEntry} from '../Recipe/userentry'

@Injectable({
  providedIn: 'root'
})




export class UploadService {

  
  link : string = '';
  vidarray = new Array<Video>();
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){ }

  async addRecipeheader(recipe: Recipe): Promise<Recipe>
  {
    return this.http.post<Recipe>(`${this.apiServerUrl}/recipe/addheader`, recipe).toPromise();
    
  }
  public addRecipeIngredients(ingredients: Ingredient[]): Observable<Ingredient[]>
  {
    return this.http.post<Ingredient[]>(`${this.apiServerUrl}/recipe/addIngr`, ingredients);
  }
  public addRecipeContents(contents: Content []): Observable<Content[]>
  {
    return this.http.post<Content[]>(`${this.apiServerUrl}/recipe/addCont`, contents);
  }

  public deleteRecipe(id : number,flag : number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/recipe/deleterecipe/${id}/${flag}`);
  }

  async addUserEntry(userentry : UserEntry): Promise<UserEntry>
  {
    return this.http.post<UserEntry>(`${this.apiServerUrl}/recipe/adduserentry`, userentry).toPromise();
  }

  async uploadRecipe(recipe : Recipe): Promise<Recipe>
  {
    return this.http.put<Recipe>(`${this.apiServerUrl}/recipe/updaterec`, recipe).toPromise();
  }
  

  public uploadVideo(video : Video): Observable<Video>
  {
    return this.http.put<Video>(`${this.apiServerUrl}/recipe/updateVid`, video);
  }

  async fileUpload(file : any,upload : number,recupd: number,recipeid : number) 
  {
   
    var contentType = "";
    if (upload == 1 )
    {
      contentType = "video/mp4";
    }
    else if (upload == 2 )
    {
      contentType = file.type;
    }

  const bucket = new S3(
  {
  accessKeyId: 'AKIAQ3VDMYHGHNJBG7NJ',
  secretAccessKey: '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',
  region: 'us-east-1',
  signatureVersion: 'v4'
  });

  const params = {
  Bucket: 'host-recipe-app',
  Key: file.name,
  Body: file,
  ContentType: contentType
  
  };
  
  const options = {
    partSize: 200 * 1024 * 1024,
    queueSize: 30,
};
//Get url to Post File in s3 Bucket
 //Post using the URL

 bucket.upload(params,options,  (err : any, data : any) => 
 {
  if (err) 
  {
  console.log('EROOR: ',JSON.stringify( err));
  return false;
  }
if(upload == 1)
{
  const video = {} as Video;
  console.log('File Uploaded.', data.Location);
  video.videoUrl = data.Location;
  video.recipeid = recipeid;

  //return this.http.post<Video>(`${this.apiServerUrl}/recipe/addvideo`, video);
  this.http.post<Video>(`${this.apiServerUrl}/recipe/addvideo`, video).subscribe(
    (response: Video) => { 
        console.log(response); 
    },
    (error: HttpErrorResponse) => {alert(error.message)});

}
else if (upload == 2)
{

  const image = {} as Image;
  console.log('File Uploaded.', data.Location);
  image.imageUrl = data.Location;
  image.recipeid = recipeid;
  //return this.http.post<Video>(`${this.apiServerUrl}/recipe/addvideo`, video);
  this.http.post<Image>(`${this.apiServerUrl}/recipe/addimage/${recupd}`, image).subscribe(
    (response: Image) => { 
        console.log(response); 
    },
    (error: HttpErrorResponse) => {alert(error.message)});
}
  });
}

}