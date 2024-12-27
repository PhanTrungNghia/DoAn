import { useSelector, shallowEqual } from "react-redux";
import PageContent from "../PageContent/PageContent";
import SideMenu from "../SideMenu/SideMenu";
import { useState, useEffect } from "react";
import AdmissionProcess from "../../Pages/admissionProcess/AdmissionProcess";
import { PrivateRoute } from "../PrivateRoute";

export const AppBody = () => {
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    );

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isStudent, setIsStudent] = useState<boolean>(false);
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

            // Check token expiration
            if (exp && currentTime >= exp) {
                console.log('Token has expired. Perform logout action.');
            } else {
                console.log('Token is still valid.');
            }

            // Set isAdmin based on the role
            if (role === "Admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

            if (role === "Student") {
                setIsStudent(true);
            } else {
                setIsStudent(false);
            }
        }
    }, [authUser, exp, currentTime, role]); // Added dependencies to ensure proper rerender

    if (!authUser) return null;

    return (
        <div className={`${isAdmin ? "SideMenuAndPageContent" : ""}`}>
            {isAdmin && (
                <>
                    <SideMenu />
                    <PageContent />
                </>
            )}
            {isStudent && (
                <PrivateRoute><AdmissionProcess /></PrivateRoute>
            )}

        </div>
    );
};
