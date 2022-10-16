import style from "./styles/slide.module.css";
import image from "static/images/test_img.jpg";
import { useEffect, useMemo, useRef } from "react";

function Slide(props) {
    const textAreaRef = useRef();
    const healineRef = useRef();

    const textAreaOptions = useMemo(() => { return { root: textAreaRef.current, threshold: 0.25, rootMargin: "0px" } }, []);

    useEffect(() => {
        const textArea = new IntersectionObserver(textFadeIn, textAreaOptions);

        function textFadeIn(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show__heading");
                } else {
                    entry.target.classList.remove("show__heading");
                }
            });
        };

        textArea.observe(healineRef.current);
    }, [textAreaOptions]);

    return (
        <div style={props.styles} className={style.slide__container}>
            <div className={style.img__wrapper}>
                <img src={image} alt="caruosel" />
            </div>
            <div className={style.text__div}>
                <div className="info__area" ref={textAreaRef}>
                    <h1 ref={healineRef} id="headline">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, doloribus cum nihil quas laudantium quia?</h1>
                    <span>
                        {props.test}
                    </span>
                </div>
            </div>
        </div>
    )
}



export default Slide;