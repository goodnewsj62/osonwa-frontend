import { BiMessageSquareDetail } from "react-icons/bi";
import styles from "./styles/actioncomp.module.css";

const CommentComp = (props) => {
    return (
        <div className={styles.comment}>
            <div className={styles.icon}>
                <BiMessageSquareDetail />
            </div>
            <div className={`${styles.count} cnt`}>
                900
            </div>
        </div>
    );
};

export default CommentComp;
