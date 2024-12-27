// Global type without importing in other files
// Kiểu dữ liệu
interface IArticle {
    id: number
    title: string
    body: string
}

interface IEmployee {
    idEmployee?: number
    name: string
    age: string
    isActive: int
}

interface IAdminFunction {
    ID?: number // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IAdmission {
    id: number;
    stt?: string;
    soBaoDanh?: string;
    maHoSo?: string;
    hoDem: string;
    ten: string;
    ngaySinh: string;
    gioiTinh: string;
    idNganh?: string;
    idNghe?: string;
    idLoaiSinhVien?: number;
    khoi: string;
    idPhanLoaiTS?: number;
    diemXetTuyen?: number;
    diemMon1?: number;
    diemMon2?: number;
    diemMon3?: number;
    idKhuVuc?: string;
    xepLoaiHocTap: string;
    idDoiTuong?: string;
    xepLoaiHanhKiem: string;
    hktt_IDTinh?: number;
    hktt_IDHuyen?: number;
    hktt_PhuongXa?: number;
    idTruongLop12: string;
    namTotNghiep?: number;
    soDienThoai: string;
    email: string;
    diaChiNhanGiayBao: string;
    noiSinh: string;
    idDanToc?: number;
    soCMND: string;
    diaChiThuongTru: string;
    diaChiLienLac: string;
    giayKhen: string;
    khenThuongKyLuat: string;
    nhapHoc: string;
    diemTBCToanKhoa?: number;
    diemKhuyenKhich?: number;
    phuongThucTrungTuyen: string;
    ngayCap?: string;
    noiCap?: string;
    tonGiao?: string;
    hoTenNguoiLienLac?: string;
    sdtLienHe?: string;
    diaChiLienHe?: string;
    emailLienHe?: string;
    quanHuyen?: number;
    phuongXa?: number;
    diaChiCuThe?: string;
    hoTenCha?: string;
    hoTenMe?: string;
    ngaySinhCha?: string;
    ngaySinhMe?: string;
    sdtCha?: string;
    sdtMe?: string;
    ngheNghiepCha?: string;
    ngheNghiepMe?: string;
    noiLamViecCha?: string;
    noiLamViecMe?: string;
    noiThuongTruCha?: string;
    noiThuongTruMe?: string;
    tonGiaoCha?: string;
    tonGiaoMe?: string;
    danTocCha?: string;
    danTocMe?: string;
    anhChiEm?: string;
    soBHYT?: string;
    ngayVaoDoan?: string;
    ngayVaoDang?: string;
    isConfirm?: boolean;
    isPaid?: boolean;
    isProfile?: boolean;
}

interface IAdminFunctionWithIndex {
    INDEX: number
    ID?: number // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface IAdmissionWithKey {
    KEY?: number
    id?: number // Tương ứng với kiểu nullable (string?)
    stt?: string // Tương ứng với kiểu không nullable (string)
    soBaoDanh?: string // Tương ứng với kiểu không nullable (string)
    maHoSo?: string // Tương ứng với kiểu không nullable (string)
}

