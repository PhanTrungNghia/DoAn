namespace dotnet_employee_management.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IEmployeeRepository _employees;
        private readonly IUserRepository _users;

        public UnitOfWork(IEmployeeRepository employees, IUserRepository users)
        {
            _employees = employees;
            _users = users;
        }

        public IEmployeeRepository Employees => _employees;
        public IUserRepository Users => _users;
    }
}
