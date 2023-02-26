import { useLocation } from "react-router-dom";



const useCurrentUrlPath = () => {
    const location = useLocation();
    let path = location.search ? location.pathname + location.search : location.pathname;
    path = location.hash ? path + location.hash : path;


    return path.replace("/", "");
};

export default useCurrentUrlPath;