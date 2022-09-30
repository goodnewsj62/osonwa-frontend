import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slide from "./Slide";
import styles from "./styles/carousel.module.css";
import "../styles/generals.css";

function Carousel(props) {
    const size = 40
    return (
        <section aria-labelledby="headline" className={styles.show__case}>
            {/* <div className="interact__layer">
            </div> */}
            <div className="position__button">
                <span className={`button_shape`}>
                </span>
                <span className={`button_shape`}>
                </span>
                <span className={`button_shape`}>
                </span>
            </div>
            <span className={`${styles.arrow__right}`}>
                <FaAngleRight size={size} />
            </span>
            <span className={`${styles.arrow__left}`}>
                <FaAngleLeft size={size} />
            </span>
            <div className={styles.slider}>
                <Slide />
                <Slide />
                <Slide />
            </div>
        </section>
    )
}



export default Carousel;