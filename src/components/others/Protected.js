import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


function LoginRequired(props) {
    const from = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authState.state);

    const isAuthenticatedRef = useRef(isAuthenticated);

    useEffect(() => { isAuthenticatedRef.current = isAuthenticated }, [isAuthenticated]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isAuthenticatedRef.current) {
                navigate("/", { state: { from, loginPopStatus: true } });
            }
        }, 300)

        return () => clearTimeout(timeout)
    }, [from, navigate]);

    return props.children
}


export default LoginRequired;
