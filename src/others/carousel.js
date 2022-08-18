import styles from "./styles/carousel.module.css";
import style from "./styles/slide.module.css";
import "./styles/generals.css";


function Carousel(props){
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
            <span className="arrow__right">
            </span>
            <span className="arrow__left">
            </span>
            <Slide />
        </section>
    )
}


function Slide(props){
    return(
        <div className={style.slide__container}>
            <div className={style.img__wrapper}>
                <img src="" alt="" />
            </div>
            <div className={style.text__div}>
                <h1 id="headline">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, doloribus cum nihil quas laudantium quia?</h1>
                <span>
                    See Details
                </span>
            </div>
            <div className="position__button">
                <span className={`button_shape`}>
                </span>
                <span className={`button_shape`}>
                </span>
                <span className={`button_shape`}>
                </span>
            </div> 
        </div>
    )
}



export {Carousel};