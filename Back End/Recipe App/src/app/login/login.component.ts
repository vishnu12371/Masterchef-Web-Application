import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './login';
import { loginservice } from './login.service';

@Component(
           { selector: 'login',
             templateUrl: 'login.component.html',
             styleUrls: ['./login.component.css'] 
           }
          )
          
export class LoginComponent {
    public login: Login;
    public log: string;
    public check: string;


    constructor(private loginService: loginservice,
                private router: Router,
     
                ) {}
        
    ngOnInit() : void 
    {

    }  

    public Onsuccess(): void
     { 
         window.location.reload();
      this.router.navigate(['/login']);
    }    

    public  onGetLogin(addForm1: NgForm) : void
    {
      
        if( ( addForm1.value.username != null ) && ( addForm1.value.password != null ) )
        {
        this.loginService.GetLoginDetails(addForm1.value.username, addForm1.value.password ).subscribe(
       (response: Login) => {console.log(response); this.router.navigate(['/register',addForm1.value.username]);}, 
        (error: HttpErrorResponse) => {addForm1.reset();});
        }
        else
        alert("Username/Passowrd is blank");

    }

    public onAddLogin(addForm: NgForm) : void
    {
        document.getElementById('add-login-form').click();
        this.loginService.addLoginDetails(addForm.value).subscribe
        (
            (response: Login) => 
            {
                console.log(response); 
                alert("Successfully created Credentials")
                addForm.reset();
            }, 
             (error: HttpErrorResponse) =>
              {
               }
        );
    }

    public onOpenModal(login: Login, mode : string): void
    {
       const container = document.getElementById('main-container');
       const button = document.createElement('button');
       button.type = 'button';
       button.style.display = 'none';  
       button.setAttribute('data-toggle','modal');
     if(mode == 'register')
     {
         button.setAttribute('data-target', '#addLoginModal')
     }
     container.appendChild(button);
     button.click();
    }  


   
}





