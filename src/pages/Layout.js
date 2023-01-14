import { Outlet } from "react-router-dom"
import { Header, SideNavBar } from "components/layout";
import { CookiePopup } from "components/others";
import { useEffect, useState } from "react";
import TagPopup from "components/profile/TagPopup";


// const storedMode = () => {
//     return localStorage.getItem("mode") === "dark" ? "dark" : "light";
// }


function DefaultLayout(props) {
    const [hasAcceptedCookie, setHasAcceptedCookie] = useState(true);


    useEffect(() => {
        const cookieStatus = localStorage.getItem("cookieStatus");

        if (cookieStatus !== "true") setHasAcceptedCookie(false);

    }, []);

    const cookieState = { hasAcceptedCookie, setHasAcceptedCookie };
    return (
        <div className="container">
            <Header />
            <SideNavBar />
            {!hasAcceptedCookie && <CookiePopup cookieState={{ ...cookieState }} />}
            <TagPopup />

            <Outlet />
        </div>
    )
}



export { DefaultLayout };