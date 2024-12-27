using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using dotnet_employee_management.Authorization;
using dotnet_employee_management.Dto.Request;
using dotnet_employee_management.Models;
using dotnet_employee_management.Service;
using Microsoft.AspNetCore.Mvc;
using dotnet_employee_management.Data;
using dotnet_employee_management.Repository;


namespace dotnet_employee_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAdmissionRepository _admissionRepository;
        private readonly DBContext _dbContext;
        private readonly ILogger<AuthController> _logger;
        private readonly IJwtUtils _jJwtUtils;

        public AuthController(
            IUserService userService,
            ILogger<AuthController> logger,
            IJwtUtils jJwtUtils,
            IAdmissionRepository admissionRepository
        )
        {
            _userService = userService;
            _logger = logger;
            _jJwtUtils = jJwtUtils;
            _admissionRepository = admissionRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginInfo userLogin)
        {
            User user = await _userService.GetByUsernamePassword(userLogin.Username, userLogin.Password);
            if (user.Role == Role.Student)
            {
                Admission ad = await _admissionRepository.GetBySoBaoDanh(int.Parse(userLogin.Username));
                if (ad != null && ad.IsConfirm != true)
                {
                    return Unauthorized();
                }
            }
            if (user != null)
            {
                var token = _jJwtUtils.GenerateToken(user);
                user.TOKEN = token;

                await _userService.UpdateAsync(user);

                return Ok(new { user.ID, user.NAME, token });
            }

            return Unauthorized();
        }

    }
}
