import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { imageOrDefault, imgErrorHandler, trimCharsTo } from "utils/helpers";
import StarComp from "../StarComp";
import MessagePopup from "./MessagePopupCard";
import style from "./styles/NormalCardDetails.module.css";


const NormalCardDetails = ({ iconSize, post }) => {
    const [modalState, setModalState] = useState(false);
    const [message, setMessage] = useState({ status: false, message: "" });


    useEffect(() => {
        const timeout = setTimeout(() => setMessage({ message: "", status: false }), 4000);
        return () => clearTimeout(timeout);
    }, [message.status]);

    const detailUrl = `/aggregate/news/${post.slug_title}/${post.id}/`;
    const toggleModal = (event) => setModalState((state) => !state);
    const copyUrl = (event) => {
        window.navigator.clipboard.writeText(process.env.REACT_APP_DOMAIN + detailUrl);
        setMessage({ message: "link copied", status: true });
        setTimeout(() => setModalState(false), 0)
    };

    return (
        <>
            <div className={style.feed__details}>
                <div className={style.site__from}>
                    <div className={style.pub__image}>
                        <Link to={`/source/news/${post.publisher}`} >
                            <img src={imageOrDefault(post.pub_image)} onError={imgErrorHandler} alt="site logo" />
                        </Link>
                    </div>
                    <h5>
                        <Link to={`/source/news/${post.publisher}`}>
                            {post.publisher}
                        </Link>
                    </h5>
                    <div className={style.small__mobstar}>
                        <StarComp starInfo={{ starUrl: `/saved/${post.id}/`, type: "news", saved: post.is_saved }} />
                    </div>
                    <BiDotsVerticalRounded
                        onClick={toggleModal}
                        className={style.card__menu} id="card__menu" size={23} />
                    {
                        modalState &&
                        <ul>
                            <li onClick={copyUrl}>
                                <RiShareForwardFill size={iconSize} />
                                <span>Share</span>
                            </li>
                        </ul>
                    }
                </div>
                <div className={style.heading}>
                    <h4 aria-label="title">
                        <Link to={detailUrl} >
                            {trimCharsTo(post.title, 85)}
                        </Link>
                    </h4>
                    <p>
                        <Link to={detailUrl}>
                            see more
                        </Link>
                    </p>
                </div>
            </div>
            {message.status && <MessagePopup message={message.message} category={"success"} />}
        </>

    );
};



export default NormalCardDetails;