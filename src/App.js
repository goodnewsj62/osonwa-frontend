import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { isExpired, parseJwt, setAuthBasedOnRefreshToken } from "./utils/helpers"
import { Home, Layout } from "./pages";
import "./styles/base.css";
import { useAxios } from "utils/requests";
import { LoginRequired } from "others/protected";
import { Comments } from "pages/Comments";


function App(props) {
    const [auth, setAuth] = useState(false);

    // Note: only one function should be able to mutate each item in storage
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
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
                    <Route path="/post/:id/comments/" element={<Comments />} />
                    <Route element={<LoginRequired />}>
                        {/*  profile, create post */}
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}


export default App;