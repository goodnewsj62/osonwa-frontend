import { Link } from "react-router-dom";
import dummy from "static/images/test_img.jpg";
import TagDiv from "../TagDiv";
import ListCardAction from "../Actions";
import styles from "./styles/listcard.module.css";


const ListCard = (props) => {
    return (
        <div className={styles.card__container}>
            <section className={styles.header}>
                <Link to="#">
                    <img src={dummy} alt="publisher" />
                    <p>Lorem ipsum dolor</p>
                    <p><span>.</span>jun 13 2022</p>
                </Link>
            </section>
            <section className={styles.body}>
                {/* for p tag max 30 use js substring or split then add... if remaining text */}
                <Link to="#">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, blanditiis.</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos a laudantium fugiat rerum quibusdam, blanditiis at hic excepturi quas in, amet sed odit nam, consectetur officiis? Ullam et excepturi ducimus?</p>
                </Link>
            </section>
            <aside className={styles.featured__image}>
                <img src={dummy} alt="featured" />
            </aside>
            <section className={styles.footer}>
                <TagDiv />
                <ListCardAction />
            </section>
        </div>
    )
};

export default ListCard;