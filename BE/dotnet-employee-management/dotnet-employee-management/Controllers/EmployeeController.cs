using dotnet_employee_management.Data;
using dotnet_employee_management.Models;
using dotnet_employee_management.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_employee_management.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly DBContext _dbContext;

        public EmployeeController(
            ILogger<EmployeeController> logger,
            IUnitOfWork unitOfWork
            )
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Lấy ra thông tin của Employee
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<IActionResult> GetEmployees()
        {  
            var employees = await _unitOfWork.Employees.GetAllAsync();
            return Ok(employees);
        }

        /// <summary>
        /// Lấy ra thông tin của Employee bằng id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetEmployeetById(int id)
        {
            var result = await _unitOfWork.Employees.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound("Failed to locate Employee");
        }

        /// <summary>
        /// Thêm một Employee mới
        /// </summary>
        /// <param name="employ"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public async Task<IActionResult> AddEmployee(Employee employ)
        {
            //var count = await _unitOfWork.Employees.AddAsync(new Employee
            //{
            //    Name = "Nguyen Van A",
            //    Age = "21",
            //    IsActive = 1
            //});

            var count = await _unitOfWork.Employees.AddAsync(employ);

            var response = new
            {
                Message = "Employee created successfully",
                Count = count
            };

            return count > 0 ? Ok(response) : NotFound("Unable to create Employee");
        }

        /// <summary>
        /// Cập nhật thông tin cho Employee
        /// </summary>
        /// <param name="employ"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateEmployee(Employee employ)
        {
            var count = await _unitOfWork.Employees.UpdateAsync(employ);

            var resp = new
            {
                Message = "Employee updated successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("Employee failed to update");
        }

        /// <summary>
        /// Xóa thông tin 1 Employee dựa trên id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var count = await _unitOfWork.Employees.DeleteAsync(id);

            var resp = new
            {
                Message = "Employee deleted successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("Employee failed to delete");
        }
    }
}
