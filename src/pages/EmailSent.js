import { SpreadLoader } from "components/others";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";



const EmailSent =  (props)=>{
    const [isLoading, setIsLoading ] =  useState(true);
    const [isSuccessful, setIsSuccessful ] =  useState(true);
    const location =  useLocation();
    const action = location.state.action;
    const payload = location.state.payload;
    const url = location.state.url;

    useEffect(()=>{
        baseAxiosInstance({url:url, method:"get", params:payload})
        .then((resp)=>{
            setIsSuccessful(resp.status <= 200);
        })
        .catch((resp)=>{
            setIsSuccessful(false);
        })

        setIsLoading(false);
    }, [payload, url]);

    const success =  (
            <div>
                <h3>An Email has been sent to {Object.values(payload)[0]}. Kindly visit your email address to {action}</h3>
                <Link to="/">Home</Link>
            </div>
        );
    const failure =  (
        <div>
            <h3>Looks like an error occurred.</h3>
            <Link to="/">Home</Link>
        </div>
    );

    const message =  isSuccessful? success : failure;

    return(
        <div>
            <div>
                <div>
                    <SpreadLoader />
                </div>
                <div>
                    <i>Please wait...</i>
                </div>
            </div>
            {!isLoading && <div>{message}</div>}
        </div>
    )
};

export default EmailSent;