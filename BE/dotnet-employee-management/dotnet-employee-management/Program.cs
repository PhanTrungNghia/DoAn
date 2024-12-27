using dotnet_employee_management.Data;
using dotnet_employee_management.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using dotnet_employee_management.Service;
using dotnet_employee_management.Middleware;
using dotnet_employee_management.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnStr"));
});

// Add services to DI Container with Scoped lifecycle
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAdmissionRepository, AdmissionRepository>();
builder.Services.AddScoped<IAdmissionService, AdmissionService>();
builder.Services.AddScoped<IJwtUtils, JwtUtils>();

builder.Services.AddCors();

// Thêm dịch vụ Authentication với JWT Bearer authentication scheme
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        // Cấu hình các tham số kiểm tra token JWT
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            // Kiểm tra tính hợp lệ của Issuer (người phát hành token) 
//            // có khớp với ValidIssuer được cung cấp bên dưới.
//            ValidateIssuer = true,
//            ValidateAudience = false,
//            // Kiểm tra thời gian sống của token (token không quá hạn)
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = "http://localhost:4200",
//            ValidAudience = "http://localhost:5088",
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM"))
//        };
//    });

// sets up the authorization services,
// allowing you to protect resources based on the user's claims or roles.
builder.Services.AddAuthorization(); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Khai báo giữa config http request pipeline và config authorization
app.UseCors(options =>
options.WithOrigins("http://localhost:3000")
.AllowAnyMethod()
.AllowAnyHeader());

app.UseMiddleware<JwtMiddleware>();

// adds the authentication middleware to the request pipeline,
// ensuring that incoming requests will be authenticated.
app.UseAuthentication();
// adds the authorization middleware,
// ensuring that requests are authorized to access protected resources.
app.UseAuthorization();

// maps the controllers for routing incoming requests to the appropriate endpoints.
app.MapControllers();

app.Run();
