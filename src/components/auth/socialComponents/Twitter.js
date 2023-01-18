import { BsTwitter } from "react-icons/bs";
import { baseAxiosInstance } from "utils/requests";


const TwitterHandler = ({ setErrorInfo, size, setRegister }) => {
    const clickHandler = (event) => {
        baseAxiosInstance("/auth/twitter/").then((resp) => {
            const url = resp.data.data.url
            window.location.replace(url);
        }).catch((err) => {
            setErrorInfo({ state: true, message: "oops an error occurred" });
        });
    };
    return (
        <div onClick={clickHandler} className="twitter">
            <BsTwitter fill={"#1E9BF0"} size={size} />
        </div>
    );
}

export default TwitterHandler; 