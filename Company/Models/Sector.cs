
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Sector")]
    public class Sector
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }

        public List<Employee> Employees { get; set; }
    }
}