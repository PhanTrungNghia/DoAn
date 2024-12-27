import { BellOutlined, MailFilled } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";
import '../../App.css';
import { authActions } from "../../_store/auth.slice";
import { useDispatch } from "react-redux";

const AppHeader = () => {
    const dispatch = useDispatch<any>();
    const logout = () => dispatch(authActions.logout());

    return (
        <div className="AppHeader">
            <Image
                width={42}
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-DH-Kien-Truc-Ha-Noi-HAU-BL.png">
            </Image>
            <Space>
                {/* <Badge count={20}>
                    <BellOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={10} dot>
                    <MailFilled style={{ fontSize: 24 }} />
                </Badge> */}
            </Space>
        </div>
    )
}

export default AppHeader;