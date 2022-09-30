import { createContext, useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { Header, IconBar, SideBar } from "components/layout";
import { CookiePopup } from "components/others";


const ToggleMode = createContext();
const storedMode = () => {
    return localStorage.getItem("mode") === "dark" ? "dark" : "light";
}


function DefaultLayout(props) {
    const [cookieState, setCookieState] = useState(storedMode);
    const [mode, setMode] = useState(storedMode);

    // TODO: multiple state :-> memo
    useEffect(() => {
        const cStatus = localStorage.getItem("cookieStatus");
        setCookieState(cStatus === "true" ? true : false);
    }, []);



    return (
        <ToggleMode.Provider value={[mode, setMode]}>
            <div className="container" data-theme={mode}>
                <Header />
                <IconBar />
                <SideBar />
                <CookiePopup setState={setCookieState} state={cookieState} />

                <Outlet />
            </div>
        </ToggleMode.Provider>
    )
}



export { DefaultLayout, ToggleMode };