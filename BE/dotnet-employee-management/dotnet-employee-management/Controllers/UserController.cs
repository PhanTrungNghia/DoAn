using dotnet_employee_management.Models;
using dotnet_employee_management.Repository;
using dotnet_employee_management.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_employee_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        /// <summary>
        /// Lấy ra thông tin của User
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        /// <summary>
        /// Lấy ra thông tin của User bằng id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _userService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound("Failed to locate User");
        }

        /// <summary>
        /// Thêm một User mới
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public async Task<IActionResult> AddUser(User user)
        {
            var count = await _userService.AddAsync(user);

            var response = new
            {
                Message = "User created successfully",
                Count = count
            };

            return count > 0 ? Ok(response) : NotFound("Unable to create User");
        }

        /// <summary>
        /// Cập nhật thông tin cho User
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            var count = await _userService.UpdateAsync(user);

            var resp = new
            {
                Message = "User updated successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("User failed to update");
        }

        /// <summary>
        /// Xóa thông tin 1 User dựa trên id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var count = await _userService.DeleteAsync(id);

            var resp = new
            {
                Message = "User deleted successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("User failed to delete");
        }
    }
}
