using dotnet_employee_management.Models;
using dotnet_employee_management.Repository;

namespace dotnet_employee_management.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<int> AddAsync(User user)
        {
            return _userRepository.AddAsync(user);
        }

        public Task<int> DeleteAsync(int id)
        {
            return _userRepository.DeleteAsync(id);
        }

        public Task<IReadOnlyList<User>> GetAllAsync()
        {
            return _userRepository.GetAllAsync();
        }

        public Task<User?> GetByIdAsync(int id)
        {
            return _userRepository.GetByIdAsync(id);
        }

        public Task<int> UpdateAsync(User user)
        {
            return _userRepository.UpdateAsync(user);
        }

        public Task<User> GetByUsernamePassword(string username, string password)
        {
            return _userRepository.GetByUsernamePassword(username, password);
        }
    }
}
