using dotnet_employee_management.Dto.Request;
using dotnet_employee_management.Models;

namespace dotnet_employee_management.Service
{
    public interface IAdmissionService
    {
        Task<int> ImportCandidates(IFormFile file, IConfiguration config);
        Task ImportConfirmAdmission(IFormFile file, IConfiguration config);
        Task<int> AddAsync(Admission admission);
        Task<int> AddAllAsync(List<AdmissionDto> admissions);
        Task<int> DeleteAsync(int id);
        Task<IReadOnlyList<Admission>> GetAllAsync();
        Task<Admission?> GetByIdAsync(int id);
        Task<int> UpdateAsync(Admission admission);
        Task ConfirmAdmission(List<int> cr);
        Task UnConfirmAdmission(List<int> cr); 
    }
}
