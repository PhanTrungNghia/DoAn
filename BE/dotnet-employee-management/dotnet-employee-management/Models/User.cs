using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace dotnet_employee_management.Models
{
    [Table("USERS")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public int ID { get; set; }
        [StringLength(50)]
        [Column("NAME")]
        public string NAME { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }    
        [Column("PASSWORD")]
        public string PASSWORD { get; set; }
        public string Role  { get; set; }
        [Column("TOKEN")]
        public string? TOKEN { get; set; }
    }
}
