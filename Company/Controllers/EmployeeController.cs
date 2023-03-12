using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;


namespace Company.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        Context Context { get; set; }

        public EmployeeController(Context context)
        {
            Context = context;
        }

        [Route("AddEmployee/{fullName}/{email}/{phone}/{dateOfBirth}/{monthsalary}/{id_sector}")]
        [HttpPost]
        public async Task<ActionResult> AddEmployee(string fullName,string email,int phone,DateTime dateOfBirth,float monthsalary, int id_sector)
        {
            var sector = await Context.Sectors.Where(k=> k.ID==id_sector).FirstOrDefaultAsync();
            if(sector==null) return BadRequest("Sector dont exist!");

            var check = await Context.Employees.Where(p=> p.PhoneNumber==phone).FirstOrDefaultAsync();
            if(check!=null) return BadRequest("Employee whit this phone exist");

           
            try{

                Employee employee = new Employee();
                employee.Sector=sector;
                employee.FullName=fullName;
                employee.Email=email;
                employee.PhoneNumber=phone;
                employee.DateOfBirth=dateOfBirth;
                employee.MonthSalary=monthsalary;

                Context.Employees.Add(employee);
                await Context.SaveChangesAsync();
                return Ok(true);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetEmployees")]
        [HttpGet]
        public async Task<ActionResult> GetEmployees()
        {
            var employees = await Context.Employees.ToListAsync();
            try
            {
                return Ok(employees);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetEmployees/{id_sector}")]
        [HttpGet]
        public async Task<ActionResult> GetEmployees(int id_sector)
        {
            var employee = await Context.Employees.Include(p=>p.Sector)
                                                .Where(p=> p.Sector.ID==id_sector)
                                                .Select(p=>new{Email=p.Email, ID=p.ID})
                                                .ToListAsync();
            try
            {
                return Ok(employee);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetEmployeesFromSector/{ID_Sector}")]
        [HttpGet]
        public async Task<ActionResult> GetEmployeesFromSector(int ID_Sector)
        {
            var es = await Context.Employees.Include(p=>p.Sector).Where(p=> p.Sector.ID==ID_Sector).ToListAsync();

            try
            {
                return Ok(es);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ChangePhoneNumber/{fullName}/{number}/{newNumber}")]
        [HttpPut]
        public async Task<ActionResult> ChangePhoneNumber(string fullName,int number,int newNumber)
        {
            var checkNumberExist = Context.Employees.Where(p=>p.PhoneNumber==newNumber).FirstOrDefault();
            if(checkNumberExist!=null) return Ok(false);
            try{    
                var employee = await Context.Employees.Where(p => p.FullName == fullName && p.PhoneNumber==number).FirstOrDefaultAsync();
                    if(employee==null) return Ok("Employee doesnt exist");
                        employee.PhoneNumber=newNumber;
                    await Context.SaveChangesAsync();
                    return Ok(true);   
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteEmployee/{email}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteEmployee(string email)
        {
            try
            {
                var employee = await Context.Employees.Where(p => p.Email==email).FirstOrDefaultAsync();
                var tasks = await Context.Tasks.Where(p=>p.Assignee.Email==email).ToListAsync();
                if(employee==null) return BadRequest("Doesnt exist");
                if(tasks!=null)
                {
                    foreach(var task in tasks)
                    {
                       Context.Tasks.Remove(task); 
                    } 
                }
                Context.Employees.Remove(employee);
                await Context.SaveChangesAsync();
                return Ok(true);
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
        }

    }
}