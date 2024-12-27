using dotnet_employee_management.Models;

namespace dotnet_employee_management.Repository
{
    public interface IAdmissionRepository : IGenericRepository<Admission>
    {
        public Task<int> UpdateConfirmAsync(Admission admission);
        public Task<Admission> GetBySoBaoDanh(int soBaoDanh);
    }
}
