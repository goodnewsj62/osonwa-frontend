import Cover from "components/others";
import ReactDOM from "react-dom";
import ProfileForm from "./ProfileForm";

const ProfileEditPopup =  ({setShowState})=>{
    const closeHandler = (event)=>setShowState(false);
    
    return (
        <>
            {ReactDOM.createPortal(<ProfileForm closeHandler={closeHandler} />,document.getElementById("auth__div"))}
            {ReactDOM.createPortal(<Cover hideHandler={closeHandler} />,document.getElementById("auth__div"))}
        </>
    );
};


export default ProfileEditPopup;