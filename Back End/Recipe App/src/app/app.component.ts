import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
 {

  fileSelected: any = null;

  iconVisible: boolean;
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  public employees: Employee[];
  public editEmployees: Employee;
  public deleteEmployee: Employee;
  public softdeleteEmployee: Employee;
  constructor(private employeeService: EmployeeService,
              private router: Router) {}
  


  ngOnInit(): void {
   
    this.router.navigate(['/home']);
   // this.getEmployees();
  }

}
