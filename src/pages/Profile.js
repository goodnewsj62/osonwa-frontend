import  Main from "components/others/MainWrapper";
import ProfileHeader from "components/profile/HeaderCard";
import styles from "./styles/profile.module.css";



const Profile =  ()=>{
    return (
        <Main>
            <div className={styles.conatiner}>
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