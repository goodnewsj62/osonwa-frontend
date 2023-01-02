import styles from "./styles/body.module.css";
import img from "static/images/Coffee_Flatline.svg";

const EmptyContentMessage = ({message})=>{
    return (
        <div className={styles.message}>
            <img src={img} alt="no post"/>
            <span>{message}</span>
        </div>
    )
};

export default EmptyContentMessage;