
import { useContext, useEffect, useState } from "react";
import { RiShareForwardFill } from "react-icons/ri";
import { DefaultIconSize } from "components/wrappers/IconSize";
import CommentComp from "./CommentComp";
import Likes from "./Likes";
import StarComp from "./StarComp";
import styles from "./styles/actioncomp.module.css";
import MessagePopupModal from "./MessagePopupModal";



const ListCardAction = ({ likeInfo, commentInfo, shareUrl, starInfo }) => {
    const [message, setMessage] = useState({ status: false, message: "", category: "" });
    const iconSize = useContext(DefaultIconSize);

    useEffect(() => {
        const timeout = setTimeout(() => setMessage({ status: false, message: "", category: "" }), 3000);
        return () => clearTimeout(timeout);
    }, [message])

    const shareHandler = async (event) => {
        try {
            await window.navigator.clipboard.writeText(shareUrl);
            setMessage({ status: true, message: "link copied!", category: "success" });
        } catch (err) {
            setMessage({ status: true, message: "an error occured", category: "fail" });
        }
    };

    return (
        <div className={styles.enclosement}>
            <CommentComp commentInfo={commentInfo} />
            <Likes likeInfo={likeInfo} />
            <div onClick={shareHandler}>
                <RiShareForwardFill size={iconSize} />
            </div>
            <StarComp starInfo={starInfo} />
            {message.status && <MessagePopupModal message={message.message} category={message.category} />}
        </div>
    );
};


export default ListCardAction;