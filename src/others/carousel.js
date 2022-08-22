import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import styles from "./styles/carousel.module.css";
import style from "./styles/slide.module.css";
import "./styles/generals.css";

import image from "static/images/test_img.jpg";

function Carousel(props){
    const size =  40
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
            <Slide />
        </section>
    )
}


function Slide(props){
    return(
        <div className={style.slide__container}>
            <div className={style.img__wrapper}>
                <img src={image} alt="caruosel image" />
            </div>
            <div className={style.text__div}>
                <div>
                    <h1 id="headline">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, doloribus cum nihil quas laudantium quia?</h1>
                    <span>
                        See Details
                    </span>
                </div>
            </div>
            <div className="position__button">
                <span className={`button_shape`}>
                </span>
                <span style={{backgroundColor:"#fff"}} className={`button_shape`}>
                </span>
                <span  className={`button_shape`}>
                </span>
            </div> 
        </div>
    )
}



export {Carousel};