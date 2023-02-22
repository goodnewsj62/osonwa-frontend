import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./styles/carousel.module.css";
import "../styles/generals.css";
import { forwardDebounce } from "utils/helpers";
import { setSlides, shifLeft, shiftRight } from "./helpers";
import { useEffect, useMemo, useRef, useState } from "react";
import { baseAxiosInstance } from "utils/requests";







function Carousel(props) {
    const size = 40;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const sliderRef = useRef();
    const intersectionOptions = useMemo(() => { return { root: sliderRef.current, threshold: 0, rootMargin: "0% 5% 0% 0%" } }, []);
    const clickState = useMemo(() => { return { state: false } }, []);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await baseAxiosInstance.get("/top-news/");
                setData(resp.data.data);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false)
                return err;
            }
        }

        fetchData();
    }, []);


    //scroller
    useEffect(() => {
        let scrollFrame;
        function scrollAnime(prevTime) {
            return (time) => {

                if (clickState.state) {
                    prevTime = time;
                    clickState.state = !clickState.state
                }

                if ((time - prevTime) >= 11000) {
                    moveOneStep("right");
                    prevTime = time;
                }


                scrollFrame = requestAnimationFrame(scrollAnime(prevTime));
            }
        }
        scrollFrame = requestAnimationFrame(scrollAnime(0))
        return () => cancelAnimationFrame(scrollFrame);
    }, [clickState]);

    //observer
    useEffect(() => {
        const observer = new IntersectionObserver(textDivSlideIn, intersectionOptions);
        Array.from(sliderRef.current.children).forEach(
            (element) => {
                const watchElement = element.lastElementChild.firstElementChild.firstElementChild;
                observer.observe(watchElement);
            }
        );
    }, [intersectionOptions, isLoading]);


    const textDivSlideIn = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("pull__up");
            } else {
                entry.target.classList.remove("pull__up");
            }
        });
    }

    const moveOneStep = (direction) => {
        const elements = Array.from(sliderRef.current.children);
        const elementsPos = elements.map((element) => +element.style.left.replace("%", ""));
        const maxPos = Math.max(...elementsPos);
        const minPos = Math.min(...elementsPos);


        if (direction === "right") {
            elements.forEach(shiftRight(minPos, maxPos));
        } else {
            elements.forEach(shifLeft(minPos, maxPos));
        }
    };

    const moveOneStepRight = forwardDebounce(() => { moveOneStep("right"); clickState.state = true; }, 500);
    const moveOneStepLeft = forwardDebounce(() => { moveOneStep("left"); clickState.state = true; }, 500);


    const slides = data.map(setSlides());

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
            <div id="slider" ref={sliderRef} className={styles.slider}>
                {slides}
            </div>
        </section>
    )
}



export default Carousel;