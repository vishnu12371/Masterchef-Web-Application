package project.demo.employee.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;


@Entity 
public class Employee implements Serializable
{
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;
    private String name;
    private String email;
    private String jobTitle;
    private String ph_number;
    private String image_url;
    @Column(nullable = false, updatable = false)
    private String employeeid;

    public Employee() {}

    public Employee(String name, String email, String jobTitle, String ph_number,String image_url, String employeeid)
    {
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.ph_number = ph_number;
        this.image_url = image_url;
        this.employeeid = employeeid;
    }

    public long getId()
    { 
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getEmail()
    {
       return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getJobTitle()
    {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle)
    {
        this.jobTitle = jobTitle;
    }

   
    public String getPhone()
    {
        return ph_number;
    }

    public void setphone(String ph_number )
    {
        this.ph_number = ph_number;
    }

    public String getimageUrl()
    {
        return image_url;   
    }

    public void setimageUrl(String image_url)
    {
        this.image_url = image_url;
    }

    public String getemployeeid()  
    {
      return employeeid;
    }

    public void setemployeecode(String employeeid)
    {
        this.employeeid = employeeid;
    }


    @Override
    public String toString()
    {
    return "EmployeeDetails[ ID,NAME,EMAIL,JOBTITLE,PHONE,EMPLOYEEID :" +id +  "," +name +", " +jobTitle +"," +ph_number 
    + ","  +employeeid + ",";
    }


}
