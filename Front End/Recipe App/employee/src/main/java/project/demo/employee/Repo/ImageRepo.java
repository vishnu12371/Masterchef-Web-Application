package project.demo.employee.Repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.demo.employee.Model.image;

@Transactional
public interface ImageRepo extends JpaRepository<image, String>  {

    @Query(value = "SELECT * FROM image img WHERE img.recipeid = :recipeid", nativeQuery = true)
    List<image> findById(@Param("recipeid") Long recipeid);

    @Modifying()
    @Query(value = "DELETE  FROM image img  WHERE img.recipeid = :recid", nativeQuery = true)
    void deleteRecipeById(@Param("recid") Long recid);
}
    
    


