import { FaFacebookF } from "react-icons/fa";

const FacebookHandler = ({ setErrorInfo, size }) => {
    return (
        <div className="facebook">
            <FaFacebookF fill={"#008AF3"} size={size} />
        </div>
    );
};

export default FacebookHandler;