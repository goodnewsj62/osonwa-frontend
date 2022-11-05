import { Link } from "react-router-dom";
import img from "static/images/test_img.jpg";
import styles from "./styles/articlehead.module.css";

const DetailHeader = (props) => {
    return (
        <div className={styles.article__header}>
            <Link to="" >
                <img src={img} alt="creator" />
            </Link>
            <div className={styles.title}>
                <Link to="">
                    <strong>
                        Lorem ipsum dolor sit.
                    </strong>
                </Link>
                <div>
                    sep 5 . 2022
                </div>
            </div>
        </div>
    );
};

export default DetailHeader;