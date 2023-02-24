import axios from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";



const useAuthAxios = () => {
    const authState = useSelector((states) => states.authState);

    const baseAxiosInstance_ = useMemo(() => axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authState.access,
        }
    }), [authState]);


    return authState.state ? baseAxiosInstance_ : baseAxiosInstance;
};

export default useAuthAxios;