import { DefaultIconSize } from "components/wrappers/IconSize";
import useAuthAxios from "hooks/authAxios";
import useCurrentUrlPath from "hooks/currentUrlPath";
import { useContext, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toggleAction } from "utils/helpers";
import AuthPopupModal from "./AuthPopupModal";
import styles from "./styles/actioncomp.module.css";


const StarComp = ({ starInfo: { starUrl, type, saved }, message, postID }) => {
    const [isSaved, setIsSaved] = useState(saved);
    const [popUp, setPopUp] = useState(false);
    const authState = useSelector((states) => states.authState.state);
    const iconSize = useContext(DefaultIconSize);
    const axios_ = useAuthAxios();

    const currentPath = useCurrentUrlPath();


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
        if (!authState) {
            setPopUp(true);
            return;
        }

        saveLogic();
        toggleAction(axios_, starUrl, type, rejectHandler)
            .then((resp) => {
                if (resp.status === 200 && message) {
                    message(resp.data.message.startsWith("save") ? "save" : "unsave", postID);
                }
            });
    };
    return (
        <>
            <div className={styles.star}>
                <div onClick={saveOrUnsave} className={styles.icon}>
                    {!isSaved && <AiOutlineStar size={iconSize} />}
                    {isSaved && <AiFillStar fill="#faca2d" size={iconSize} />}
                </div>
            </div>
            {popUp && <AuthPopupModal hideHandler={() => setPopUp(false)} next={currentPath} />}
        </>
    );
};


export default StarComp;