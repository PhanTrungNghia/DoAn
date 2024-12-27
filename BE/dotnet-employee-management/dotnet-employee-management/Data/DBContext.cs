using dotnet_employee_management.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_employee_management.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Admission> Admissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.IsActive)
                .HasDefaultValue(0);
            });

            base.OnModelCreating(modelBuilder);
        }

    }
}
