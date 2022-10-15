import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slide from "./Slide";
import styles from "./styles/carousel.module.css";
import "../styles/generals.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Carousel(props) {
    const size = 40;
    const sliderRef = useRef();
    
    // const posButton = (num) => {
    //     const retValue = [];
    //     for (let x = 1; x <= num; x++) {
    //         const button = <button className={`button_shape`}></button>
    //         retValue.push(button);
    //     }
    //     return retValue;
    // };

    const slides = ["one", "two","three","four"].map(setSlides());

    function setSlides(){
        let afterMidStyle =  {top:"0%",left:"0%", zIndex:"initial"};
        let beforeMidStyle =  {top:"0%",left:"0%", zIndex:"initial"};
        return function (item, index, array,...others){
            const arrLength =  array.length;
            const midPoint = Math.floor((arrLength/2));

            if(index === 0) {
                beforeMidStyle =  {top:"0%",left:((midPoint + 1) * -100) + "%", zIndex:"initial"}
            }

            if (index < midPoint){
                const newLeft=   +beforeMidStyle.left.replace("%", "") +  100;
                const zIndex = newLeft === -100? "15": "initial";
                beforeMidStyle = {...beforeMidStyle, left:(newLeft + "%"), zIndex: zIndex};
                return <Slide styles= {beforeMidStyle}  test= {item}/>
            }else if (index  === midPoint){
                return <Slide styles={{top:"0%",left:"0%", zIndex:"20"}} test={item} />
            }else{
                const newLeft=  +afterMidStyle.left.replace("%", "") +  100;
                afterMidStyle = {...afterMidStyle, left:(newLeft + "%"), zIndex:"initial"}
                return <Slide styles={afterMidStyle} test={item} />
            }
        };
    };

    const moveOneStep =  (direction)=>{
        const elements =  Array.from(sliderRef.current.children);
        const elementsPos =  elements.map((element)=> +element.style.left.replace("%",""));
        const maxPos = Math.max(...elementsPos);
        const minPos =  Math.min(...elementsPos);
        

        if(direction === "right"){
            elements.forEach(
                (element,index, array)=>{
                    const leftPos =  +element.style.left.replace("%","");
                    const newLeftPos =  (leftPos - 100);

                    if(newLeftPos  === 0 ){
                        element.style.zIndex = 20;
                    }else if(newLeftPos > minPos || newLeftPos < 100){
                        element.style.zIndex = 15;
                    }
                    else{
                        element.style.zIndex = "initial";
                    }   


                    if(newLeftPos < minPos){
                        element.style.left =maxPos  + "%";
                    }else{
                        element.style.left =  newLeftPos + "%";
                    }
                }   
                );
        }else{
            elements.forEach(
                (element,index, array)=>{
                    const leftPos =  +element.style.left.replace("%","");
                    const newLeftPos =  (leftPos + 100);

                    if(newLeftPos  === 0 ){
                        element.style.zIndex = 20;
                    }else if (newLeftPos === -100){
                        element.style.zIndex = "initial";
                    }else{
                        element.style.zIndex = 15;
                    }
                    
                    

                    if(newLeftPos > maxPos){
                        element.style.left = minPos  + "%";
                    }else{
                        element.style.left =  newLeftPos + "%";
                    }
                }   
                );
        }
    };



    return (
        <section aria-labelledby="headline" className={styles.show__case}>
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
            <div id="slider" ref={sliderRef}  className={styles.slider}>
                {slides}
            </div>
        </section>
    )
}



export default Carousel;