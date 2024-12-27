
namespace dotnet_employee_management.Models
{
    public class AdmissionDto
    {
        public int Id { get; set; }
        public string? STT { get; set; }
        public string? SoBaoDanh { get; set; }
        public string? MaHoSo { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public string NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string? IDNganh { get; set; }
        public string? IDNghe { get; set; }
        public int? IDLoaiSinhVien { get; set; }
        public string Khoi { get; set; }
        public int? IDPhanLoaiTS { get; set; }
        public double? DiemXetTuyen { get; set; }
        public double? DiemMon1 { get; set; }
        public double? DiemMon2 { get; set; }
        public double? DiemMon3 { get; set; }
        public string? IDKhuVuc { get; set; }
        public string XepLoaiHocTap { get; set; }
        public string? IDDoiTuong { get; set; }
        public string XepLoaiHanhKiem { get; set; }
        public int? HKTT_IDTinh { get; set; }
        public int? HKTT_IDHuyen { get; set; }
        public int? HKTT_PhuongXa { get; set; }
        public string IDTruongLop12 { get; set; }
        public int? NamTotNghiep { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        public string DiaChiNhanGiayBao { get; set; }
        public string NoiSinh { get; set; }
        public int? IDDanToc { get; set; }
        public string SoCMND { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string DiaChiLienLac { get; set; }
        public string GiayKhen { get; set; }
        public string KhenThuongKyLuat { get; set; }
        public string NhapHoc { get; set; }
        public double? DiemTBCToanKhoa { get; set; }
        public double? DiemKhuyenKhich { get; set; }
        public string PhuongThucTrungTuyen { get; set; }

        // Thông tin sinh viên nhập thêm
        public string? NgayCap { get; set; }
        public string? NoiCap { get; set; }
        public string? TonGiao { get; set; }
        public string? HoTenNguoiLienLac { get; set; }
        public string? SdtLienHe { get; set; }
        public string? DiaChiLienHe { get; set; }
        public string? EmailLienHe { get; set; }
        public int? QuanHuyen { get; set; }
        public int? PhuongXa { get; set; }
        public string? DiaChiCuThe { get; set; }
        public string? HoTenCha { get; set; }
        public string? HoTenMe { get; set; }
        public string? NgaySinhCha { get; set; }
        public string? NgaySinhMe { get; set; }
        public string? SdtCha { get; set; }
        public string? SdtMe { get; set; }
        public string? NgheNghiepCha { get; set; }
        public string? NgheNghiepMe { get; set; }
        public string? NoiLamViecCha { get; set; }
        public string? NoiLamViecMe { get; set; }
        public string? NoiThuongTruCha { get; set; }
        public string? NoiThuongTruMe { get; set; }
        public string? TonGiaoCha { get; set; }
        public string? TonGiaoMe { get; set; }
        public string? DanTocCha { get; set; }
        public string? DanTocMe { get; set; }
        public string? AnhChiEm { get; set; }
        public string? SoBHYT { get; set; }
        public string? NgayVaoDoan { get; set; }
        public string? NgayVaoDang { get; set; }
        public bool? IsConfirm { get; set; }
        public bool? IsPaid { get; set; }
        public bool? IsProfile { get; set; }
    }
}
