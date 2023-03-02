package project.demo.employee.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.demo.employee.Model.Login;

public interface LoginRepo extends JpaRepository<Login, String> 
{
    @Query(value = "SELECT * FROM login where login.username = :username and login.password = :password", nativeQuery = true)
    Optional <Login> getLoginIdPass(@Param("username") String username,@Param("password") String password);

  //  @Query(value = "insert into `login` (`login.username` `login.password`) values (':username', ':password')", nativeQuery = true)
  //  Login savelogin(@Param("username") String username, @Param("password") String password);
}
