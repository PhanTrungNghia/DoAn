using System.Data;
using Dapper;
using dotnet_employee_management.Models;
using Microsoft.Data.SqlClient;  // Use SQL Server client instead of Oracle

namespace dotnet_employee_management.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<int> AddAsync(User user)
        {
            var sql = "INSERT INTO USERS (NAME, PASSWORD, TOKEN) " +
                      "VALUES (@NAME, @PASSWORD, @TOKEN)";  // Use @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, user);
        }

        public async Task<int> AddAsync2(User user)
        {
            var sql = "INSERT INTO USERS (NAME, PASSWORD, Role) " +
                      "VALUES (@NAME, @PASSWORD, @Role)";  // Use @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, user);
        }

        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM USERS WHERE ID = @ID";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, new { ID = id });
        }

        public async Task<int> DeleteAllAsync()
        {
            var sql = "DELETE FROM USERS";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql);
        }

        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            var sql = "SELECT * FROM USERS";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            var result = await connection.QueryAsync<User>(sql);
            return result.ToList();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM USERS WHERE ID = @ID";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<User>(sql, new { ID = id });
            return result ?? null;
        }

        public async Task<int> UpdateAsync(User user)
        {
            var sql = "UPDATE USERS " +
                      "SET NAME = @NAME, PASSWORD = @PASSWORD, TOKEN = @TOKEN " +
                      "WHERE ID = @ID";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.ExecuteAsync(sql, user);
            return result;
        }

        public async Task<User> GetByUsernamePassword(string username, string password)
        {
            var sql = "SELECT * FROM USERS WHERE NAME = @NAME AND PASSWORD = @PASSWORD";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var results = await connection.QueryAsync<User>(sql, new { NAME = username, PASSWORD = password });
            return results.FirstOrDefault() ?? null;
        }
    }
}
