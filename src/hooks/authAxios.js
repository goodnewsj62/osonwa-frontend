import { useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";



const useAuthAxios = () => {
    const authState = useSelector((states) => states.authState);

    baseAxiosInstance.defaults.headers.common["Authorization"] = "Bearer " + authState.access;

    return baseAxiosInstance;
};

export default useAuthAxios;