import { SpreadLoader } from "components/others";
import Main from "components/others/MainWrapper";
import ProfileBody from "components/profile/Body";
import ProfileHeader from "components/profile/HeaderCard";
import NavSwitch from "components/profile/NavSwitch";
import Suggested from "components/profile/Suggested";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";
import styles from "./styles/profile.module.css";



const Profile = () => {
    //TODO: REFACTOR 
    const switchStates = useMemo(() => ["posts", "comments"], []);
    const [switchState, setSwitchState] = useState(switchStates[0]);
    const sideBarState = useSelector((state) => state.sideBarState);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState({ state: false, message: "" });
    const location = useLocation();
    const profileStore = useSelector((states) => states.profileState);
    const [profileState, setProfileSate] = useState({ interests: [], userInfo: {} });
    const profileInfo = profileState.userInfo;
    const navigate = useNavigate();

    const usernameOnUrl = location.pathname.replace("/", "");

    const containerClasses = sideBarState ? `${styles.conatiner} ${styles.hunderedPercent}` : `${styles.conatiner}`;
    const handler = (content) => setSwitchState(content);

    const isMyAccount = useMemo(() => usernameOnUrl === profileStore.userInfo.username, [profileStore, usernameOnUrl]);


    useEffect(() => {
        if (isMyAccount) {
            setProfileSate(profileStore);
            setIsLoading(false);
        } else {
            baseAxiosInstance.get(`/auth/profile/${usernameOnUrl}/`)
                .then((resp) => {
                    const data = resp.data.data;
                    setProfileSate({ userInfo: data, interests: data.interests, state: true });
                    setIsLoading(false);
                }).catch((err) => {
                    const errorResp = err.response;
                    if (profileStore.status) {
                        navigate(`/${profileStore.userInfo.username}`);
                    } else {
                        if (errorResp.status >= 500) {
                            setErrorMessage({ state: true, message: "Oops an error occured at our end" });
                        } else if (errorResp.status === 404) {
                            setErrorMessage({ state: true, message: "This account does not exists" });
                        }
                        else if (err.request) {
                            setErrorMessage({ state: true, message: "Request failed. Please check your internet connection." });
                        }
                    }
                    setIsLoading(false);
                });
        }
    }, [profileStore, usernameOnUrl, isMyAccount, navigate]);


    const mainSectionComponents = (
        <>
            <ProfileHeader profileInfo={profileInfo} interests={profileState.interests} isMyAccount={isMyAccount} />
            <NavSwitch handler={handler} subjects={switchStates} />
            <ProfileBody state={switchState} username={usernameOnUrl} />
            {isLoading && <SpreadLoader />}
        </>
    );

    return (
        <Main>
            <div className={containerClasses}>
                <section className={styles.main__section}>
                    {!errorMessage.state && mainSectionComponents}
                    {errorMessage.state && <h1 className={styles.error}>{errorMessage.message}</h1>}
                </section>
                <section className={styles.secondary__section}>
                    <Suggested />
                </section>
            </div>
        </Main>
    )
};



export default Profile;