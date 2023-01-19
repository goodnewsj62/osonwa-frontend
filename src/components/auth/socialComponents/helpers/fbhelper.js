import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUserAndRedirect, setStandardError } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";


export default  function useFbAuthenticate( setLoader,setRegister, setErrorInfo){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return async (data)=>{
        try{
            const response = await baseAxiosInstance.post("/auth/facebook/", {token:data.accessToken, user_id:data.userID}, {validateStatus: (status)=> status< 400});
            if (response.status === 308) {
                const message = response.data.message;
                setRegister({ state: true, email: message.email, cred: { token: data.accessToken, user_id: data.userID }, url: message.url });
            } else {
                authenticateUserAndRedirect(response.data.data, dispatch, navigate, location.state);
            }
        }catch(err){
            setStandardError(setErrorInfo, err);
        }

        setLoader(false);
    };
};