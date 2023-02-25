import { useCallback, useEffect, useState } from "react";
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
import EmailSent from "pages/EmailSent";
import ForgotPassword from "pages/ForgotPassword";
import { useDispatch } from "react-redux";
import { refreshToken } from "store/authSlice";
import { SpreadLoader } from "components/others";
import UnAuthenticatedOnly from "components/others/UnAuthenticatedOnly";
import OauthTwitter from "pages/OauthTwitter";
import { fetchAllInterest } from "store/interestsSlice";
import { fetchProfileInfo } from "store/profileSlice";
import ChangePassword from "pages/PasswordChange";
import CreateArticle from "pages/CreateArticle";
import EditPost from "pages/EditPost";
import Fresh from "pages/Fresh";
import CommentDetail from "pages/CommentDetail";


function App(props) {
    const dispatch = useDispatch();
    const [loaderStatus, setLoaderStatus] = useState(true);



    const getAuthTokenAndProfile = useCallback(async (jwtToken) => {
        try {
            const authResult = await dispatch(refreshToken(jwtToken.refresh)).unwrap();
            await dispatch(fetchProfileInfo({ accessToken: authResult.access })).unwrap();
            return setTimeout(() => { setLoaderStatus(false) }, 0);
        } catch (err) {
            return setTimeout(() => { setLoaderStatus(false) }, 0);
        }
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            getAuthTokenAndProfile(JSON.parse(token));
        } else {
            setLoaderStatus(false);
        }

        dispatch(fetchAllInterest());
    }, [dispatch, getAuthTokenAndProfile]);


    //TODO: two useState protect with memo
    const WrappedLayout = <IconSize element={<Layout />} />


    if (!loaderStatus) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={WrappedLayout}>
                        <Route index element={<Home />} />
                        <Route path="/articles" element={<Articles />} />
                        {/* <Route path="/post/:id/comments/" element={<Comments />} /> */}
                        {/* <Route element={<LoginRequired />}> */}
                        {/*  profile, create post */}
                        <Route path="/article/:slug/:id" element={<ArticleDetail />} />
                        <Route path="/aggregate/:type/:slug/:id" element={<FeedDetail />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/fresh" element={<Fresh />} />
                        <Route path="/saved" element={<LoginRequired ><Saved /></LoginRequired>} />
                        <Route path="/liked" element={<LoginRequired ><Liked /></LoginRequired>} />
                        <Route path="/:username" element={<Profile />} />
                        <Route path="/comment/:id" element={<CommentDetail />} />
                        <Route path="/email/request" element={<EmailSent />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/change-password/:token" element={<ChangePassword />} />
                        <Route path="/create-post" element={<LoginRequired ><CreateArticle /></LoginRequired>} />
                        <Route path="/edit/:slug/:id" element={<LoginRequired ><EditPost /></LoginRequired>} />
                    </Route>
                    <Route path="/login" element={<UnAuthenticatedOnly ><Login /></UnAuthenticatedOnly>} />
                    <Route path="/signup" element={<UnAuthenticatedOnly ><SignUp /></UnAuthenticatedOnly>} />
                    <Route path="/callback/twitter" element={<OauthTwitter />} />
                </Routes>
            </Router>
        )
    } else {
        return <SpreadLoader fullHeight={true} />
    }
}


export default App;