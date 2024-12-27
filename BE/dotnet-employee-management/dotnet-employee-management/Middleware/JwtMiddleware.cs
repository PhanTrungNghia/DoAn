using dotnet_employee_management.Service;
using dotnet_employee_management.Authorization;
using dotnet_employee_management.Repository;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using dotnet_employee_management.Models;
namespace dotnet_employee_management.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<JwtMiddleware> _logger;

        public JwtMiddleware(RequestDelegate next, ILogger<JwtMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateToken(token);
            if (userId != null)
            {
                User user = await userService.GetByIdAsync(userId.Value);
                // attach user to context on successful jwt validation
                _logger.LogInformation(JsonSerializer.Serialize(userService.GetByIdAsync(userId.Value)));
                _logger.LogInformation(user.GetType() + "");
                context.Items["User"] = user;
            }

            await _next(context);
        }
    }
}
