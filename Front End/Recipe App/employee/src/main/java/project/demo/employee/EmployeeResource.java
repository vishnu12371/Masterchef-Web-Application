package project.demo.employee;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.demo.employee.Model.Employee;
import project.demo.employee.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeResource 
{

    private final EmployeeService employeeService;
//Call to inititalize Server Model
    public EmployeeResource(EmployeeService employeeService)
    {
        this.employeeService = employeeService;
    }
//Get All the List of Employees
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees()
    {
        List<Employee> employees = employeeService.findallemployees();
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }
//Find Employee from Id
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getbyEmployeeId (@PathVariable("id") Long id)
    {
    Employee employee = employeeService.GetEmployee(id);
    return new ResponseEntity<>(employee,HttpStatus.OK);
    }

//Add a New Employee
    @PostMapping("/add")
    public ResponseEntity<Employee> addemployee(@RequestBody Employee employee)
    {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee,HttpStatus.OK);
    }

//Update Exisitng EMployee
    @PutMapping("/update")
    public ResponseEntity<Employee> updateemployee(@RequestBody Employee employee)
    {
        Employee Updateemployee = employeeService.UpdateEmployee(employee);
        return new ResponseEntity<>(Updateemployee,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteemployee(@PathVariable("id") Long id)
    {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
