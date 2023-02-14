import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


function LoginRequired(props) {
    const from = useLocation();
    const isAuthenticated = useSelector((state) => state.authState.state);

    if (!isAuthenticated) {
        return <Navigate to={"/"} state={{ from, loginPopStatus: true }} />
    }

    return props.children
}


export default LoginRequired;
