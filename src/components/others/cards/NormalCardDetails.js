import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import myimage from "static/images/test_image.png";
import { imageOrDefault, trimCharsTo } from "utils/helpers";
import StarComp from "../StarComp";
import style from "./styles/NormalCardDetails.module.css";


const NormalCardDetails = ({ iconSize, post }) => {
    const errorHandler = (event) => {
        return event.target.src = myimage;
    }

    return (
        <div className={style.feed__details}>
            <div className={style.site__from}>
                <div className={style.pub__image}>
                    <img src={imageOrDefault(post.pub_image)} onError={errorHandler} alt="site logo" />
                </div>
                <h5>{post.publisher}</h5>
                <div className={style.small__mobstar}>
                    <StarComp starInfo={{ starUrl: `/saved/${post.id}/`, type: "news", saved: post.is_saved }} />
                </div>
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
                    {trimCharsTo(post.title, 120)}
                </h4>
                <p>
                    <Link to={`aggregate/${post.slug_title}/${post.id}/`}>
                        see more
                    </Link>
                </p>
            </div>
        </div>
    );
};



export default NormalCardDetails;