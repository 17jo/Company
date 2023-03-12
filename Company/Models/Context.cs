using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions options):base(options){}

        public DbSet<Employee> Employees {get; set;}
        public DbSet<Sector> Sectors {get; set;}
        public DbSet<Task_X> Tasks {get; set;}}
}