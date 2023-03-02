package project.demo.employee.service;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.demo.employee.Model.Employee;
import project.demo.employee.Repo.EmployeeRepo;
import project.demo.employee.Exception.UserNotFoundException;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo)
     {
         this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) 
    {
            employee.setemployeecode(UUID.randomUUID().toString());
            return employeeRepo.save(employee);
    }

    public List<Employee> findallemployees()
    {
        return employeeRepo.findAll();
    }

    public Employee UpdateEmployee(Employee employee)
    {
        return employeeRepo.save(employee);
    }


    public void  deleteEmployee(Long id)
    {
        employeeRepo.deleteEmployeeById(id);
    }

    public Employee GetEmployee(Long id)
    {
        return employeeRepo.findEmployeeById(id)
         .orElseThrow(() -> new UserNotFoundException("No such employee" +id));
    }

}
