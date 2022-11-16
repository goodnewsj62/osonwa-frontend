import {Link} from "react-router-dom";
import CommentComp  from "../CommentComp";
import  Likes  from "../Likes";

import styles from "./styles/comment.module.css";


const CommentCard =  ({params})=>{
    const {text,
            link,
            likeCount,
            commentCount, 
            profileUrl,
            imageSrc,
            username, date} =  params;

    return (
        <div className={styles.container}>
            <div >
                <div className={styles.img__block}>
                    <Link to={profileUrl}>
                        <img src={imageSrc} alt="profile" />
                    </Link>
                </div>
                <div className={styles.main__block}>
                    <div className={styles.header}>
                        <Link to={profileUrl}>
                            <strong>{username}</strong>
                        </Link>
                        <span>{date}</span>
                    </div>
                    <p>
                        <Link to={link}>
                            {text}
                        </Link>
                    </p>
                    <div className={styles.reactions}>
                        <Likes />
                        <span>
                            <CommentComp />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CommentCard;