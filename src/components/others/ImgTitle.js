import { imageOrDefault, imgErrorHandler } from "utils/helpers";
import styles from "./styles/imgTitle.module.css";


const ImgTitle = ({ post, type }) => {
    const img = ["article", "news"].indexOf(type) !== -1 ? post.image : post.cover_image;

    return (
        <div className={styles.img__div}>
            <img src={imageOrDefault(img)} onError={imgErrorHandler} alt="featured img" />
            <div className={styles.title__div}>
                <h1>{post.title}</h1>
                {
                    post.bundle &&
                    <p className={styles.mobile__warning}>
                        click the arrow at the right to see the list of content
                    </p>
                }
            </div>
        </div>
    );
};


export default ImgTitle;
