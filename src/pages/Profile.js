import Main from "components/others/MainWrapper";
import ProfileBody from "components/profile/Body";
import ProfileHeader from "components/profile/HeaderCard";
import NavSwitch from "components/profile/NavSwitch";
import Suggested from "components/profile/Suggested";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/profile.module.css";



const Profile = () => {
    const switchStates = useMemo(() => ["posts", "comments"], []);
    const [switchState, setSwitchState] = useState(switchStates[0]);
    const sideBarState = useSelector((state) => state.sideBarState);

    const containerClasses = sideBarState ? `${styles.conatiner} ${styles.hunderedPercent}` : `${styles.conatiner}`;
    const handler = (content) => {
        setSwitchState(content)
    }

    return (
        <Main>
            <div className={containerClasses}>
                <section className={styles.main__section}>
                    <ProfileHeader />
                    <NavSwitch handler={handler} subjects={switchStates} />
                    <ProfileBody state={switchState} />
                </section>
                <section className={styles.secondary__section}>
                    <Suggested />
                </section>
            </div>
        </Main>
    )
};



export default Profile;