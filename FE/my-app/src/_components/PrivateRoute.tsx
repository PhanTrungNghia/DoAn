import { Navigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "../_helpers/history";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { location } = useHistory();

    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )

    console.log("authUser: " + authUser);

    // not logged in so redirect to login page with the return url
    if (!authUser)
        return <Navigate to="/login" state={{ from: location }} />

    // authorized so return child components
    return children;
}