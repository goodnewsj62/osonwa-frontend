import ReactDOM from "react-dom";
import AuthCard from "./cards/AuthCard";
import Cover from "./Mask";





function AuthPopupModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Cover {...props} />, document.getElementById("mask"))}
            {ReactDOM.createPortal(<AuthCard {...props} />, document.getElementById("auth__div"))}
        </>
    )
}


export default AuthPopupModal;