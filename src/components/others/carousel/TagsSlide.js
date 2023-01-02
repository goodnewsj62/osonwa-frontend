
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useContext, useRef } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";

import styles from "./styles/tags.module.css";
import { useState } from "react";


const TagSlide = ({ tagArray, small = false }) => {
    const iconSize = useContext(DefaultIconSize);
    const [posX, setPosX] = useState(0);
    const [buttonState, setButtonState] = useState({ left: false, right: true });
    const slideRef = useRef();
    const slideCRef = useRef();

    const tagClass = small ? `${styles.tag} ${styles.small}` : `${styles.tag}`;
    const tags = tagArray.map((item) => {
        return <div key={item} className={tagClass}><Link to="/" >{item}</Link></div>
    });

    const scrollHandler = (e, direction) => {
        calculatePos(direction);
    };



    const calculatePos = (direction) => {
        let newPosX = posX;
        const movePxLength = 202;
        const totalTagsWidth = slideRef.current.scrollWidth;
        const visibleWidth = slideCRef.current.offsetWidth;
        const maxPos = -movePxLength * Math.round((totalTagsWidth - visibleWidth) / 182);

        newPosX = direction === "right" ? newPosX - movePxLength : newPosX + movePxLength;
        newPosX = Math.max(newPosX, maxPos);

        buttonToShow(newPosX, maxPos);
        setPosX(newPosX);
    }

    const buttonToShow = (pos, maxPos) => {
        if (pos === 0) setButtonState({ left: false, right: true });
        else if (pos < 0 && pos > maxPos) setButtonState({ left: true, right: true });
        else if (pos < 0 && (maxPos > pos || maxPos === pos)) setButtonState({ left: true, right: false });
    }


    return (
        <div className={styles.container}>
            <div className={`${styles.left}`}>
                {
                    buttonState.left &&
                    <button onClick={(e) => scrollHandler(e, "left")} type="button">
                        <FaAngleLeft size={iconSize} />
                    </button>
                }
            </div>
            <div ref={slideCRef} className={styles.slides}>
                <div ref={slideRef} style={{ transform: `translateX(${posX}px)` }} >
                    {tags}
                </div>
            </div>
            <div className={`${styles.right}`} >
                {
                    buttonState.right &&
                    <button onClick={(e) => scrollHandler(e, "right")} type="button">
                        <FaAngleRight size={iconSize} />
                    </button>
                }
            </div>
        </div>
    )
};

export default TagSlide;