import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchAdminFunction } from "../_store/reducers/adminFunctionSlice";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { authActions } from "../_store/store";
import { Image, Space } from "antd";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate();
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )
    const [searchData, setSearchData] = useState<string | undefined>();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (searchData) {
            dispatch(searchAdminFunction(searchData));
        }
    }, [searchData, dispatch]);

    const logout = () => {
        dispatch(authActions.logout());
        navigate("/login");
    }

    // only show nav when logged in
    if (!authUser) return null;

    return (
        <div className="NavBar">
            <Space>
                <Image
                    width={42}
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-DH-Kien-Truc-Ha-Noi-HAU-BL.png">
                </Image>
                <a className="navbar-brand" href="/quanlynhaphoc">
                    HANOI ARCHITECTURAL UNIVERSITY
                </a>
            </Space>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/readAllAdminFunction">
                                ALL
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addAdminFunction">
                                ADD
                            </a>
                        </li> */}
                </ul>
                {/* <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setSearchData(e.currentTarget.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button> */}
            </div>
            <button
                onClick={logout}
                className="btn btn-link nav-item nav-link LogoutBtn">
                Logout
            </button>
        </div>
    );
};
