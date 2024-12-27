import { Route, Routes } from "react-router-dom";
import { AddAdminFunction } from "../../Pages/adminFunction/AddAdminFunction";
import { PrivateRoute } from "../PrivateRoute";
import Home from "../../Pages/adminFunction/Home";
import { Demo } from "../../Pages/adminFunction/DemoPage";
import DataTable from "../../DataTable/DataTable";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import AdmissionPage from "../../Pages/admission/AdmissionPage";

const AppRoutes = () => {
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [exp, setExp] = useState<number | undefined>(0);
    const [role, setRole] = useState<string | undefined>("");
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
        if (authUser) {
            const parts: string[] = authUser.token.split('.');
            const decodedPayload: string = atob(parts[1]);
            const parsedPayload: { [key: string]: any } = JSON.parse(decodedPayload);
            const { exp, role }: { exp?: number, role?: string } = parsedPayload;
            setExp(exp);
            setRole(role);
            const currentTime: number = Math.floor(Date.now() / 1000);
            setCurrentTime(currentTime);
        }
        if (exp && currentTime >= exp) {
            console.log('Token has expired. Perform logout action.');
        } else {
            console.log('Token is still valid.');
        }
    }, [authUser]);

    useEffect(() => {
        if (role && role === "Admin") {
            console.log(role);
            setIsAdmin(true);
        }

    })

    return (
        <Routes>
            {isAdmin && <Route path="/readAllAdminFunction" element={<PrivateRoute><AdmissionPage /></PrivateRoute>}></Route>}
            {isAdmin && <Route path="/addAdminFunction" element={<PrivateRoute><AddAdminFunction /></PrivateRoute>} />}
            <Route path="/demo" element={<Demo />} />
            <Route path="/home" element={<Home />} />
            {isAdmin && <Route path="/quanlynhaphoc" element={<PrivateRoute><AdmissionPage /></PrivateRoute>} />}
            {/* <Route path="*" element={<Navigate to="/readAllAdminFunction" />} /> */}
        </Routes>
    )
}

export default AppRoutes;