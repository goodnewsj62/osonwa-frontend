import { useState } from "react";
import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "../layout";
import { MessagePopup, CookiePopup, AuthCard } from "../others";

function DefaultLayout(props) {
    const [maskStatus, setMaskStatus] = useState(true);
    const Mask = ({status}) => <div style={status? null : {display:"none"}} className="mask"></div>;

    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            <MessagePopup />
            <Mask mask={maskStatus} />
            <AuthCard />
            <CookiePopup />
            
            <Outlet />
        </div>
    )
}




export {DefaultLayout};