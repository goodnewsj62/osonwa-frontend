import { useRef } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword =  (props)=>{
    const nav =  useNavigate();
    const inpRef = useRef();

    const resetHandler =  (event)=>{
        event.preventDefault();
        const payload = {
            "payload":{email:inpRef.current.value},
            "url": "",
            "action": "set your password"
        };
        
        nav("send/reset-password/", {state:payload});
    }

    return (
        <form onSubmit={resetHandler}>
            <label htmlFor="forgot__email">Enter email address</label>
            <input type="email" id="forgot__email" ref={inpRef} />
            <button>
                Send
            </button>
        </form>
    )
};


export default ForgotPassword;