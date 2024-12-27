using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_employee_management.Migrations
{
    /// <inheritdoc />
    public partial class updateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    STT = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SoBaoDanh = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MaHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    HoDem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgaySinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDNganh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IDNghe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IDLoaiSinhVien = table.Column<int>(type: "int", nullable: true),
                    Khoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDPhanLoaiTS = table.Column<int>(type: "int", nullable: true),
                    DiemXetTuyen = table.Column<double>(type: "float", nullable: true),
                    DiemMon1 = table.Column<double>(type: "float", nullable: true),
                    DiemMon2 = table.Column<double>(type: "float", nullable: true),
                    DiemMon3 = table.Column<double>(type: "float", nullable: true),
                    IDKhuVuc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XepLoaiHocTap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDDoiTuong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XepLoaiHanhKiem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HKTT_IDTinh = table.Column<int>(type: "int", nullable: true),
                    HKTT_IDHuyen = table.Column<int>(type: "int", nullable: true),
                    HKTT_PhuongXa = table.Column<int>(type: "int", nullable: true),
                    IDTruongLop12 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NamTotNghiep = table.Column<int>(type: "int", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChiNhanGiayBao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoiSinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDDanToc = table.Column<int>(type: "int", nullable: true),
                    SoCMND = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChiThuongTru = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChiLienLac = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiayKhen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KhenThuongKyLuat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NhapHoc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiemTBCToanKhoa = table.Column<double>(type: "float", nullable: true),
                    DiemKhuyenKhich = table.Column<double>(type: "float", nullable: true),
                    PhuongThucTrungTuyen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayCap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiCap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TonGiao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTenNguoiLienLac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SdtLienHe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChiLienHe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailLienHe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuanHuyen = table.Column<int>(type: "int", nullable: true),
                    PhuongXa = table.Column<int>(type: "int", nullable: true),
                    DiaChiCuThe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTenCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTenMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinhCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinhMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SdtCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SdtMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgheNghiepCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgheNghiepMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiLamViecCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiLamViecMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiThuongTruCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiThuongTruMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TonGiaoCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TonGiaoMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DanTocCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DanTocMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AnhChiEm = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoBHYT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayVaoDoan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayVaoDang = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EMPLOYEES",
                columns: table => new
                {
                    IDEMPLOYEE = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AGE = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ISACTIVE = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EMPLOYEES", x => x.IDEMPLOYEE);
                });

            migrationBuilder.CreateTable(
                name: "USERS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PASSWORD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TOKEN = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admission");

            migrationBuilder.DropTable(
                name: "EMPLOYEES");

            migrationBuilder.DropTable(
                name: "USERS");
        }
    }
}
