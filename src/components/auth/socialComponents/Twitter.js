import { BsTwitter } from "react-icons/bs";


const TwitterHandler = ({ setErrorInfo, size }) => {
    return (
        <div className="twitter">
            <BsTwitter fill={"#1E9BF0"} size={size} />
        </div>
    );
}

export default TwitterHandler; 