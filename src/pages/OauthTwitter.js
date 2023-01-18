import SignUpModal from "components/auth/SignUpModal";
import { SpreadLoader } from "components/others";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import { authenticateUserAndRedirect } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";


const OauthTwitter =  (props)=>{
    const [register, setRegister] = useState({state:false,email:"",url:"", cred:{}});
    const location_ =  useLocation();
    const dispatch =  useDispatch();
    const navigate =  useNavigate();

    useEffect(()=>{
        const queryParams =  location_.search;
        const params =  new URLSearchParams(queryParams);
        authenticate(params);
    },[])

    async function authenticate(params){
        const oauth_data =  {oauth_token:params.oauth_token, oauth_verifier: params.oauth_verifier};
        try{
            const resp =  await baseAxiosInstance.post(oauth_data,{ValidityState: (status)=> status < 400});
            const data =  resp.data.data
            if(resp.status !== 308){
                authenticateUserAndRedirect(data, dispatch, navigate, location_.state);
            }else{
                setRegister({state:false,email:data.email,url:data.url, cred:{...oauth_data}});
            }
        }catch(err){
            if (err.response.status >= 500) { 
                navigate("/", {state:{message: "oops an error occurred in our system"}});
            } else if (err.response.status >= 400 && err.response.status < 500) {
                navigate("/", {state:{message: err.response.data.message.error}});
            } else if (err.request) {
                navigate("/", {state:{message: "authentication failed."}});
            }
        }
    } 
    return (
        <>
            {!register.state && <SpreadLoader fullHeight={true} />}
            {register.state && register.email && register.cred && <SignUpModal extraInfo={register} />}
        </>
    )
};


export default OauthTwitter;