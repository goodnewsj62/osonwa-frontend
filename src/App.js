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
import { useDispatch, useSelector } from "react-redux";
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
import Tags from "pages/Tags";
import Search from "pages/Search";
import { fetchNotifications, fetchUnRead } from "store/notifySlice;";
import useAuthAxios from "hooks/authAxios";
import Source from "pages/Source";
import Treads from "pages/Treads";
import Support from "pages/Support";
import About from "pages/About";
import Contact from "pages/Contact";
import Privacy from "pages/Privacy";
import Terms from "pages/Terms";
import ErrorPage from "pages/ErrorPage";
import img404 from "static/images/p404.svg";
import modeSliceActions from "store/modeSlice";



function App(props) {
    const dispatch = useDispatch();
    const [loaderStatus, setLoaderStatus] = useState(true);
    const authState = useSelector((states) => states.authState.state);
    const axios_ = useAuthAxios();



    const getAuthTokenAndProfile = useCallback(async (jwtToken) => {
        try {
            const authResult = await dispatch(refreshToken(jwtToken.refresh)).unwrap();
            await dispatch(fetchProfileInfo({ accessToken: authResult.access })).unwrap();
            await dispatch(fetchNotifications(authResult.access)).unwrap();
            return setTimeout(() => { setLoaderStatus(false) }, 0);
        } catch (err) {
            return setTimeout(() => { setLoaderStatus(false) }, 0);
        }
    }, [dispatch]);

    useEffect(() => {
        //current mode
        const mode = localStorage.getItem("mode") === "dark" ? "dark" : "light";
        dispatch(modeSliceActions.setMode(mode));
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (authState) dispatch(fetchUnRead(axios_))
        }, [180 * 1000]);

        return () => clearInterval(interval);
    }, [dispatch, axios_, authState]);



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
                        <Route path="/tag/:type/:name" element={<Tags />} />
                        <Route path="/email/request" element={<EmailSent />} />
                        <Route path="/search/" element={<Search />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/change-password/:token" element={<ChangePassword />} />
                        <Route path="/create-post" element={<LoginRequired ><CreateArticle /></LoginRequired>} />
                        <Route path="/edit/:slug/:id" element={<LoginRequired ><EditPost /></LoginRequired>} />
                        <Route path="/source/:type/:name" element={<Source />} />
                        <Route path="/threads" element={<Treads />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Route>
                    <Route path="/login" element={<UnAuthenticatedOnly ><Login /></UnAuthenticatedOnly>} />
                    <Route path="/signup" element={<UnAuthenticatedOnly ><SignUp /></UnAuthenticatedOnly>} />
                    <Route path="/callback/twitter" element={<OauthTwitter />} />
                    <Route path="*" element={<ErrorPage image={img404} message={"Page not found"} statusCode={404} />} />
                </Routes>
            </Router>
        )
    } else {
        return <SpreadLoader fullHeight={true} />
    }
}


export default App;