import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "components/layout";
import { CookiePopup } from "components/others";
import { useEffect, useState } from "react";


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
            <IconBar />
            <SideBar />
            {!hasAcceptedCookie && <CookiePopup cookieState={{ ...cookieState }} />}

            <Outlet />
        </div>
    )
}



export { DefaultLayout };