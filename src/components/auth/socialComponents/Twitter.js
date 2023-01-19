import { BsTwitter } from "react-icons/bs";
import { baseAxiosInstance } from "utils/requests";
import styles from "../styles/socials.module.css";



const TwitterHandler = ({ setErrorInfo, size, setRegister, setLoader, type }) => {
    const clickHandler = (event) => {
        setLoader(true);

        baseAxiosInstance("/auth/twitter/").then((resp) => {
            const url = resp.data.data.url
            setLoader(false);
            window.location.replace(url);
        }).catch((err) => {
            setErrorInfo({ state: true, message: "oops an error occurred" });
        });

        setLoader(false);
    };

    const styleClasses = type === "rect" ? `${styles.twitter__rect}` : "";
    const rectComp = (<div>
        <BsTwitter fill={"#fff"} size={size} />
        <span>Continue with Twitter</span>
    </div>);

    return (
        <div onClick={clickHandler} className={styleClasses}>
            {type !== "rect" && <BsTwitter fill={"#1E9BF0"} size={size} />}
            {type === "rect" && rectComp}
        </div>
    );
}

export default TwitterHandler; 