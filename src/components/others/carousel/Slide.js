import style from "./styles/slide.module.css";
import image from "static/images/test_img.jpg";

function Slide(props) {
    return (
        <div className={style.slide__container}>
            <div className={style.img__wrapper}>
                <img src={image} alt="caruosel" />
            </div>
            <div className={style.text__div}>
                <div>
                    <h1 id="headline">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, doloribus cum nihil quas laudantium quia?</h1>
                    <span>
                        See Details
                    </span>
                </div>
            </div>
        </div>
    )
}



export default Slide;