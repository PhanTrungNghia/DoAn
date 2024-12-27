import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { NavigateFunction, useLocation, useNavigate, Location } from "react-router-dom";

const SideMenu = () => {
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string>("/");
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname])

    if (!authUser) return null;

    return (
        <div className="SideMenu">
            <Menu
                onClick={(item) => {
                    console.log(item.key);
                    navigate(item.key);
                }}
                selectedKeys={[selectedKeys]}
                items={[
                    {
                        label: "Quản lý nhập học",
                        icon: <SettingOutlined/>,
                        key: "/quanlynhaphoc",
                    },
                ]}>

            </Menu>
        </div>
    )
}

export default SideMenu;