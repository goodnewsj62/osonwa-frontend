import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star =  (props)=>{
    const iconSize =  useContext(DefaultIconSize);

    return (
        <div className="star">
            <span className="outline">
                <AiOutlineStar size={iconSize} />
            </span>
            {/* <span className="fill">
                <AiFillStar size={iconSize} />
            </span> */}
        </div>
    )
};

export default Star;