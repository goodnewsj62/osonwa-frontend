import { AiFillStar } from "react-icons/ai";

import miles from "static/images/test_img.jpg";
import style from "./styles/NormalCardHeader.module.css";


const NormalCardHeader = ({ iconSize, ...others }) => {


    return (
        <div className={style.card__img}>
            <div className={style.image__wrapper}>
                <img src={miles} alt="logo" />
            </div>
            <div className={style.bookmark}>
                <AiFillStar size={iconSize} />
            </div>
        </div>
    );
};


export default NormalCardHeader;