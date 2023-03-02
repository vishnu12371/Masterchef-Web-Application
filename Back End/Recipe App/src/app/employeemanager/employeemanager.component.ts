import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({ selector: 'app-root',
             templateUrl: 'employeemanager.componenet.html',
             styleUrls: ['./employeemanager.component.css']
              }
           )
export class EmployeeManagerComponent {


  public employees: Employee[];
  public editEmployees: Employee;
  public deleteEmployee: Employee;
  public softdeleteEmployee: Employee;
  constructor(private employeeService: EmployeeService,
              private router: Router) {}
  

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void
  {
    this.employeeService.GetEmployees().subscribe(
    (response: Employee[]) =>{this.employees = response;},(error: HttpErrorResponse) =>{alert(error.message)});
  }
  public onAddEmployee(addForm: NgForm): void
  {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) => { console.log(response); this.getEmployees();},
      (error: HttpErrorResponse) => {alert(error.message)});
      //addForm.reset();
  }
  public onUpdateEmployee(employee: Employee): void
  {
    this.employeeService.UpdateEmployees(employee).subscribe(
      (
        response: Employee) => { console.log(response); 
        this.getEmployees();},
      (
        error: HttpErrorResponse) => {alert(error.message)});

  }
  public ondeleteEmployee(employeeId : number): void
  {
    this.employeeService.deletEmployees(employeeId).subscribe(
      (
        response: void) => { console.log(response); 
        this.getEmployees();},
        (error: HttpErrorResponse) => {alert(error.message)});
  }
  public onsoftDeleteEmployee(employeeId : number): void
  {
    this.employeeService.softdeleteEmployee(employeeId).subscribe(
      (response: void) => { console.log(response);
      this.getEmployees();},
      (error: HttpErrorResponse) => {alert(error.message)});
  }
  public onOpenModal(employee: Employee, mode : string): void
  {
     const container = document.getElementById('main-container');
     const button = document.createElement('button');
     button.type = 'button';
     button.style.display = 'none';
     button.setAttribute('data-toggle','modal');
     if( mode === 'add')
     {
      button.setAttribute('data-target','#addEmployeeModal');
     }
     if( mode === 'edit')
     {
       this.editEmployees = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
     }
     if( mode === 'delete')
     {
       this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
     }
     if( mode === 'softdelete')
     {
        this.softdeleteEmployee = employee;
        button.setAttribute('data-target','#softdeleteEmployeeModal');
     }
     container.appendChild(button);
     button.click();
  }

  

}

