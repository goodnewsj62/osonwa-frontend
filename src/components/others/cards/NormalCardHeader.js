
import miles from "static/images/test_img.jpg";
import { imageOrDefault } from "utils/helpers";
import StarComp from "../StarComp";
import style from "./styles/NormalCardHeader.module.css";


const NormalCardHeader = ({ iconSize, post }) => {

    const errorHandler = (event) => {
        return event.target.src = miles;
    }

    return (
        <div className={style.card__img}>
            <div className={style.image__wrapper}>
                <img src={imageOrDefault(post.image)} onError={errorHandler} alt="logo" />
            </div>
            <div className={style.bookmark}>
                <StarComp starInfo={{ starUrl: `/saved/${post.id}/`, type: "news", saved: post.is_saved }} />
            </div>
        </div>
    );
};


export default NormalCardHeader;