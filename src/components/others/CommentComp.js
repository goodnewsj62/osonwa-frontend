import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "./styles/actioncomp.module.css";

const CommentComp = ({ commentInfo: { count, detailUrl } }) => {
    const IconSize = useContext(DefaultIconSize);

    return (
        <div className={styles.comment}>
            <Link to={detailUrl}>
                <div className={styles.icon}>
                    <BiMessageSquareDetail size={IconSize} />
                </div>
            </Link>
            <div className={`${styles.count} cnt`}>
                {count}
            </div>
        </div>
    );
};

export default CommentComp;
