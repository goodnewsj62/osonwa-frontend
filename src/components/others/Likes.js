import { AiFillHeart } from "react-icons/ai";
import styles from "./styles/actioncomp.module.css";




const Likes = (props)=>{
    return(
        <div className={styles.likes}>
            <div className={styles.icon}>
                <AiFillHeart />
            </div>
            <div className={`${styles.count} cnt`}>
                200
            </div>
        </div>
    );
};

export default Likes;