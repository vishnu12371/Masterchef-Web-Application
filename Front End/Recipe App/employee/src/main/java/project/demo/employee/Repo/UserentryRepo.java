package project.demo.employee.Repo;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.demo.employee.Model.userentry;

@Transactional
public interface UserentryRepo extends JpaRepository<userentry, String>{


    @Query(value = "SELECT * FROM userentry user where user.recipeid = :recid", nativeQuery = true)
    List<userentry> findUserentryById(@Param("recid")Long recid);

    @Modifying()
    @Query(value = "DELETE  FROM userentry user WHERE user.recipeid = :recid", nativeQuery = true)
    void deleteRecipeById(@Param("recid") Long recid);
    
}
