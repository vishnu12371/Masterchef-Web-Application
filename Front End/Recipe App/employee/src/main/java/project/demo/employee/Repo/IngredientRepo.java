package project.demo.employee.Repo;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.demo.employee.Model.ingredient;

@Transactional
public interface IngredientRepo extends JpaRepository<ingredient, Long> 
{
    @Query(value = "SELECT * FROM ingredient ing where ing.recipeid = :recid", nativeQuery = true)
    List<ingredient> findIngById(@Param("recid")Long recid);

    @Modifying()
    @Query(value = "DELETE  FROM ingredient ing  WHERE ing.recipeid = :recid", nativeQuery = true)
    void deleteRecipeById(@Param("recid") Long recid);
}
