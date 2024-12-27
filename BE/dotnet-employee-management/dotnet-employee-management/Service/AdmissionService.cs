using System;
using System.Data;
using System.Text.Json;
using Dapper;
using dotnet_employee_management.Data;
using dotnet_employee_management.Dto.Request;
using dotnet_employee_management.Models;
using dotnet_employee_management.Repository;
using Microsoft.Data.SqlClient;
using NPOI.XSSF.UserModel;
using Org.BouncyCastle.Asn1.IsisMtt.X509;

namespace dotnet_employee_management.Service
{
    public class AdmissionService : IAdmissionService
    {
        private readonly IAdmissionRepository _admissionRepository;
        private readonly ILogger<AdmissionService> _logger;
        private readonly DBContext _dbContext;

        public AdmissionService(
            IAdmissionRepository admissionRepository,
            ILogger<AdmissionService> logger,
            DBContext dbContext
            )
        {
            _admissionRepository = admissionRepository;
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task ConfirmAdmission(List<int> confirmRequests)
        {

            foreach (var cr in confirmRequests)
            {
                _logger.LogInformation("admission.IsConfirm for ID {Id}", cr);
            }
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                foreach (var cr in confirmRequests)
                {
                    // Lấy sinh viên từ DbContext
                    var admission = await GetByIdAsync(cr);
                    if (admission == null)
                    {
                        throw new Exception($"Không tìm thấy sinh viên với ID {cr}");
                    }

                    // Cập nhật thông tin xác nhận
                    admission.IsConfirm = true;
                    await _admissionRepository.UpdateConfirmAsync(admission);
                }

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync(); // Commit giao dịch
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Rollback nếu có lỗi
                _logger.LogError(ex, "Error confirming admissions");
                throw;
            }
        }


        public async Task UnConfirmAdmission(List<int> confirmRequests)
        {
            foreach (var cr in confirmRequests)
            {
                _logger.LogInformation("admission.IsConfirm for ID {Id}", cr);
            }
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                foreach (var cr in confirmRequests)
                {
                    // Lấy sinh viên từ DbContext
                    var admission = await GetByIdAsync(cr);
                    if (admission == null)
                    {
                        throw new Exception($"Không tìm thấy sinh viên với ID {cr}");
                    }

                    // Cập nhật thông tin xác nhận
                    admission.IsConfirm = false;
                    await _admissionRepository.UpdateConfirmAsync(admission);
                }

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync(); // Commit giao dịch
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Rollback nếu có lỗi
                _logger.LogError(ex, "Error confirming admissions");
                throw;
            }
        }


        public async Task<int> ImportCandidates(IFormFile file, IConfiguration config)
        {
            if (file == null || file.Length == 0)
                throw new Exception("Không tìm thấy file");
            using IDbConnection connection = new SqlConnection("Server=.\\SQLEXPRESS;Initial Catalog=ems_db;Persist Security Info=True;TrustServerCertificate=true;MultipleActiveResultSets=True;Integrated Security=True;");
            try
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    List<AdmissionDto> admissionImportList = new List<AdmissionDto>();
                    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);
                        stream.Position = 0;

                        var workbook = new XSSFWorkbook(stream);
                        var worksheet = workbook.GetSheetAt(0);
                        if (worksheet == null)
                            throw new Exception("Worksheet not found");

