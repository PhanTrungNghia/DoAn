using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_employee_management.Models
{
    [Table("EMPLOYEES")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDEMPLOYEE")]
        public int IdEmployee { get; set; }
        [StringLength(50)]
        [Column("NAME")]
        public string? Name { get; set; }
        [StringLength(100)]
        [Column("AGE")]
        public string? Age { get; set; }
        [Required]
        [Column("ISACTIVE")]
        public int IsActive { get; set; }
    }
}
