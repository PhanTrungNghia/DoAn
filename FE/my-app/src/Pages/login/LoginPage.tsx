import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "../../_helpers/history";
import { Button, Checkbox, Form, Image, Input, message, Select, Space } from "antd";
import { DownOutlined, HomeOutlined, LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { authActions } from "../../_store/auth.slice";

export const LoginPage = () => {
    const { Option } = Select;
    const [form] = Form.useForm(); // Create a form instance
    const dispatch = useDispatch<any>();
    const authUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    );
    const authError = useSelector(
        (state: any) => state.auth.error,
        shallowEqual
    );

    const { navigate } = useHistory(); // Get navigate from custom hook

    useEffect(() => {
        // Redirect to home if already logged in
        if (authUser) {
            navigate('/');
        }
    }, [authUser, navigate]);

    if (authUser) {
        return null;
    }

    const login = async () => {
        try {
            const values = await form.validateFields();
            console.log(values);
            const { myUserName, myPassword } = values;
            message.success(`Đăng nhập thành công: ${myUserName}`);
            const userLogin: UserLogin = {
                username: myUserName,
                password: myPassword
            };
            console.log(userLogin);

            // Dispatch the login action
            return dispatch(authActions.login(userLogin));
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <div className="wrapper">
            <div className="picture">
            </div>
            <div className="signin">
                <div className="LoginPage">
                    <div className="LoginTitle">Đăng nhập</div>
                    {/* <form className="ant-form ant-form-verical"></form> */}
                    <div className="LoginForm">
                        <Form
                            form={form}
                            onFinish={login}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Tên đăng nhập"
                                name="myUserName"
                                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="myPassword"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <FormItem style={{ textAlign: 'center' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className="login-form-button"
                                >
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </div>
                    <div className="LoginCopyRight">
                        <span>
                            Bản quyền thuộc về
                        </span>
                        <a>hau.edu.vn</a>
                        <span>
                            © 2017
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
