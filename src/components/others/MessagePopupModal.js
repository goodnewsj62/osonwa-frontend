import ReactDOM from "react-dom";
import MessagePopup from "./cards/MessagePopupCard";


function MessagePopupModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<MessagePopup {...props} />, document.getElementById("message"))}
        </>
    )
};


export default MessagePopupModal;