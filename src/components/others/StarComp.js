import { DefaultIconSize } from "components/wrappers/IconSize";
import useAuthAxios from "hooks/authAxios";
import { useContext, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toggleAction } from "utils/helpers";
import styles from "./styles/actioncomp.module.css";


const StarComp = ({ starInfo: { starUrl, type, saved } }) => {
    const [isSaved, setIsSaved] = useState(saved);
    const iconSize = useContext(DefaultIconSize);
    const axios_ = useAuthAxios();

    const saveOrUnsave = (event) => toggleAction(axios_, starUrl, type, setIsSaved);
    return (
        <div className={styles.star}>
            <div onClick={saveOrUnsave} className={styles.icon}>
                {!isSaved && <AiOutlineStar size={iconSize} />}
                {isSaved && <AiFillStar fill="#fcda69" size={iconSize} />}
            </div>
        </div>
    );
};


export default StarComp;