import { AiFillStar } from "react-icons/ai";
import styles from "./styles/actioncomp.module.css";


const StarComp = (props)=>{
    return(
        <div className={styles.star}>
            <div className={styles.icon}>
                <AiFillStar />
            </div>
        </div>
    );
};


export default StarComp;