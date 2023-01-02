import { memo } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";


const ProfileBody = ({state})=>{
    return (
        <section className={`${extstyles.container} ${styles.container}`}>
            {state === "posts" && <Posts /> }
            {state === "comments" &&  <MyComments />}
        </section>
    );
};

export default memo(ProfileBody);