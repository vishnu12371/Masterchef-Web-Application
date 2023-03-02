import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "./login"


@Injectable({
    providedIn : 'root'
})

export class loginservice 
{ 
    public log: string;
    private login: Login;
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

//Get Login Details
public GetLoginDetails(username: string, password: string): Observable<Login>
{
   
   return this.http.get<Login>(`${this.apiServerUrl}/login/get/${username}/${password}`); 

}

//Post Login Detail
public addLoginDetails(login: Login): Observable<Login>
{
    return this.http.post<Login>(`${this.apiServerUrl}/login/add`, login);
}

}