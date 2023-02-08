import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "./styles/actioncomp.module.css";

const CommentComp = ({ commentInfo: { count, detailUrl } }) => {
    const IconSize = useContext(DefaultIconSize);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(detailUrl);
    };

    return (
        <div onClick={handleNavigate} className={styles.comment}>
            <div className={styles.icon}>
                <BiMessageSquareDetail size={IconSize} />
            </div>
            <div className={`${styles.count} cnt`}>
                {count}
            </div>
        </div>
    );
};

export default CommentComp;
