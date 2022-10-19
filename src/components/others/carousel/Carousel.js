import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./styles/carousel.module.css";
import "../styles/generals.css";
import { forwardDebounce } from "utils/helpers";
import { setSlides, shifLeft, shiftRight } from "./helpers";
import { useEffect, useMemo, useRef } from "react";







function Carousel(props) {
    const size = 40;
    const sliderRef = useRef();
    const slides = ["one", "two","three"].map(setSlides());
    const intersectionOptions = useMemo(() => { return { root: sliderRef.current, threshold: 0, rootMargin: "0% 5% 0% 0%"} }, []);
    const clickState= useMemo(()=>{return {state:false}},[]);

    useEffect(()=>{
        let scrollFrame;
        console.log("me")
        function scrollAnime(prevTime){
            return (time)=>{    
                
                if(clickState.state){
                    prevTime = time;
                    clickState.state = !clickState.state
                }

                if((time - prevTime) >= 11000){
                    moveOneStep("right");
                    prevTime = time;
                }


                scrollFrame =  requestAnimationFrame(scrollAnime(prevTime));
            }
        }
        scrollFrame =  requestAnimationFrame(scrollAnime(0))
        return ()=> cancelAnimationFrame(scrollFrame);
    },[clickState]);

    useEffect(()=>{
        const observer =  new IntersectionObserver(textDivSlideIn,  intersectionOptions);
        Array.from(sliderRef.current.children).forEach(
            (element)=>{
                const watchElement = element.lastElementChild.firstElementChild.firstElementChild;
                observer.observe(watchElement);
            }
        );
    }, [intersectionOptions]);


    const  textDivSlideIn =(entries, observer)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add("pull__up");
            }else{
                entry.target.classList.remove("pull__up");
            }
        });
    }

    const moveOneStep =  (direction)=>{
        const elements =  Array.from(sliderRef.current.children);
        const elementsPos =  elements.map((element)=> +element.style.left.replace("%",""));
        const maxPos = Math.max(...elementsPos);
        const minPos =  Math.min(...elementsPos);
        

        if(direction === "right"){
            elements.forEach(shiftRight(minPos,maxPos));
        }else{
            elements.forEach(shifLeft(minPos,maxPos));
        }
    };

    const moveOneStepRight =  forwardDebounce(()=> { moveOneStep("right"); clickState.state= true;}  ,500)
    const moveOneStepLeft =  forwardDebounce(()=> { moveOneStep("left");  clickState.state= true; },500)

    return (
        <section aria-labelledby="headline" className={styles.show__case}>
            {/* <div className="interact__layer">
            </div> */}
            
            <button onClick={moveOneStepRight} className={`${styles.arrow__right}`}>
                <FaAngleRight size={size} />
            </button>
            <button onClick={moveOneStepLeft} className={`${styles.arrow__left}`}>
                <FaAngleLeft size={size} />
            </button>
            <div id="slider" ref={sliderRef}  className={styles.slider}>
                {slides}
            </div>
        </section>
    )
}



export default Carousel;