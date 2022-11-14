import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext, useEffect, useState } from "react";
import { IoMdShareAlt } from "react-icons/io";
import MessagePopup from "./cards/MessagePopupCard";

const Share = (props) => {
    const [showMessage, setShowMessage] = useState(false);
    const iconSize = useContext(DefaultIconSize);

    useEffect(() => {
        const timeout = setTimeout(() => { setShowMessage(false) }, 5000);
        return () => clearTimeout(timeout);
    }, [showMessage, setShowMessage]);

    const copyUrl = () => {
        const copytext = async () => {
            const currentUrl = window.location.href;
            await window.navigator.clipboard.writeText(currentUrl);
            setShowMessage(true);
        }
        copytext();
    };


    return (
        <>
            <div onClick={copyUrl} className="share">
                <IoMdShareAlt size={iconSize} />
            </div>
            {showMessage && <MessagePopup category={"success"} message={"link copied!"} />}
        </>
    )
};

export default Share;