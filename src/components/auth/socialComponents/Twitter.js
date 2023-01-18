import { BsTwitter } from "react-icons/bs";
import { baseAxiosInstance } from "utils/requests";


const TwitterHandler = ({ setErrorInfo, size, setRegister, setLoader }) => {
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
    return (
        <div onClick={clickHandler} className="twitter">
            <BsTwitter fill={"#1E9BF0"} size={size} />
        </div>
    );
}

export default TwitterHandler; 