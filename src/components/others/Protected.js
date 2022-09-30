import { useLocation, Navigate, Outlet } from "react-router-dom";


function LoginRequired({ auth }) {
    const from = useLocation();
    if (!auth) {
        <Navigate to="/" state={{ from, loginPopStatus: true }} />
    }
    else {
        <Outlet />
    }
}


export default LoginRequired;
