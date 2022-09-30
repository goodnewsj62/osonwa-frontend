import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";

import myimage from "static/images/test_image.png";
import style from "./styles/NormalCardDetails.module.css";


const NormalCardDetails = ({ iconSize, ...others }) => {
    return (
        <div className={style.feed__details}>
            <div className={style.site__from}>
                <div>
                    <img src={myimage} alt="site logo" />
                </div>
                <h5>One direction news</h5>
                <BiDotsVerticalRounded className={style.card__menu} id="card__menu" size={23} />
                <ul>
                    <li>
                        <RiShareForwardFill size={iconSize} />
                        <span>Share</span>
                    </li>
                </ul>
            </div>
            <div className={style.heading}>
                <h4 aria-label="title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate id quaerat fuga cum voluptates animi.
                </h4>
                <p>Read more</p>
            </div>
        </div>
    );
};



export default NormalCardDetails;