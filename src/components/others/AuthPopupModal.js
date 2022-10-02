import ReactDOM from "react-dom";
import AuthCard from "./cards/AuthCard";
import Cover from "./Mask";





function AuthPopupModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Cover {...props} />, document.getElementById("auth__div"))}
            {ReactDOM.createPortal(<AuthCard {...props} />, document.getElementById("mask"))}
        </>
    )
}


export default AuthPopupModal;