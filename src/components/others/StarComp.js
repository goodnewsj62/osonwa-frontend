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

    const rejectHandler = (value) => {
        /* saveLogic has made saved status change for speed reasons
                so we invert the logic here to reset to previous state
                since request failed
            */
        if (isSaved) {
            setIsSaved(false);
        } else {
            setIsSaved(true);
        }

    }

    const saveLogic = () => {
        if (!isSaved) {
            setIsSaved(true)
        } else {
            setIsSaved(false);
        }
    }
    const saveOrUnsave = (event) => {
        saveLogic();
        toggleAction(axios_, starUrl, type, rejectHandler)
    };
    return (
        <div className={styles.star}>
            <div onClick={saveOrUnsave} className={styles.icon}>
                {!isSaved && <AiOutlineStar size={iconSize} />}
                {isSaved && <AiFillStar fill="#faca2d" size={iconSize} />}
            </div>
        </div>
    );
};


export default StarComp;