import { FaFacebookF } from "react-icons/fa";
import { baseAxiosInstance } from "utils/requests";
import { authenticateUserAndRedirect, setStandardError } from "utils/helpers";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const FacebookHandler = ({ setErrorInfo, size, setRegister, setLoader }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    
    const authenticate =  async (data)=>{
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


    const authHandler =  (event)=>{
        window.FB.login((response)=>{
            const data =  response.authResponse;
            authenticate(data);
        },{scope:"email"});
    };

    const loginHandler = (event)=>{      
        setLoader(true);
        window.FB.getLoginStatus((response)=>{
            if(response.status === "connected"){
                const data =  response.authResponse;
                authenticate(data);
            }else{
                authHandler(event);
            }
        });
    };

    return (
        <div onClick={loginHandler} className="facebook">
            <FaFacebookF fill={"#008AF3"} size={size} />
        </div>
    );
};

export default FacebookHandler;