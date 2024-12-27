import { Button, Form, FormProps, Input } from "antd";
import Modal from "antd/es/modal/Modal"
import { shallowEqual, useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAdminFunction, readAllAdminFunctions } from "../../_store/store";

type Props = {
    id?: number;
    setPopup: (isPopup: boolean) => void;
    isPopup: boolean;
    isEdited: boolean;
}

export const AdminFunction: React.FC<Props> = ({ id, setPopup, isPopup, isEdited }) => {
    const adminFunctions: readonly IAdminFunction[] = useSelector(
        (state: any) => state.adminFunctionReducer.adminFunctions,
        shallowEqual
    )
    const adminFunction: IAdminFunction | undefined = adminFunctions.find((af: IAdminFunction) => af.ID == id);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const handleOk = () => {
        setPopup(false);
    }
    const handleCancel = () => {
        setPopup(false);
    }
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        // Tạo ID ngẫu nhiên
        // Tạo đối tượng adminFunction
        const adminFunction: IUpdateAdminFunction = {
            ID: id?.toString(),
            NAME: values.name,
            STATUS: values.status,
        };

        //Gọi dispatch với createAdminFunction
        dispatch(updateAdminFunction(adminFunction));
        setPopup(false);
        navigate("/readAllAdminFunction");
        dispatch(readAllAdminFunctions());
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            centered
            open={isPopup}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
        >
            {isEdited ? (
                <>
                    <h4>Edited Info</h4>
                    <div className="w-50 mx-auto">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Function Name: "
                                name="name"
                                rules={[{ required: true, message: 'Please input your function name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Status: "
                                name="status"
                                rules={[{ required: true, message: 'Please input your status!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    {/* Thêm nội dung hoặc các trường khác nếu cần */}
                </>
            ) : (
                <>
                    <h4>Admin Function Details</h4>
                    <p><strong>Name:</strong> {adminFunction?.NAME}</p>
                    <p><strong>Status:</strong> {adminFunction?.STATUS}</p>
                </>
            )}
        </Modal>
    )
} 