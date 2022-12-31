import  Main from "components/others/MainWrapper";
import ProfileHeader from "components/profile/HeaderCard";
import { useSelector } from "react-redux";
import styles from "./styles/profile.module.css";



const Profile =  ()=>{
    const sideBarState =  useSelector((state)=> state.sideBarState);

    const containerClasses =  sideBarState? `${styles.conatiner} ${styles.hunderedPercent}` : `${styles.conatiner}`;
    return (
        <Main>
            <div className={containerClasses}>
                <section className={styles.main__section}>
                        <ProfileHeader />
                        <div>

                        </div>
                    <section>

                    </section>
                </section>
                <section className={styles.secondary__section}>
                </section>
            </div>
        </Main>
    )
};



export default Profile;