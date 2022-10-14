import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slide from "./Slide";
import styles from "./styles/carousel.module.css";
import "../styles/generals.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Carousel(props) {
    const size = 40;
    const [scrollEnd, setScrollEnd] =  useState(false);
    const sliderRef =  useRef();
    const showAreaRef =  useRef();
   
    let sliderArray =  [<Slide />,<Slide />, <Slide />];

    useEffect(()=>{
        if (scrollEnd){
            const slider =  sliderRef.current;
            const sliderVisibleWidth = slider.getBoundingClientRect().width; 
            const scrollWidth = slider.scrollWidth;
            const scrollPos = slider.scrollLeft;
            console.log(slider.scrollLeft, scrollWidth);
            if(scrollWidth ===  scrollPos){
                const firstItem = sliderArray[0]
                const allExceptFirst = sliderArray.slice(1);
                sliderArray = allExceptFirst.concat(firstItem);
                slider.scrollLeft =  scrollWidth - sliderVisibleWidth;
                console.log(slider.scrollLeft);
                scrollLeft(slider, scrollWidth);
            }
        }
    },[scrollEnd]);

    // const posButton = (num) => {
    //     const retValue = [];
    //     for (let x = 1; x <= num; x++) {
    //         const button = <button className={`button_shape`}></button>
    //         retValue.push(button);
    //     }
    //     return retValue;
    // };
    const falseMap = (num) => {
        const retValue = [];
        for (let x = 1; x <= num; x++) {
            const button = <button className={`button_shape`}></button>
            retValue.push(button);
        }
        return retValue;
    };



    const moveOneStep =  (direction)=>{
        const slider =  sliderRef.current;
        const sliderVisibleWidth = slider.getBoundingClientRect().width; 
        if(direction === "right"){
            scrollLeft(slider,sliderVisibleWidth);
        }else{
            scrollRight(slider, sliderVisibleWidth);
        }
    };


    function scrollLeft(slider,sliderVisibleWidth){
        const nextPos = slider.scrollLeft + sliderVisibleWidth;
        if(nextPos >= slider.scrollWidth){
            setScrollEnd(true);
        }else{
            slider.scrollLeft = nextPos ;
        }
    };

    function scrollRight(slider,sliderVisibleWidth){
        const nextPos =  slider.scrollLeft  - sliderVisibleWidth;
        if(nextPos <= -sliderVisibleWidth){
            setScrollEnd(true);
        }else{
            slider.scrollLeft = nextPos ;
        }
    };

    return (
        <section ref={showAreaRef}  aria-labelledby="headline" className={styles.show__case}>
            {/* <div className="interact__layer">
            </div> */}
            <div className="position__button">
                {/* {posButton(6)} */}
            </div>
            <button onClick={()=>{moveOneStep("right")}} className={`${styles.arrow__right}`}>
                <FaAngleRight size={size} />
            </button>
            <button onClick={()=>{moveOneStep("left")}} className={`${styles.arrow__left}`}>
                <FaAngleLeft size={size} />
            </button>
            <div id="slider" ref={sliderRef} className={styles.slider}>
                {sliderArray}
            </div>
        </section>
    )
}



export default Carousel;