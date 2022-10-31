import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import styles from "./styles/actioncomp.module.css";

const CommentComp = (props) => {
    const IconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.comment}>
            <div className={styles.icon}>
                <BiMessageSquareDetail size={IconSize} />
            </div>
            <div className={`${styles.count} cnt`}>
                900
            </div>
        </div>
    );
};

export default CommentComp;
