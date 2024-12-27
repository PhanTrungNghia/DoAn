using Dapper;
using dotnet_employee_management.Models;
using Microsoft.Data.SqlClient;  // Use SQL Server client instead of Oracle
using System.Data;

namespace dotnet_employee_management.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _config;

        public EmployeeRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<int> AddAsync(Employee employ)
        {
            var sql = "INSERT INTO EMPLOYEES (Name, Age, IsActive)" +
                      "VALUES (@Name, @Age, @IsActive)";  // Use @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, employ);
        }

        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM EMPLOYEES WHERE IDEmployee = @IdEmployee";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, new { IdEmployee = id });
        }

        public async Task<IReadOnlyList<Employee>> GetAllAsync()
        {
            var sql = "SELECT * FROM EMPLOYEES";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            var result = await connection.QueryAsync<Employee>(sql);
            return result.ToList();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM EMPLOYEES WHERE IDEmployee = @IdEmployee";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<Employee>(sql, new { IdEmployee = id });
            return result ?? null;
        }

        public async Task<int> UpdateAsync(Employee employ)
        {
            var sql = "UPDATE EMPLOYEES " +
                      "SET Name = @Name, Age = @Age, IsActive = @IsActive " +
                      "WHERE IDEmployee = @IdEmployee";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.ExecuteAsync(sql, employ);
            return result;
        }
    }
}
