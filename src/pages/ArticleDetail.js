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



const ArticleDetail =  (props)=>{
    const [barVisible,setBarVisible] = useState(false);
    const iconSize  = useContext(DefaultIconSize);
    const content =  {src:"", creator: "", pubDate:"", profLink:""}

    const toggleAside = (event)=>{
        setBarVisible((state)=>!state);
    };

    const asideClasses = barVisible? `${styles.aside} ${styles.show__aside}` : `${styles.aside}` 

    return (
        <Main >
            <section aria-label="main content" className={styles.main__content}>
                <DetailHeader template={content} />
                <ImgTitle src={""} title={""} />
                <p >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ut ea vitae dicta distinctio dolore nulla sint assumenda id eius, vel, magni nisi? Error maiores tenetur qui voluptatum, reprehenderit quibusdam quos harum tempora enim! Exercitationem, tempore, sint iste excepturi nihil adipisci eum dolor, ullam hic neque tenetur sequi aliquam harum?
                </p>
                <Comments />
            </section>
            
            <div className={styles.like__comment}>
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
        </Main>
    );
};

export default ArticleDetail;