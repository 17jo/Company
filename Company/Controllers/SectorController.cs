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
    public class SectorController : ControllerBase
    {
        Context Context { get; set; }

        public SectorController(Context context)
        {
            Context = context;
        }

        [Route("AddSector/{name}")]
        [HttpPost]
        public async Task<ActionResult> AddSector(string name)
        {
            var check = Context.Sectors.Where(p=> p.Name==name).FirstOrDefault();
            if(check!=null) return BadRequest("Sector whit this name exist");

            Sector sector = new Sector();
            sector.Name = name;
            try{
                Context.Sectors.Add(sector);
                await Context.SaveChangesAsync();
                return Ok(sector);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetSectors")]
        [HttpGet]
        public async Task<ActionResult> GetSectors()
        {
            var sectors = await Context.Sectors.Select(p=> new {Name = p.Name, ID = p.ID}).ToListAsync();
            try
            {
                return Ok(sectors);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("GetSectorEmployees/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetSectorEmployees(int id)
        {
            var sector = await Context.Sectors.Include(p=>p.Employees)
                                            .Where(p=> p.ID==id).ToListAsync();
            try
            {
                return Ok(sector);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetSectors/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetSectors(int id)
        {
            var sector = await Context.Sectors.Where(p=> p.ID==id).ToListAsync();
            try
            {
                return Ok(sector);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

       

        [Route("ChangeName/{name}/{newName}")]
        [HttpPut]
        public async Task<ActionResult> ChangePhoneNumber(string name,string newName)
        {
            var checkName = Context.Sectors.Where(p=>p.Name==newName).FirstOrDefault();
            if(checkName!=null) return Ok(false);
            try{    
                var sector = await Context.Sectors.Where(p => p.Name == name).FirstOrDefaultAsync();
                    if(sector==null) return Ok("Employee doesnt exist");
                        sector.Name=newName;
                    await Context.SaveChangesAsync();
                    return Ok(true);   
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteSector/{name}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteEmployee(string name)
        {
             try{
                var sector = await Context.Sectors.Where(p => p.Name == name).FirstOrDefaultAsync();
                Context.Sectors.Remove(sector);
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