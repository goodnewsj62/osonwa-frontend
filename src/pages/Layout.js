import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "../layout";
import { MessagePopup, CookiePopup, AuthCard } from "../others";

function DefaultLayout(props) {
    return (
        <div className="container">
            <Header />
            <IconBar />
            <SideBar />
            <MessagePopup />
            <AuthCard />
            <CookiePopup />

            <Outlet />
        </div>
    )
}


export {DefaultLayout};