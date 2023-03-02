import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService 
{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){ }

//Get All Employee
  public GetEmployees(): Observable<Employee[]>
     {
       return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
     }
//Add and Employee
     public addEmployees(employee: Employee): Observable<Employee>
     {
       return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
     }
//Update an Existing Employee
     public UpdateEmployees(employee: Employee): Observable<Employee>
     {
       return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
     }    

//Delete an Employee
     public deletEmployees(employeeId : number): Observable<void>
     {
      return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
     }    

     public softdeleteEmployee(employeeId : number): Observable<void>
     {
       return this.http.put<void>(`${this.apiServerUrl}/employee/updateisdel/${employeeId}`, employeeId);
     }
}

