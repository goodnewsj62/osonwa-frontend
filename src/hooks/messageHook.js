import { useEffect, useState } from "react";


const useMessage =  ()=>{
    const [message, setMessage] =  useState({status:false, message:"",category:""});

    useEffect(()=>{
        const timeout =  setTimeout(()=>{
            setMessage({status:false, message:"", category:""});
        }, 3000);

        return ()=>clearTimeout(timeout);
    }, [message]);

    return [message, setMessage];
}


export default useMessage;