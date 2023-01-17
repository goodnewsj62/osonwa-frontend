import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




export default function UnAuthenticatedOnly(props){
    const authState =  useSelector((state)=>state.authState.state);

    if(authState){
        return <Navigate to={"/"} state={{message:"already logged in"}} />
    }else{
        return props.children
    }
};