
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";


const TagSlide = (props) => {
    const iconSize = useContext(DefaultIconSize);
    const tags = ["python", "3d printing", "UI/UX", "Gaming"].map((item) => {
        return <div className="tag"><Link to="/" >{item}</Link></div>
    });


    return (
        <div className="tags">
            <button className="left" type="button">
                <FaAngleLeft size={iconSize} />
            </button>
            <div className="slide">
                {tags}
            </div>
            <button className="right" type="button">
                <FaAngleRight size={iconSize} />
            </button>
        </div>
    )
};

export default TagSlide;