                        int rows = worksheet.PhysicalNumberOfRows;
                        for (int r = 4; r < rows; r++) // Giả sử dòng đầu tiên là header
                        {
                            var row = worksheet.GetRow(r);
                            if (row == null || string.IsNullOrEmpty(row.GetCell(0)?.ToString())) continue;

                            var admission = new AdmissionDto()
                            {
                                STT = row.GetCell(0)?.ToString(),
                                SoBaoDanh = row.GetCell(1)?.ToString(),
                                MaHoSo = row.GetCell(2)?.ToString(),
                                HoDem = row.GetCell(3)?.ToString(),
                                Ten = row.GetCell(4)?.ToString(),
                                NgaySinh = row.GetCell(5)?.ToString(),
                                GioiTinh = row.GetCell(6)?.ToString(),
                                IDNganh = row.GetCell(7)?.ToString(),
                                IDNghe = row.GetCell(8)?.ToString(),
                                IDLoaiSinhVien = int.TryParse(row.GetCell(9)?.ToString(), out int idLoaiSinhVien) ? (int?)idLoaiSinhVien : null,
                                Khoi = row.GetCell(10)?.ToString(),
                                IDPhanLoaiTS = int.TryParse(row.GetCell(11)?.ToString(), out int idPhanLoaiTS) ? (int?)idPhanLoaiTS : null,
                                DiemXetTuyen = double.TryParse(row.GetCell(12)?.ToString(), out double diemXetTuyen) ? (double?)diemXetTuyen : null,
                                DiemMon1 = double.TryParse(row.GetCell(13)?.ToString(), out double diemMon1) ? (double?)diemMon1 : null,
                                DiemMon2 = double.TryParse(row.GetCell(14)?.ToString(), out double diemMon2) ? (double?)diemMon2 : null,
                                DiemMon3 = double.TryParse(row.GetCell(15)?.ToString(), out double diemMon3) ? (double?)diemMon3 : null,
                                IDKhuVuc = row.GetCell(16)?.ToString(),
                                XepLoaiHocTap = row.GetCell(17)?.ToString(),
                                IDDoiTuong = row.GetCell(18)?.ToString(),
                                XepLoaiHanhKiem = row.GetCell(19)?.ToString(),
                                HKTT_IDTinh = int.TryParse(row.GetCell(20)?.ToString(), out int hKTT_IDTinh) ? (int?)hKTT_IDTinh : null,
                                HKTT_IDHuyen = int.TryParse(row.GetCell(21)?.ToString(), out int hKTT_IDHuyen) ? (int?)hKTT_IDHuyen : null,
                                HKTT_PhuongXa = int.TryParse(row.GetCell(22)?.ToString(), out int hKTT_PhuongXa) ? (int?)hKTT_PhuongXa : null,
                                IDTruongLop12 = row.GetCell(23)?.ToString(),
                                NamTotNghiep = int.TryParse(row.GetCell(24)?.ToString(), out int namTotNghiep) ? (int?)namTotNghiep : null,
                                SoDienThoai = row.GetCell(25)?.ToString(),
                                Email = row.GetCell(26)?.ToString(),
                                DiaChiNhanGiayBao = row.GetCell(27)?.ToString(),
                                NoiSinh = row.GetCell(28)?.ToString(),
                                IDDanToc = int.TryParse(row.GetCell(29)?.ToString(), out int idDanToc) ? (int?)idDanToc : null,
                                SoCMND = row.GetCell(30)?.ToString(),
                                DiaChiThuongTru = row.GetCell(31)?.ToString(),
                                DiaChiLienLac = row.GetCell(32)?.ToString(),
                                GiayKhen = row.GetCell(33)?.ToString(),
                                KhenThuongKyLuat = row.GetCell(34)?.ToString(),
                                NhapHoc = row.GetCell(35)?.ToString(),
                                DiemTBCToanKhoa = double.TryParse(row.GetCell(36)?.ToString(), out double diemTBCToanKhoa) ? (double?)diemTBCToanKhoa : null,
                                DiemKhuyenKhich = double.TryParse(row.GetCell(37)?.ToString(), out double diemKhuyenKhich) ? (double?)diemKhuyenKhich : null,
                                PhuongThucTrungTuyen = row.GetCell(38)?.ToString(),

                            };

                            admissionImportList.Add(admission);
                        }
                    }

                    var userList = admissionImportList.Select(admission => new User
                    {
                        NAME = admission.SoBaoDanh ?? "",
                        PASSWORD = admission.MaHoSo ?? "",
                        Role = Role.Student,
                    }).ToList();
                    _dbContext.Users.AddRange(userList);

                    await _dbContext.SaveChangesAsync();

                    if (admissionImportList.Count == 0)
                    {
                        return 0;
                    }

                    // Save students to database
                    _logger.LogInformation(JsonSerializer.Serialize(admissionImportList));
                    int affectedInportRow = await AddAllAsync(admissionImportList);
                    transaction.Commit();
                    return affectedInportRow;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error importing candidates");
                throw;
            }

        }

        public async Task ImportConfirmAdmission(IFormFile file, IConfiguration config)
        {
            if (file == null || file.Length == 0)
                throw new Exception("Không tìm thấy file");
            using IDbConnection connection = new SqlConnection("Server=.\\SQLEXPRESS;Initial Catalog=ems_db;Persist Security Info=True;TrustServerCertificate=true;MultipleActiveResultSets=True;Integrated Security=True;");
            try
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    List<int> admissionConfirmList = new List<int>(); // Danh sách các ID
                    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);
                        stream.Position = 0;

                        var workbook = new XSSFWorkbook(stream);
                        var worksheet = workbook.GetSheetAt(0);
                        if (worksheet == null)
                            throw new Exception("Worksheet not found");

                        int rows = worksheet.PhysicalNumberOfRows;
                        for (int r = 2; r < rows; r++) // Giả sử dòng đầu tiên là header
                        {
                            var row = worksheet.GetRow(r);
                            if (row == null || string.IsNullOrEmpty(row.GetCell(0)?.ToString())) continue;
                            var cmnd = row.GetCell(1)?.ToString()?.Trim();
                            var isConfirm = row.GetCell(2)?.ToString()?.Trim();
                            var admission = _dbContext.Admissions.FirstOrDefault(ad => ad.SoBaoDanh.ToLower() == cmnd.ToLower());
                            if (admission != null && isConfirm!.Equals("x"))
                            {
                                admissionConfirmList.Add(admission.Id);
                            }
                        }
                    }
                    _logger.LogInformation("admissionConfirmList: " + JsonSerializer.Serialize(admissionConfirmList));
                    await ConfirmAdmission(admissionConfirmList);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error importing candidates");
                throw;
            }

        }


        public async Task<int> AddAllAsync(List<AdmissionDto> admissions)
        {
            var sql = @"
                INSERT INTO Admission (
                    STT, SoBaoDanh, MaHoSo, HoDem, Ten, NgaySinh, GioiTinh, 
                    IDNganh, IDNghe, IDLoaiSinhVien, Khoi, IDPhanLoaiTS, DiemXetTuyen, 
                    DiemMon1, DiemMon2, DiemMon3, IDKhuVuc, XepLoaiHocTap, IDDoiTuong, 
                    XepLoaiHanhKiem, HKTT_IDTinh, HKTT_IDHuyen, HKTT_PhuongXa, IDTruongLop12, 
                    NamTotNghiep, SoDienThoai, Email, DiaChiNhanGiayBao, NoiSinh, IDDanToc, 
                    SoCMND, DiaChiThuongTru, DiaChiLienLac, GiayKhen, KhenThuongKyLuat, 
                    NhapHoc, DiemTBCToanKhoa, DiemKhuyenKhich, PhuongThucTrungTuyen
                ) VALUES (
                    @STT, @SoBaoDanh, @MaHoSo, @HoDem, @Ten, @NgaySinh, @GioiTinh, 
                    @IDNganh, @IDNghe, @IDLoaiSinhVien, @Khoi, @IDPhanLoaiTS, @DiemXetTuyen, 
                    @DiemMon1, @DiemMon2, @DiemMon3, @IDKhuVuc, @XepLoaiHocTap, @IDDoiTuong, 
                    @XepLoaiHanhKiem, @HKTT_IDTinh, @HKTT_IDHuyen, @HKTT_PhuongXa, @IDTruongLop12, 
                    @NamTotNghiep, @SoDienThoai, @Email, @DiaChiNhanGiayBao, @NoiSinh, @IDDanToc, 
                    @SoCMND, @DiaChiThuongTru, @DiaChiLienLac, @GiayKhen, @KhenThuongKyLuat, 
                    @NhapHoc, @DiemTBCToanKhoa, @DiemKhuyenKhich, @PhuongThucTrungTuyen
                )";

            int affectedRows = 0;

            using IDbConnection connection = new SqlConnection("Server=.\\SQLEXPRESS;Initial Catalog=ems_db;Persist Security Info=True;TrustServerCertificate=true;MultipleActiveResultSets=True;Integrated Security=True;");
            connection.Open();

            using var transaction = connection.BeginTransaction();

            try
            {
                const int batchSize = 100;
                for (int i = 0; i < admissions.Count; i += batchSize)
                {
                    var batch = admissions.Skip(i).Take(batchSize).ToList();
                    affectedRows += await connection.ExecuteAsync(sql, batch, transaction: transaction, commandTimeout: 120);
                }
                transaction.Commit();
                return affectedRows;
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;  // Rethrow the exception for debugging or higher-level exception handling
            }
        }

        public Task<int> AddAsync(Admission admission)
        {
            return _admissionRepository.AddAsync(admission);
        }

        public Task<int> DeleteAsync(int id)
        {
            return _admissionRepository.DeleteAsync(id);
        }

        public Task<IReadOnlyList<Admission>> GetAllAsync()
        {
            return _admissionRepository.GetAllAsync();
        }

        public Task<Admission?> GetByIdAsync(int id)
        {
            return _admissionRepository.GetByIdAsync(id);
        }

        public Task<int> UpdateAsync(Admission admission)
        {
            return _admissionRepository.UpdateAsync(admission);
        }
    }
}
