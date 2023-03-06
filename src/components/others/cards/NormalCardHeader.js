
import { Link } from "react-router-dom";
import { imageOrDefault, imgErrorHandler } from "utils/helpers";
import StarComp from "../StarComp";
import style from "./styles/NormalCardHeader.module.css";


const NormalCardHeader = ({ iconSize, post }) => {

    return (
        <div className={style.card__img}>
            <div className={style.image__wrapper}>
                <Link to={`/aggregate/news/${post.slug_title}/${post.id}/`}><img src={imageOrDefault(post.image)} onError={imgErrorHandler} alt="logo" /></Link>
            </div>
            <div className={style.bookmark}>
                <StarComp starInfo={{ starUrl: `/saved/${post.id}/`, type: "news", saved: post.is_saved }} />
            </div>
        </div>
    );
};


export default NormalCardHeader;