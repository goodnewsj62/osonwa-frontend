import style from "./styles/slide.module.css";
import { useEffect, useMemo, useRef } from "react";
import { imageOrDefault, imgErrorHandler } from "utils/helpers";
import { Link } from "react-router-dom";

function Slide({ styles, item }) {
    const textAreaRef = useRef();
    const healineRef = useRef();

    const textAreaOptions = useMemo(() => { return { root: textAreaRef.current, threshold: 0.7, rootMargin: "0px" } }, []);

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
        <div style={styles} className={style.slide__container}>
            <div className={style.img__wrapper}>
                <img src={imageOrDefault(item.image)} onError={imgErrorHandler} alt="caruosel" />
            </div>
            <div className={style.text__div}>
                <div className={`${style.info__area}`} ref={textAreaRef}>
                    <div className={`info__area__wrapper`}>
                        <h1 ref={healineRef} id="headline">{item.title}</h1>
                        <span>
                            <Link to={`/aggregate/news/${item.slug_title}/${item.id}`}>
                                detail
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Slide;