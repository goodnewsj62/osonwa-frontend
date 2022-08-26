import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "../layout";
import { CookiePopup } from "../others";

function DefaultLayout(props) {
    const [cookieState, setCookieState] = useState(false);
    
    // TODO: multiple state :-> memo 
    useEffect(()=> {
        const cStatus = localStorage.getItem("cookieStatus");
        setCookieState(cStatus == "true" ? true : false);
    },[]);

    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            <CookiePopup setState={setCookieState} state={cookieState}  />
            
            <Outlet />
        </div>
    )
}




export {DefaultLayout};