import { Outlet } from "react-router-dom"
import { Header, SideNavBar } from "components/layout";
import { CookiePopup, MessagePopup } from "components/others";
import { useEffect, useState } from "react";
import AuthPopupModal from "components/others/AuthPopupModal";


// const storedMode = () => {
//     return localStorage.getItem("mode") === "dark" ? "dark" : "light";
// }


function DefaultLayout(props) {
    const [hasAcceptedCookie, setHasAcceptedCookie] = useState(true);



    useEffect(() => {
        const cookieStatus = localStorage.getItem("cookieStatus");
        if (cookieStatus !== "true") {
            setHasAcceptedCookie(false);
        }
    }, []);

    const cookieState = { hasAcceptedCookie, setHasAcceptedCookie };
    return (
        <div className="container">
            <Header />
            <SideNavBar />
            {!hasAcceptedCookie && <CookiePopup cookieState={{ ...cookieState }} />}
            <MessagePopup />

            <Outlet />
        </div>
    )
}



export { DefaultLayout };