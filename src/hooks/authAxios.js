import axios from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";



const useAuthAxios = () => {
    const authState = useSelector((states) => states.authState);

    const baseAxiosInstance = useMemo(() => axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authState.access,
        }
    }), [authState]);


    return baseAxiosInstance;
};

export default useAuthAxios;