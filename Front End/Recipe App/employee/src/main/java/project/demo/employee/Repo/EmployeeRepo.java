package project.demo.employee.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

import project.demo.employee.Model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>
{
//Query
    void deleteEmployeeById(Long id);
//Query
    Optional<Employee> findEmployeeById(Long id);


}
