import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component(
           { 
               selector: 'employeemanager',
               templateUrl: 'register.component.html' ,
                styleUrls: ['./register.component.css']
           }
)
export class RegisterComponent implements OnInit {
    constructor( private router: ActivatedRoute,
                 private router1: Router) {};
    user : string ;

   ngOnInit()
    {
        this.user = this.router.snapshot.paramMap.get('p1');
    }

}





