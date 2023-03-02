package project.demo.employee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.demo.employee.Model.Login;
import project.demo.employee.Repo.LoginRepo;
import project.demo.employee.Exception.LoginNotFoundException;

@Service
public class LoginService {
    private final LoginRepo loginrepo;
    public Login login;
    public String log;

    @Autowired
//Initialize Model
   public LoginService( LoginRepo loginrepo)
   {
       this.loginrepo = loginrepo;
   }
//Get Login Details
   

//Create new login
   public Login updateLogin( Login login)
   {
        return loginrepo.save(login);
   }

//fetch Existing Login
    public Login  getLogin(String username, String password)
    {

        return loginrepo.getLoginIdPass(username, password)
          .orElseThrow(() -> new LoginNotFoundException("Not Found User" + username  +password));
       // if (login == null)log = "1"; else log = "2";
      //  return log;
    }

}