interface ICreateAdminFunction {
    ID?: string // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}

interface ICreateAdmission {
    stt: string; // Tương ứng với kiểu không nullable (string)
    soBaoDanh: string; // Tương ứng với kiểu không nullable (string)
    maHoSo: string; // Tương ứng với kiểu không nullable (string)
    hoDem: string; // Tương ứng với kiểu không nullable (string)
    ten: string; // Tương ứng với kiểu không nullable (string)
    ngaySinh: string; // Tương ứng với kiểu không nullable (string)
    gioiTinh: string; // Tương ứng với kiểu không nullable (string)
    idNganh: string; // Tương ứng với kiểu không nullable (string)
    idNghe: string; // Tương ứng với kiểu không nullable (string)
    idLoaiSinhVien: number; // Tương ứng với kiểu không nullable (number)
    khoi: string; // Tương ứng với kiểu không nullable (string)
    idPhanLoaiTS: number; // Tương ứng với kiểu không nullable (number)
    diemXetTuyen: number; // Tương ứng với kiểu không nullable (number)
    diemMon1: number; // Tương ứng với kiểu không nullable (number)
    diemMon2: number; // Tương ứng với kiểu không nullable (number)
    diemMon3: number; // Tương ứng với kiểu không nullable (number)
    idKhuVuc: string; // Tương ứng với kiểu không nullable (string)
    xepLoaiHocTap: string; // Tương ứng với kiểu không nullable (string)
    idDoiTuong: string; // Tương ứng với kiểu không nullable (string)
    xepLoaiHanhKiem: string; // Tương ứng với kiểu không nullable (string)
    hktT_IDTinh: number; // Tương ứng với kiểu không nullable (number)
    hktT_IDHuyen: number; // Tương ứng với kiểu không nullable (number)
    hktT_PhuongXa: number; // Tương ứng với kiểu không nullable (number)
    idTruongLop12: string; // Tương ứng với kiểu không nullable (string)
    namTotNghiep: number; // Tương ứng với kiểu không nullable (number)
    soDienThoai: string; // Tương ứng với kiểu không nullable (string)
    email: string; // Tương ứng với kiểu không nullable (string)
    diaChiNhanGiayBao: string; // Tương ứng với kiểu không nullable (string)
    noiSinh: string; // Tương ứng với kiểu không nullable (string)
    idDanToc: number; // Tương ứng với kiểu không nullable (number)
    soCMND: string; // Tương ứng với kiểu không nullable (string)
    diaChiThuongTru: string; // Tương ứng với kiểu không nullable (string)
    diaChiLienLac: string; // Tương ứng với kiểu không nullable (string)
    giayKhen: string; // Tương ứng với kiểu không nullable (string)
    khenThuongKyLuat: string; // Tương ứng với kiểu không nullable (string)
    nhapHoc: string; // Tương ứng với kiểu không nullable (string)
    diemTBCToanKhoa: number; // Tương ứng với kiểu không nullable (number)
    diemKhuyenKhich: number; // Tương ứng với kiểu không nullable (number)
    phuongThucTrungTuyen: string; // Tương ứng với kiểu không nullable (string)
  }
  

interface IUpdateAdminFunction {
    ID?: string // Tương ứng với kiểu nullable (string?)
    NAME?: string // Tương ứng với kiểu không nullable (string)
    STATUS?: string // Tương ứng với kiểu không nullable (string)
}
interface IUpdateAdmission {
    id?: string // Tương ứng với kiểu nullable (string?)
    stt?: string // Tương ứng với kiểu không nullable (string)
    soBaoDanh?: string // Tương ứng với kiểu không nullable (string)
    maHoSo?: string // Tương ứng với kiểu không nullable (string)
}

interface ConfirmRequest {
    id: number;
    value: boolean;
}

interface IUser {
    id: number
    name: string
    firstName: string
    lastName: string
    token: string
}

// Định nghĩa kiểu cho `user`
interface User {
    id: string;
    name: string;
    token: string;
}

interface UserLogin {
    username: string;
    password: string;
}

interface IdRequest {
    id: string;
}

// Định nghĩa kiểu cho state
type UserState = {
    user: User | null;
    error: Error | null;
    pending: boolean;
}

type PrivateRouteProps = {
    children: ReactNode;
}

// Kiểu mảng đối tượng
type ArticleState = {
    articles: IArticle[]
    pending: boolean
    error?: Error
}

type EmployeeState = {
    employees: IEmployee[]
    pending: boolean
    error?: Error
    searchData?: string
}

type AdminFunctionState = {
    adminFunctions: IAdminFunction[]
    pending: boolean
    error?: Error
    searchData?: string
}

type AdmissionState = {
    admissions: IAdmisison[]
    pending: boolean
    error?: Error
    searchData?: string
}

// Kiểu đối tượng
type ArticleAction = {
    type: string
    article?: IArticle
    articles?: IArticle[]
    error?: Error
}

type EmployeeAction = {
    type: string
    employee?: IEmployee
    employees?: IEmployee[]
    error?: Error
    searchValue?: string
}

type FieldType = {
    name?: string,
    status?: string
}

type HistoryType = {
    navigate: NavigateFunction;
    location: Location<any>;
}

type HomeCardProps = {
    title: string;
    value: number;
    icon: ReactNode;
}

type AdminFunctionTableChartProps = {
    dataSource: IAdminFunction[];
    isLoading: boolean;
    labels: string[];
}

type BarChartType = {
    options: ChartOptions<'bar'>;
    data: ChartData<'bar'>;
}

type TableColumnType1 = {
    title: string;
    dataIndex: string;
}

type TableColumnType2 = {
    title: string;
    dataIndex: string;
    align?: string;
    editable?: boolean;
}

interface EditableCellProps {
    editable: boolean;
    dataIndex: keyof IAdmission;
    title: React.ReactNode;
    record: IAdmission;
    children: React.ReactNode;
}

// Kiểu hàm
type DispatchType = (args: ArticleAction) => ArticleAction

type EmployeeDispatchType = (args: EmployeeAction) => EmployeeAction

type UserReducerType = {
    logout: (args: UserState) => void;
}

type ExtraReducersType = (builder: any) => void;


