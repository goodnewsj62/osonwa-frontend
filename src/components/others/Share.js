import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { IoMdShareAlt } from "react-icons/io";

const Share = (props) => {
    const iconSize = useContext(DefaultIconSize);
    return (
        <div className="share">
            <IoMdShareAlt size={iconSize} />
        </div>
    )
};

export default Share;