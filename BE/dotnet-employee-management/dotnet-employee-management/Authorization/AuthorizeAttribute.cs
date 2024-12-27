using System.Text.Json;
using dotnet_employee_management.Controllers;
using dotnet_employee_management.Models;
using dotnet_employee_management.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace dotnet_employee_management.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string Roles { get; set; } // Add the Roles property
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Skip authorization if action is decorated with [AllowAnonymous]
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata
                .OfType<AllowAnonymousAttribute>()
                .Any();
            if (allowAnonymous)
            {
                return; // Bypass authorization
            }

            // Get the current user
            User user = (User)context.HttpContext.Items["User"];
            if (user == null)
            {
                context.Result = new JsonResult(new { message = "Unauthorized" })
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
                return;
            }

            // Validate roles if specified
            if (!string.IsNullOrEmpty(Roles))
            {
                var roles = Roles.Split(','); // Support comma-separated roles
                if (!roles.Any(role => user.Role.Equals(role.Trim(), StringComparison.OrdinalIgnoreCase)))
                {
                    context.Result = new JsonResult(new { message = "Forbidden" })
                    {
                        StatusCode = StatusCodes.Status403Forbidden
                    };
                    return;
                }
            }
        }
    }
}
