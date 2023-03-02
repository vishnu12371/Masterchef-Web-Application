package project.demo.employee.Repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.demo.employee.Model.video;

@Transactional
public interface VideoRepo extends JpaRepository<video, String>  {

    @Query(value = "SELECT * FROM video vid WHERE vid.recipeid = :recipeid", nativeQuery = true)
    video findById(@Param("recipeid") Long recipeid);

    @Modifying()
    @Query(value = "DELETE  FROM  video vid WHERE vid.recipeid = :recid", nativeQuery = true)
    void deleteRecipeById(@Param("recid") Long recid);
    
    
}


