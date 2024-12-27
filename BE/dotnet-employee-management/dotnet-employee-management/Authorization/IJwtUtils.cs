using dotnet_employee_management.Models;

namespace dotnet_employee_management.Authorization
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(string username);
        public string GenerateToken(User user);
        public int? ValidateToken(string token);
    }
}
