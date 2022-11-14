import CommentCard from "./cards/CommentCard";

import styles from "./styles/comments.module.css";
import image from "static/images/test_img.jpg";




const Comments = (props) => {
    const comments = [1, 2, 3, 4].map((item) => {
        const params = {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, aperiam quia accusantium dignissimos molestiae magni reiciendis illum error debitis aliquam aspernatur modi omnis ad. Esse.",
            imageSrc: image,
            username: "someones username",
            date: "06 oct 2022"
        };
        return <CommentCard params={params} />;
    });
    return (
        <div className={styles.comment__lists}>
            {comments}
        </div>
    );
};


export default Comments;


