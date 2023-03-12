using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        public string FullName { get; set; }
        
        [MaxLength(30)]
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public float MonthSalary { get; set; }    
        [JsonIgnore]
        public Sector Sector { get; set; }
        public List<Task_X> TasksOfTheEmployee { get; set; }
    }
}