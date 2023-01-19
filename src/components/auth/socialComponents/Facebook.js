import { FaFacebookF } from "react-icons/fa";
import styles from "../styles/socials.module.css";
import { BsFacebook } from "react-icons/bs";
import useFbAuthenticate from "./helpers/fbhelper";

const FacebookHandler = ({ setErrorInfo, size, setRegister, setLoader, type}) => {
    const authenticate =  useFbAuthenticate(setLoader,setRegister,setErrorInfo);

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

    const styleClasses = type === "rect"? `${styles.facebook__rect}`: ""; 
    const rectComp =  (<div>
                        <BsFacebook fill={"#fff"} size={size}/>
                        <span>Continue with Facebook</span>
                    </div>);

    return (
        <div onClick={loginHandler} className={styleClasses}>
            {type !== "rect" && <FaFacebookF fill={"#008AF3"} size={size} />}
            {type === "rect" && rectComp}
        </div>
    );
};

export default FacebookHandler;