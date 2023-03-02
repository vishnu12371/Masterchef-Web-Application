package project.demo.employee.Exception;

public class LoginNotFoundException extends RuntimeException {
    
    public LoginNotFoundException(String message) 
    {
        super(message);
    }
}
