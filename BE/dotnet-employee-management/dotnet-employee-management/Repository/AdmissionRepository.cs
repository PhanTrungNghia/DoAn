using Dapper;
using dotnet_employee_management.Models;
using dotnet_employee_management.Service;
using Microsoft.Data.SqlClient;  // Use SQL Server client instead of Oracle
using System.Data;
using System.Text.Json;

namespace dotnet_employee_management.Repository
{
    public class AdmissionRepository : IAdmissionRepository
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AdmissionRepository> _logger;

        public AdmissionRepository(IConfiguration config, ILogger<AdmissionRepository> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task<int> AddAsync(Admission admission)
        {
            var sql = @"INSERT INTO Admission 
                (STT, SoBaoDanh, MaHoSo, HoDem, Ten, NgaySinh, GioiTinh, 
                 IDNganh, IDNghe, IDLoaiSinhVien, Khoi, IDPhanLoaiTS, DiemXetTuyen, 
                 DiemMon1, DiemMon2, DiemMon3, IDKhuVuc, XepLoaiHocTap, IDDoiTuong, 
                 XepLoaiHanhKiem, HKTT_IDTinh, HKTT_IDHuyen, HKTT_PhuongXa, IDTruongLop12, 
                 NamTotNghiep, SoDienThoai, Email, DiaChiNhanGiayBao, NoiSinh, IDDanToc, 
                 SoCMND, DiaChiThuongTru, DiaChiLienLac, GiayKhen, KhenThuongKyLuat, 
                 NhapHoc, DiemTBCToanKhoa, DiemKhuyenKhich, PhuongThucTrungTuyen)
                VALUES 
                (@STT, @SoBaoDanh, @MaHoSo, @HoDem, @Ten, @NgaySinh, @GioiTinh, 
                 @IDNganh, @IDNghe, @IDLoaiSinhVien, @Khoi, @IDPhanLoaiTS, @DiemXetTuyen, 
                 @DiemMon1, @DiemMon2, @DiemMon3, @IDKhuVuc, @XepLoaiHocTap, @IDDoiTuong, 
                 @XepLoaiHanhKiem, @HKTT_IDTinh, @HKTT_IDHuyen, @HKTT_PhuongXa, @IDTruongLop12, 
                 @NamTotNghiep, @SoDienThoai, @Email, @DiaChiNhanGiayBao, @NoiSinh, @IDDanToc, 
                 @SoCMND, @DiaChiThuongTru, @DiaChiLienLac, @GiayKhen, @KhenThuongKyLuat, 
                 @NhapHoc, @DiemTBCToanKhoa, @DiemKhuyenKhich, @PhuongThucTrungTuyen)";

            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, admission);
        }


        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Admission WHERE Id = @IdAdmission";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            return await connection.ExecuteAsync(sql, new { IdAdmission = id });
        }

        public async Task<IReadOnlyList<Admission>> GetAllAsync()
        {
            var sql = "SELECT * FROM Admission";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));
            var result = await connection.QueryAsync<Admission>(sql);
            return result.ToList();
        }

        public async Task<Admission> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Admission WHERE Id = @IdAdmission";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<Admission>(sql, new { IdAdmission = id });
            return result ?? null;
        }
        public async Task<Admission> GetBySoBaoDanh(int sbd)
        {
            var sql = "SELECT * FROM Admission WHERE SoBaoDanh = @soBaoDanh";  // @ for SQL Server
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<Admission>(sql, new { soBaoDanh = sbd });
            return result ?? null;
        }


        public async Task<int> UpdateAsync(Admission admission)
        {
            var sql = @"
                UPDATE Admission
                SET 
                    STT = @STT,
                    SoBaoDanh = @SoBaoDanh,
                    MaHoSo = @MaHoSo,
                    HoDem = @HoDem,
                    Ten = @Ten,
                    NgaySinh = @NgaySinh,
                    GioiTinh = @GioiTinh,
                    IDNganh = @IDNganh,
                    IDNghe = @IDNghe,
                    IDLoaiSinhVien = @IDLoaiSinhVien,
                    Khoi = @Khoi,
                    IDPhanLoaiTS = @IDPhanLoaiTS,
                    DiemXetTuyen = @DiemXetTuyen,
                    DiemMon1 = @DiemMon1,
                    DiemMon2 = @DiemMon2,
                    DiemMon3 = @DiemMon3,
                    IDKhuVuc = @IDKhuVuc,
                    XepLoaiHocTap = @XepLoaiHocTap,
                    IDDoiTuong = @IDDoiTuong,
                    XepLoaiHanhKiem = @XepLoaiHanhKiem,
                    HKTT_IDTinh = @HKTT_IDTinh,
                    HKTT_IDHuyen = @HKTT_IDHuyen,
                    HKTT_PhuongXa = @HKTT_PhuongXa,
                    IDTruongLop12 = @IDTruongLop12,
                    NamTotNghiep = @NamTotNghiep,
                    SoDienThoai = @SoDienThoai,
                    Email = @Email,
                    DiaChiNhanGiayBao = @DiaChiNhanGiayBao,
                    NoiSinh = @NoiSinh,
                    IDDanToc = @IDDanToc,
                    SoCMND = @SoCMND,
                    DiaChiThuongTru = @DiaChiThuongTru,
                    DiaChiLienLac = @DiaChiLienLac,
                    GiayKhen = @GiayKhen,
                    KhenThuongKyLuat = @KhenThuongKyLuat,
                    NhapHoc = @NhapHoc,
                    DiemTBCToanKhoa = @DiemTBCToanKhoa,
                    DiemKhuyenKhich = @DiemKhuyenKhich,
                    PhuongThucTrungTuyen = @PhuongThucTrungTuyen
                WHERE Id = @Id";  

            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.ExecuteAsync(sql, admission);
            return result;
        }

        public async Task<int> UpdateConfirmAsync(Admission admission)
        {
            var sql = @"
                UPDATE Admission
                SET 
                    IsConfirm = @IsConfirm
                WHERE Id = @Id";

            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("SqlServerConnStr"));

            var result = await connection.ExecuteAsync(sql, admission);
            return result;
        }

    }
}
