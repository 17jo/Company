using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Company.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Task_XController : ControllerBase
    {
        Context Context { get; set; }

        public Task_XController(Context context)
        {
            Context = context;
        }

        [Route("AddTask/{id_Employee}/{title}/{description}/{duoDate}")]
        [HttpPost]
        public async Task<ActionResult> AddSector(int id_Employee,string title, string description, DateTime duoDate)
        {
            var check = Context.Tasks.Where(p=> p.Title == title).FirstOrDefault();
            if(check!=null) return BadRequest("Task whit this title exist");

            var employee = Context.Employees.Where(p=> p.ID == id_Employee).FirstOrDefault();
            if(employee==null) return BadRequest("This employee doesnt exist");

            Task_X newTask = new Task_X();
            newTask.Title=title;
            newTask.Description=description;
            newTask.DuoDate = duoDate;
            newTask.Assignee = employee;
            try{
                Context.Tasks.Add(newTask);
                await Context.SaveChangesAsync();
                return Ok(newTask);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetTasks")]
        [HttpGet]
        public async Task<ActionResult> GetTasks()
        {
            var tasks = await Context.Tasks.Include(p=>p.Assignee).Select(p=>new{Asssigne=p.Assignee,title=p.Title,description=p.Description}).ToListAsync();
            try
            {
                return Ok(tasks);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("EmployeesWhitTasksFromLastMonth/{id_sector}")]
        [HttpGet]
        public async Task<ActionResult> EmployeesWhitTasksFromLastMonth(int id_sector)
        {
            DateTime LastMonth;
            LastMonth = DateTime.Now;
            LastMonth = LastMonth.AddMonths(-1);
            
            var tasks = await Context.Tasks.Include(p=>p.Assignee)
                                            .Include(p=>p.Assignee.Sector)
                                            .Where(p=>p.DuoDate.Month==LastMonth.Month && p.Assignee.Sector.ID==id_sector)
                                            .Select(p=> new {fullName = p.Assignee.FullName, email = p.Assignee.Email})
                                            .ToListAsync();
            try
            {
                return Ok(tasks.Distinct());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ChangeDuoDate/{ID}/{newDuoDate}")]
        [HttpPut]
        public async Task<ActionResult> ChangePhoneNumber(int ID, DateTime newDuoDate)
        {
            var task = Context.Tasks.Where(p=>p.ID==ID).FirstOrDefault();
            if(task==null) return Ok(false);
            try{    
                    task.DuoDate=newDuoDate;
                    await Context.SaveChangesAsync();
                    return Ok(task);   
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteTask/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
             try{
                var task = await Context.Tasks.Where(p => p.ID == id).FirstOrDefaultAsync();
                Context.Tasks.Remove(task);
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
