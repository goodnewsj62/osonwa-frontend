import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Articles, Home, Layout } from "./pages";
import "./styles/base.css";

import LoginRequired from "components/others/Protected";
// import { Comments } from "pages/Treads";
import IconSize from "components/wrappers/IconSize";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ArticleDetail from "pages/ArticleDetail";
import FeedDetail from "pages/Detail";
import Trending from "pages/Trending";
import Saved from "pages/Saved";
import Liked from "pages/Liked";
import Profile from "pages/Profile";
import { useDispatch } from "react-redux";
import { refreshToken } from "store/authSlice";


function App(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const jwtToken = JSON.parse(token);
            dispatch(refreshToken(jwtToken.refresh));
        }
    }, [dispatch]);

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
                    <Route path="/:username" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )
}


export default App;