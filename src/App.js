import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Articles, Home, Layout } from "./pages";
import "./styles/base.css";

import LoginRequired from "components/others/Protected";
import { Comments } from "pages/Treads";
import IconSize from "components/wrappers/IconSize";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ArticleDetail from "pages/ArticleDetail";
import FeedDetail from "pages/Detail";
import Trending from "pages/Trending";
import Saved from "pages/Saved";
import Liked from "pages/Liked";


function App(props) {
    // const [auth, setAuth] = useState(false);

    // Note: only one function should be able to mutate each item in storage
    // const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");

    // useEffect(() => {
    //     if (accessToken) {
    //         const [tokenHasExpired, tokenSoonExpire] = isExpired(parseJwt(accessToken));
    //         const [refreshHasExpired, refreshSoonExpired] = isExpired(parseJwt(refreshToken));
    //         setAuthBasedOnRefreshToken({ setAuth, tokenHasExpired, tokenSoonExpire, refreshHasExpired });
    //     }
    // }, [])

    //TODO: two useState protect with memo
    const WrappedLayout = <IconSize element={<Layout />} />

    return (
        <Router>
            <Routes>
                <Route path="/" element={WrappedLayout}>
                    <Route index element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    {/* <Route path="/post/:id/comments/" element={<Comments />} /> */}
                    {/* <Route element={<LoginRequired />}> */}
                    {/*  profile, create post */}
                    <Route path="/article/:slug" element={<ArticleDetail />} />
                    <Route path="/detail/:slug" element={<FeedDetail />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/fresh" element={<Trending />} />
                    <Route path="/saved" element={<LoginRequired ><Saved /></LoginRequired>} />
                    <Route path="/liked" element={<LoginRequired ><Liked /></LoginRequired>} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )
}


export default App;