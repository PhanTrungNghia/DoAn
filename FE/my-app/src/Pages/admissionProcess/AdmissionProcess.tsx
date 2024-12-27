import { Descriptions, Spin } from "antd";
import type { DescriptionsProps } from "antd";
import { useEffect, useMemo } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { readAllAdmissions } from "../../_store/store";

const AdmissionProcess = () => {
    // Định nghĩa typing rõ ràng cho Redux state
    interface RootState {
        admission: {
            admissions: IAdmission[];
            isLoading: boolean;
        };
        auth: {
            user: IUser | null;
        };
    }

    // Lấy dữ liệu từ Redux store
    const admissions: IAdmission[] = useSelector(
        (state: RootState) => state.admission.admissions,
        shallowEqual
    );
    const isLoading = useSelector((state: RootState) => state.admission.isLoading);
    const authUser: IUser | null = useSelector(
        (state: RootState) => state.auth.user,
        shallowEqual
    );

    const dispatch = useDispatch<any>();

    // Tìm thông tin thí sinh phù hợp
    const matchedAdmission = useMemo(
        () =>
            admissions.find(
                (admission) => admission.soBaoDanh === authUser?.name
            ),
        [admissions, authUser?.name]
    );

    // Gọi hành động đọc danh sách admissions khi cần
    useEffect(() => {
        dispatch(readAllAdmissions());
        console.log("admissions-1 ", admissions);
    }, [dispatch]);

    useEffect(() => {
        console.log("admissions-2 ", admissions);
        console.log("auth-user ", authUser?.name);
        console.log("auth-user ", authUser?.token);
        console.log("auth-user ", authUser?.id);
    }, [dispatch]);

    // Xử lý khi dữ liệu đang tải
    if (isLoading) {
        return <Spin tip="Đang tải dữ liệu..." />;
    }

    // Xử lý khi người dùng chưa đăng nhập
    if (!authUser) {
        return <div>Vui lòng đăng nhập để xem thông tin thí sinh.</div>;
    }

    // Xử lý khi không tìm thấy thông tin thí sinh
    if (!matchedAdmission) {
        return <div>Không tìm thấy thông tin thí sinh.</div>;
    }

    // Cấu hình items cho Descriptions
    const items: DescriptionsProps["items"] = [
        {
            label: "Họ và tên",
            children: `${matchedAdmission.hoDem} ${matchedAdmission.ten}`,
        },
        {
            label: "Số CCCD",
            children: matchedAdmission.soCMND,
        },
        {
            label: "Lớp",
            children: matchedAdmission.khoi,
        },
        {
            label: "Mã số sinh viên",
            children: matchedAdmission.idTruongLop12,
        },
        {
            label: "Địa chỉ",
            children: matchedAdmission.diaChiThuongTru,
        },
    ];

    return (
        <div className="description-container">
            <Descriptions
                title="Thông tin sinh viên"
                bordered
                column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                items={items}
            />
            <div className="admission-process-aciton">
                <button className="ant-btn ant-btn-primary">Quay lại</button>
                <button className="ant-btn ant-btn-primary">Tiếp tục</button>
            </div>
        </div>
    );
};

export default AdmissionProcess;
