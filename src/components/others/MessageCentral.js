import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import Cover from "./Mask";

import styles from "./styles/message.module.css";




const Container = ({ message, affirmHandler, hideHandler }) => {
    return (
        <div className={styles.cover}>
            <div className={styles.body}>
                <span onClick={hideHandler}><AiOutlineClose /></span>
                <p>{message}</p>
                <button onClick={affirmHandler} type="button">
                    Ok
                </button>
            </div>
        </div>
    )
};


function CenterMessagePopup(props) {
    return (
        <>
            {ReactDOM.createPortal(<Cover {...props} />, document.getElementById("mask"))}
            {ReactDOM.createPortal(<Container {...props} />, document.getElementById("auth__div"))}
        </>
    )
}


export default CenterMessagePopup;