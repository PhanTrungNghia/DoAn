using dotnet_employee_management.Models;

namespace dotnet_employee_management.Service
{
    public interface IUserService
    {
        Task<int> AddAsync(User user);
        Task<int> DeleteAsync(int id);
        Task<IReadOnlyList<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<int> UpdateAsync(User user);
        Task<User> GetByUsernamePassword(string username, string password);

    }
}
