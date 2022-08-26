import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { isExpired, parseJwt, setAuthBasedOnRefreshToken } from "./utils/helpers"
import { Home, Layout } from "./pages";
import "./styles/base.css";
import { useAxios } from "utils/requests";


function App(props) {
    const [auth, setAuth] = useState(false);
    const [cookieState, setCookieState] = useState(false);

    // Note: only one function should be ablue to mutate each item in storage
    const cStatus = localStorage.getItem("cookieStatus");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        setCookieState(cStatus ? true : false)// this is here as the other might perform some net calls

        if (accessToken) {
            const [tokenHasExpired, tokenSoonExpire] = isExpired(parseJwt(accessToken));
            const [refreshHasExpired, refreshSoonExpired] = isExpired(parseJwt(refreshToken));
            setAuthBasedOnRefreshToken({ setAuth, tokenHasExpired, tokenSoonExpire, refreshHasExpired });
        }
    }, [])

    //TODO: two useState protect with memo
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;