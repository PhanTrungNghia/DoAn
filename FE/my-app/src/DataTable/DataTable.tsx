import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { confirmAdmission, createAdmission, deleteAdmission, readAllAdmissions, unconfirmAdmission, updateAdmission, uploadAdmission, uploadConfirmAdmission } from '../_store/store';
import {
  Table,
  TableProps,
  Popconfirm,
  Button,
  Space,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Checkbox,
  CheckboxProps,
  message
} from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { number } from 'yup';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type ColumnTypes = Exclude<TableProps<IAdmission>['columns'], undefined>;

const DataTable = () => {
  const navigate: NavigateFunction = useNavigate();
  const admissions: IAdmission[] = useSelector(
    (state: any) => state.admission.admissions,
    shallowEqual
  )
  const [gridData, setGridData] = useState<IAdmission[]>([]);
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editRowKey, setEditRowKey] = useState<number | undefined>(undefined);
  const [form] = Form.useForm();
  const [sortedInfo, setSortedInfo] = useState<any>({ columnKey: "", order: "" });
  const [searchText, setSearchText] = useState<string | "">("");
  // define state varibale without setter method 
  const [filteredData, setFilteredData] = useState<IAdmission[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [checkedVals, setCheckedVals] = useState<ConfirmRequest[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(readAllAdmissions())
      .then(() => {
        setIsLoading(false); // Set loading to false after the API call is complete
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [dispatch]);

  const handleDelete = (record: IAdmission): void => {
    dispatch(deleteAdmission(record.id));
  };

  const isEditing = (record: IAdmission) => {
    return record.id === editRowKey;  // Kiểm tra chính xác với key
  };

  const cancel = () => {
    setEditRowKey(undefined);
  };

  const save = async (recordKey: number | undefined) => {
    try {
      const row = await form.validateFields();
      const admission: IUpdateAdmission = {
        id: recordKey?.toString() || "",
        stt: row.stt || "",
        soBaoDanh: row.soBaoDanh || "",
        maHoSo: row.maHoSo || "",
      };
      dispatch(updateAdmission(admission));
      setEditRowKey(undefined);
      navigate('/quanlynhaphoc');
    } catch (error: any) {
      console.log(error);
    }
  };

  const edit = (record: IAdmission) => {
    // form.setFieldsValue({
    //   stt: "",
    //   soBaoDanh: "",
    //   maHoSo: "",
    //   ...record
    // });
    setEditRowKey(record.id);
  };

  // useEffect được gọi để thêm key cho data sau khi láy từ CSDL
  useEffect(() => {
    setGridData(admissions);
  }, [admissions]);

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      dataIndex: "Checkbox",
      align: "center",
      render: (_, record) => {
        // Tìm kiếm nếu row id có tồn tại trong checkedVals
        const isChecked = checkedVals.some(admission => admission.id === record.id && admission.value);
        return (
          <Checkbox
            checked={isChecked}
            onChange={(e) => handleClickEvent(record.id, e)}
          />
        );
      },
    },
    { title: "Stt", dataIndex: "stt", align: "center", editable: true },
    {
      title: "Xác nhận trúng tuyển",
      dataIndex: "isConfirm",
      align: "center",
      render: (_, record) => (
        <Checkbox checked={record.isConfirm}></Checkbox>
      ),
    },
    {
      title: "Đã nộp hồ sơ",
      dataIndex: "isPaid",
      align: "center",
      render: (_, record) => (
        <Checkbox checked={record.isPaid}></Checkbox>
      ),
    },
    {
      title: "Đã thanh toán",
      dataIndex: "isProfile",
      align: "center",
      render: (_, record) => (
        <Checkbox checked={record.isProfile}></Checkbox>
      ),
    },
    { title: "Số Báo Danh", dataIndex: "soBaoDanh", align: "center", editable: true },
    { title: "Mã Hồ Sơ", dataIndex: "maHoSo", align: "center", editable: true },
    { title: "Họ Đệm", dataIndex: "hoDem", align: "center", editable: true },
    { title: "Tên", dataIndex: "ten", align: "center", editable: true },
    { title: "Ngày Sinh", dataIndex: "ngaySinh", align: "center", editable: true },
    { title: "Giới Tính", dataIndex: "gioiTinh", align: "center", editable: true },
    { title: "ID Ngành", dataIndex: "idNganh", align: "center", editable: true },
    { title: "ID Nghề", dataIndex: "idNghe", align: "center", editable: true },
    { title: "ID Loại Sinh Viên", dataIndex: "idLoaiSinhVien", align: "center", editable: true },
    { title: "Khối", dataIndex: "khoi", align: "center", editable: true },
    { title: "ID Phân Loại TS", dataIndex: "idPhanLoaiTS", align: "center", editable: true },
    { title: "Điểm Xét Tuyển", dataIndex: "diemXetTuyen", align: "center", editable: true },
    { title: "Điểm Môn 1", dataIndex: "diemMon1", align: "center", editable: true },
    { title: "Điểm Môn 2", dataIndex: "diemMon2", align: "center", editable: true },
    { title: "Điểm Môn 3", dataIndex: "diemMon3", align: "center", editable: true },
    { title: "ID Khu Vực", dataIndex: "idKhuVuc", align: "center", editable: true },
    { title: "Xếp Loại Học Tập", dataIndex: "xepLoaiHocTap", align: "center", editable: true },
    { title: "ID Đối Tượng", dataIndex: "idDoiTuong", align: "center", editable: true },
    { title: "Xếp Loại Hạnh Kiểm", dataIndex: "xepLoaiHanhKiem", align: "center", editable: true },
    { title: "Hộ Khẩu Tỉnh", dataIndex: "hktt_IDTinh", align: "center", editable: true },
    { title: "Hộ Khẩu Huyện", dataIndex: "hktt_IDHuyen", align: "center", editable: true },
    { title: "Hộ Khẩu Phường Xã", dataIndex: "hktt_PhuongXa", align: "center", editable: true },
    { title: "ID Trường Lớp 12", dataIndex: "idTruongLop12", align: "center", editable: true },
    { title: "Năm Tốt Nghiệp", dataIndex: "namTotNghiep", align: "center", editable: true },
    { title: "Số Điện Thoại", dataIndex: "soDienThoai", align: "center", editable: true },
    { title: "Email", dataIndex: "email", align: "center", editable: true },
    { title: "Địa Chỉ Nhận Giấy Báo", dataIndex: "diaChiNhanGiayBao", align: "center", editable: true },
    { title: "Nơi Sinh", dataIndex: "noiSinh", align: "center", editable: true },
    { title: "ID Dân Tộc", dataIndex: "idDanToc", align: "center", editable: true },
    { title: "Số CMND", dataIndex: "soCMND", align: "center", editable: true },
    { title: "Địa Chỉ Thường Trú", dataIndex: "diaChiThuongTru", align: "center", editable: true },
    { title: "Địa Chỉ Liên Lạc", dataIndex: "diaChiLienLac", align: "center", editable: true },
    { title: "Giấy Khen", dataIndex: "giayKhen", align: "center", editable: true },
    { title: "Khen Thưởng Kỷ Luật", dataIndex: "khenThuongKyLuat", align: "center", editable: true },
    { title: "Nhập Học", dataIndex: "nhapHoc", align: "center", editable: true },
    { title: "Điểm TBC Toàn Khóa", dataIndex: "diemTBCToanKhoa", align: "center", editable: true },
    { title: "Điểm Khuyến Khích", dataIndex: "diemKhuyenKhich", align: "center", editable: true },
    { title: "Phương Thức Trúng Tuyển", dataIndex: "phuongThucTrungTuyen", align: "center", editable: true },
    {
      title: "Action",
      dataIndex: "ACTION",
      align: "center",
      render: (_, record) => {
        const editable: boolean = isEditing(record);
        return admissions.length >= 1 ? (
          <Space>
            <Button onClick={saveAdmission} style={{ backgroundColor: 'yellow', borderColor: 'yellow' }}>Thêm</Button>
            <Popconfirm title="Bạn có muốn xóa không?" onConfirm={() => handleDelete(record)}>
              <Button danger type="primary" disabled={editable}>Xóa</Button>
            </Popconfirm>
            {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={() => save(record.id)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    Lưu
                  </Button>
                  <Popconfirm title="Bạn có muốn hủy không?" onConfirm={cancel}>
                    <Button>Hủy</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button type="primary" onClick={() => edit(record)}>Sửa</Button>
            )}
          </Space>
        ) : null;
      }
    }
  ];

  const handleClickEvent = (checkedRowId: number, e: CheckboxChangeEvent) => {
    console.log(`Row ID: ${checkedRowId}, checked = ${e.target.checked}`);

    // Cập nhật lại trạng thái của checkedVals
    const checkedAdmission: ConfirmRequest = {
      id: checkedRowId,
      value: e.target.checked
    };

    console.log(checkedAdmission);

    // Cập nhật trạng thái checkedVals
    setCheckedVals((prevAdmissions: ConfirmRequest[]) => {
      // Kiểm tra nếu đã có row với id này trong state, nếu có thì cập nhật, nếu không thì thêm mới
      const existingIndex = prevAdmissions.findIndex(admission => admission.id === checkedRowId);
      if (existingIndex !== -1) {
        const updatedAdmissions = [...prevAdmissions];
        updatedAdmissions[existingIndex] = checkedAdmission;  // Cập nhật giá trị
        return updatedAdmissions;
      } else {
        return [...prevAdmissions, checkedAdmission];  // Thêm mới row vào state
      }
    });
  };


  const confirm = () => {
    dispatch(confirmAdmission(checkedVals));
    setCheckedVals([]);
  }

  const unconfirm = () => {
    dispatch(unconfirmAdmission(checkedVals));
    setCheckedVals([]);
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IAdmission) => ({
        record,
        editable: col.editable && isEditing(record),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  }) as ColumnTypes;

  const EditableCell: React.FC<EditableCellProps> = ({
    editable,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const handleChangeColumnTable = (...sorter: any[]) => {
    const { order, field } = sorter[2];
    // Gán giá trị cho sortedInfo
    setSortedInfo({ columnKey: field, order });
  }

  const reset = () => {
    startAnimation();
    setSortedInfo({});
    setSearchText("");
    setGridData([]);
    dispatch(readAllAdmissions());
    setGridData(gridData);
    setCheckedVals([]);
  }

  const handleChangeTextInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setFilteredData(gridData);
    }
  }

  const globalSearch = () => {
    const filtered = gridData!.filter((value) => {
      return (
        value.stt?.toLowerCase().includes(searchText.toLowerCase()) ||
        value.soBaoDanh?.toLowerCase().includes(searchText.toLowerCase()) ||
        value.maHoSo?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }

  const saveAdmission = () => {
    setIsAddDialogOpen(true)
  }

  const submitAdmission = (values: any) => {
    // Tạo đối tượng Admission
    const Admission: ICreateAdmission = {
      stt: values.stt,
      soBaoDanh: values.soBaoDanh,
      maHoSo: values.maHoSo,
      hoDem: values.hoDem,
      ten: values.ten,
      ngaySinh: values.ngaySinh,
      gioiTinh: values.gioiTinh,
      idNganh: values.idNganh,
      idNghe: values.idNghe,
      idLoaiSinhVien: values.idLoaiSinhVien,
      khoi: values.khoi,
      idPhanLoaiTS: values.idPhanLoaiTS,
      diemXetTuyen: values.diemXetTuyen,
      diemMon1: values.diemMon1,
      diemMon2: values.diemMon2,
      diemMon3: values.diemMon3,
      idKhuVuc: values.idKhuVuc,
      xepLoaiHocTap: values.xepLoaiHocTap,
      idDoiTuong: values.idDoiTuong,
      xepLoaiHanhKiem: values.xepLoaiHanhKiem,
      hktT_IDTinh: values.hktt_IDTinh,
      hktT_IDHuyen: values.hktt_IDHuyen,
      hktT_PhuongXa: values.hktt_PhuongXa,
      idTruongLop12: values.idTruongLop12,
      namTotNghiep: values.namTotNghiep,
      soDienThoai: values.soDienThoai,
      email: values.email,
      diaChiNhanGiayBao: values.diaChiNhanGiayBao,
      noiSinh: values.noiSinh,
      idDanToc: values.idDanToc,
      soCMND: values.soCMND,
      diaChiThuongTru: values.diaChiThuongTru,
      diaChiLienLac: values.diaChiLienLac,
      giayKhen: values.giayKhen,
      khenThuongKyLuat: values.khenThuongKyLuat,
      nhapHoc: values.nhapHoc,
      diemTBCToanKhoa: values.diemTBCToanKhoa,
      diemKhuyenKhich: values.diemKhuyenKhich,
      phuongThucTrungTuyen: values.phuongThucTrungTuyen,
    };

    // Gọi dispatch với createAdmission
    dispatch(createAdmission(Admission));
    message.success("Thêm mới sinh viên thành công!");
    setIsAddDialogOpen(false);
    // Chuyển hướng
    navigate("/quanlynhaphoc");
  };


  const addPopupForm = () => {
    return (
      <Form onFinish={submitAdmission}>
        <Form.Item name={"stt"} label="STT">
          <Input placeholder='Nhập STT'></Input>
        </Form.Item>
        <Form.Item name={"soBaoDanh"} label="Số báo danh">
          <Input placeholder='Nhập số báo danh'></Input>
        </Form.Item>
        <Form.Item name={"maHoSo"} label="Mã hồ sơ">
          <Input placeholder='Nhập mã hồ sơ'></Input>
        </Form.Item>
        <Form.Item name={"hoDem"} label="Họ đệm">
          <Input placeholder='Nhập họ đệm'></Input>
        </Form.Item>
        <Form.Item name={"ten"} label="Tên">
          <Input placeholder='Nhập tên'></Input>
        </Form.Item>
        <Form.Item name={"ngaySinh"} label="Ngày sinh">
          <Input placeholder='Nhập ngày sinh'></Input>
        </Form.Item>
        <Form.Item name={"gioiTinh"} label="Giới tính">
          <Input placeholder='Nhập giới tính'></Input>
        </Form.Item>
        <Form.Item name={"idNganh"} label="ID Ngành">
          <Input placeholder='Nhập ID ngành'></Input>
        </Form.Item>
        <Form.Item name={"idNghe"} label="ID Nghề">
          <Input placeholder='Nhập ID nghề'></Input>
        </Form.Item>
        <Form.Item name={"idLoaiSinhVien"} label="ID Loại sinh viên">
          <Input placeholder='Nhập ID loại sinh viên'></Input>
        </Form.Item>
        <Form.Item name={"khoi"} label="Khối">
          <Input placeholder='Nhập khối'></Input>
        </Form.Item>
        <Form.Item name={"idPhanLoaiTS"} label="ID Phân loại TS">
          <Input placeholder='Nhập ID phân loại TS'></Input>
        </Form.Item>
        <Form.Item name={"diemXetTuyen"} label="Điểm xét tuyển">
          <Input placeholder='Nhập điểm xét tuyển'></Input>
        </Form.Item>
        <Form.Item name={"diemMon1"} label="Điểm môn 1">
          <Input placeholder='Nhập điểm môn 1'></Input>
        </Form.Item>
        <Form.Item name={"diemMon2"} label="Điểm môn 2">
          <Input placeholder='Nhập điểm môn 2'></Input>
        </Form.Item>
        <Form.Item name={"diemMon3"} label="Điểm môn 3">
          <Input placeholder='Nhập điểm môn 3'></Input>
        </Form.Item>
        <Form.Item name={"idKhuVuc"} label="ID Khu vực">
          <Input placeholder='Nhập ID khu vực'></Input>
        </Form.Item>
        <Form.Item name={"xepLoaiHocTap"} label="Xếp loại học tập">
          <Input placeholder='Nhập xếp loại học tập'></Input>
        </Form.Item>
        <Form.Item name={"idDoiTuong"} label="ID Đối tượng">
          <Input placeholder='Nhập ID đối tượng'></Input>
        </Form.Item>
        <Form.Item name={"xepLoaiHanhKiem"} label="Xếp loại hành kiểm">
          <Input placeholder='Nhập xếp loại hành kiểm'></Input>
        </Form.Item>
        <Form.Item name={"hktt_IDTinh"} label="ID Tỉnh (Hộ khẩu thường trú)">
          <Input placeholder='Nhập ID tỉnh'></Input>
        </Form.Item>
        <Form.Item name={"hktt_IDHuyen"} label="ID Huyện (Hộ khẩu thường trú)">
          <Input placeholder='Nhập ID huyện'></Input>
        </Form.Item>
        <Form.Item name={"hktt_PhuongXa"} label="Phường/Xã (Hộ khẩu thường trú)">
          <Input placeholder='Nhập phường/xã'></Input>
        </Form.Item>
        <Form.Item name={"idTruongLop12"} label="ID Trường lớp 12">
          <Input placeholder='Nhập ID trường lớp 12'></Input>
        </Form.Item>
        <Form.Item name={"namTotNghiep"} label="Năm tốt nghiệp">
          <Input placeholder='Nhập năm tốt nghiệp'></Input>
        </Form.Item>
        <Form.Item name={"soDienThoai"} label="Số điện thoại">
          <Input placeholder='Nhập số điện thoại'></Input>
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input placeholder='Nhập email'></Input>
        </Form.Item>
        <Form.Item name={"diaChiNhanGiayBao"} label="Địa chỉ nhận giấy báo">
          <Input placeholder='Nhập địa chỉ nhận giấy báo'></Input>
        </Form.Item>
        <Form.Item name={"noiSinh"} label="Nơi sinh">
          <Input placeholder='Nhập nơi sinh'></Input>
        </Form.Item>
        <Form.Item name={"idDanToc"} label="ID Dân tộc">
          <Input placeholder='Nhập ID dân tộc'></Input>
        </Form.Item>
        <Form.Item name={"soCMND"} label="Số CMND">
          <Input placeholder='Nhập số CMND'></Input>
        </Form.Item>
        <Form.Item name={"diaChiThuongTru"} label="Địa chỉ thường trú">
          <Input placeholder='Nhập địa chỉ thường trú'></Input>
        </Form.Item>
        <Form.Item name={"diaChiLienLac"} label="Địa chỉ liên lạc">
          <Input placeholder='Nhập địa chỉ liên lạc'></Input>
        </Form.Item>
        <Form.Item name={"giayKhen"} label="Giấy khen">
          <Input placeholder='Nhập giấy khen'></Input>
        </Form.Item>
        <Form.Item name={"khenThuongKyLuat"} label="Khen thưởng kỷ luật">
          <Input placeholder='Nhập khen thưởng kỷ luật'></Input>
        </Form.Item>
        <Form.Item name={"nhapHoc"} label="Nhập học">
          <Input placeholder='Nhập học'></Input>
        </Form.Item>
        <Form.Item name={"diemTBCToanKhoa"} label="Điểm TBC toàn khóa">
          <Input placeholder='Nhập điểm TBC toàn khóa'></Input>
        </Form.Item>
        <Form.Item name={"diemKhuyenKhich"} label="Điểm khuyến khích">
          <Input placeholder='Nhập điểm khuyến khích'></Input>
        </Form.Item>
        <Form.Item name={"phuongThucTrungTuyen"} label="Phương thức trúng tuyển">
          <Input placeholder='Nhập phương thức trúng tuyển'></Input>
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000); // 2s duration for the animation
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Vui lòng chọn file để upload!');
      return;
    }
    dispatch(uploadAdmission(file));
  };

  const handleUploadConfirm = () => {
    if (!file) {
      alert('Vui lòng chọn file để upload!');
      return;
    }
    dispatch(uploadConfirmAdmission(file));
  };

  return (
    <div>
      <div className="container">
        <div className="breadcrumb">
          <div className="ant-row">
            <div className="ant-col ant-col-24">
              <nav className='ant-breadcrumb'>
                <span className='ant-breadcrumb-link'>
                  <a href='/' className='router-link-active'>Trang chủ</a>
                </span>
                <span className='ant-breadcrumb-separator'>/</span>
                <span className='ant-breadcrumb-link'>Danh sách nhập học</span>
              </nav>
            </div>
          </div>
        </div>
        <div className='page-wrapper'>
          <div className='page-head'>
            <div className='page-title'>
              Danh sách nhập học
            </div>
            <div className='page-action'>
              {/* <Input
                  placeholder='Nhập từ khóa cần tìm'
                  onChange={handleChangeTextInput}
                  type="text"
                  allowClear
                  value={searchText}
                /> */}
              <Modal
                title="Thêm Chức Năng"
                open={isAddDialogOpen}
                onCancel={() => setIsAddDialogOpen(false)}
                footer={null}
                centered
                width={1000} 
              >
                {addPopupForm()}
              </Modal>
              {/* <Button onClick={globalSearch} type="primary">Tìm kiếm</Button> */}
              <Space>
                <Popconfirm title="Bạn có muốn xác nhận không?" onConfirm={confirm}>
                  <button className='ant-btn ant-btn-primary'>
                    Xác nhận
                  </button>
                </Popconfirm>
                <Popconfirm title="Bạn có muốn xác nhận không?" onConfirm={unconfirm}>
                  <button className='ant-btn ant-btn-primary'>
                    Hủy xác nhận
                  </button>
                </Popconfirm>
                <input type="file" onChange={handleFileChange} />
                <Popconfirm title="Bạn có muốn xác nhận không?" onConfirm={handleUpload}>
                  <button className='ant-btn ant-btn-primary'>
                    Import
                  </button>
                </Popconfirm>
                <Popconfirm title="Bạn có muốn xác nhận không?" onConfirm={handleUploadConfirm}>
                  <button className='ant-btn ant-btn-primary'>
                    Import xác nhận
                  </button>
                </Popconfirm>
                <button onClick={reset} className={`ant-btn ant-btn-circle ant-btn-primary ant-btn-icon-only ${isAnimating ? 'animating' : ''}`}>
                  <i className='ri-refresh-line' ></i>
                </button>
              </Space>
            </div>
          </div>
          <div className='page-content'>
            <div id='table-scroll' className='table-scroll'>
              <Space direction='vertical' style={{ width: 1300 }}>
                <Form form={form} component={false}>
                  <Table<IAdmission>
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={filteredData && filteredData.length ? filteredData : gridData}
                    columns={columns}
                    loading={isLoading}
                    onChange={handleChangeColumnTable}
                    scroll={{ x: 'max-content' }}
                  />
                </Form>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;


