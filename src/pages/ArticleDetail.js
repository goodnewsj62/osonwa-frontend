import {Link} from "react-router-dom";
import { GoTriangleLeft } from "react-icons/go";

import ArticleAside from "components/others/ArticleAside";
import DetailHeader from "components/others/DetailHeader";
import ImgTitle from "components/others/ImgTitle";
import Main from "components/others/MainWrapper";
import CommentComp from "components/others/CommentComp";
import Likes from "components/others/Likes";
import Comments from "components/others/Comments";

import  styles from "./styles/artdetail.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";
import { useState } from "react";
import Share from "components/others/Share";
import Star from "components/others/Star";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";



const ArticleDetail =  (props)=>{
    const [barVisible,setBarVisible] = useState(false);
    const iconSize  = useContext(DefaultIconSize);
    const contentEndRef =  useRef(); 
    const watchElement =  useRef();

    const observerOptions = useMemo(()=>{return {root:contentEndRef.current, threshold:0}},[]);
    const content =  {src:"", creator: "", pubDate:"", profLink:""}

    useEffect(()=>{
        const observer =  new IntersectionObserver(hideLikeCommentBar,observerOptions);
        observer.observe(watchElement.current);
    },[observerOptions]);

    const hideLikeCommentBar = (entries, observer)=>{
        for(let entry of entries){
            console.log(entry)
            // if(entry.isIntersecting){
            //     watchElement.current.style.display =  "None";
            // }else{
            //     // watchElement.current.style.display =  "flex";
            //     console.log(observer)
            // }
        }
    }

    const toggleAside = (event)=>{
        setBarVisible((state)=>!state);
    };

    const asideClasses = barVisible? `${styles.aside} ${styles.show__aside}` : `${styles.aside}` 

    return (
        <Main >
            <div className={styles.wrapper__div}>
                <section aria-label="main content" className={styles.main__content}>
                    <DetailHeader template={content} />
                    <ImgTitle src={""} title={""} />
                    <div className={styles.write__up}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam provident unde modi repudiandae velit cum atque. Amet eaque eos at?
                    </div>
                    <div ref={contentEndRef} className={styles.article__extras}>
                        <div className={styles.interaction}>
                            <Link to= "">
                                <CommentComp />
                            </Link>
                            <div className={styles.like}>
                                <Likes />
                            </div>

                            <span className={styles.share}><Share /></span>
                            <span  className={styles.star}><Star /></span>
                            
                        </div>
                        <Comments />
                    </div>
                </section>
                
                <div  ref={watchElement} className={styles.like__comment}>
                    <Link to= "">
                        <CommentComp />
                    </Link>
                    <Likes />
                </div>
                <div onClick={toggleAside} className={styles.aside__toggle}>
                    <GoTriangleLeft size={23} />
                </div>
                <aside className={asideClasses}>
                    <span onClick={toggleAside}>
                        <AiOutlineClose size={iconSize} />
                    </span>
                    <ArticleAside />
                </aside>
            </div>
        </Main>
    );
};

export default ArticleDetail;