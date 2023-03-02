package project.demo.employee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.demo.employee.Model.Login;
import project.demo.employee.service.LoginService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/login")
public class LoginResource 
{
   private final LoginService loginservice;

//call to initialize login service model
   public LoginResource(LoginService loginservice)
   {
       this.loginservice = loginservice;
   }

//get Login Details
@GetMapping(value="/get/{username}/{password}")
public ResponseEntity<Login> getLoginDetails(@PathVariable("username") String username, @PathVariable("password") String password) 
{
    //Login login = loginservice.getLogin(username, password);
    //String log = loginservice.getLogin(username, password);
    Login login  = loginservice.getLogin(username, password);
    return new ResponseEntity<>(login,HttpStatus.OK);
}


//Add Login Details
@PostMapping(value = "/add")
public ResponseEntity<Login> addLogin(@RequestBody Login login)
{
    Login newlogin  = loginservice.updateLogin(login);
    return new ResponseEntity<>(newlogin,HttpStatus.OK);

}

}
