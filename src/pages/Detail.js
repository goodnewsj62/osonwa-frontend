import { GoTriangleLeft } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useContext, useMemo, useCallback } from "react";

// import ArticleAside from "components/others/ArticleAside";
import ImgTitle from "components/others/ImgTitle";
import Main from "components/others/MainWrapper";
import CommentComp from "components/others/CommentComp";
import Likes from "components/others/Likes";
import Comments from "components/others/Comments";
import Share from "components/others/Share";

import { DefaultIconSize } from "components/wrappers/IconSize";
import useObserver from "./hooks/posObserver";
import { hideLikeCommentBar } from "./helpers/articleHelpers";
import styles from "./styles/artdetail.module.css";
import { SpreadLoader } from "components/others";
import StarComp from "components/others/StarComp";
import img404 from "static/images/p404.svg";
import ErrorPage from "./ErrorPage";
import useFetchAggDetail from "./hooks/fetchAggregate";
import DetailAggHeader from "components/others/DetailAggHeader";
import { trimCharsTo } from "utils/helpers";




const ArticleDetail = (props) => {
    const [barVisible, setBarVisible] = useState(false);

    const [post, isLoading, notFound, type] = useFetchAggDetail()

    const iconSize = useContext(DefaultIconSize);
    const contentRef = useRef();
    const sectionElement = useRef();
    const watchElement = useRef();
    const contRef = useRef();

    const observerOptions = useMemo(() => { return { root: sectionElement.current, threshold: 0 } }, []);
    const observerLogic = useMemo(() => hideLikeCommentBar(watchElement), []);
    const canObserver = useCallback(() => !isLoading && !notFound, [isLoading, notFound]);

    useObserver(observerOptions, observerLogic, contentRef, canObserver);

    const toggleAside = (event) => {
        setBarVisible((state) => !state);
    };


    const asideClasses = barVisible ? `${styles.aside} ${styles.show__aside}` : `${styles.aside}`
    const commentInfo = { count: post.comments, detailUrl: `/aggregate/${type}/${post.slug_title}/${post.post_id}#comments` };


    return (
        <Main >
            {
                !isLoading && !notFound &&
                <div ref={sectionElement} className={styles.wrapper__div}>
                    <section aria-label="main content" className={styles.main__content}>
                        <DetailAggHeader type={type} post={post} />
                        <ImgTitle post={post} type={type} />
                        <div ref={contRef} id="content__writeUp" className={styles.write__up} >
                            <p dangerouslySetInnerHTML={{ __html: trimCharsTo(post.content, 1000) }} >
                            </p>
                            <div className={styles.external__lnk}>
                                <a href={post.source_url} rel="noreferrer noopener" target="_blank">
                                    Read Full Details
                                </a>
                            </div>
                        </div>
                        <div id="comment" ref={contentRef} className={styles.article__extras}>
                            <div className={styles.interaction}>
                                <CommentComp commentInfo={commentInfo} />
                                <div className={styles.like}>
                                    <Likes likeInfo={{ count: post.likes, type: type, likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                                </div>

                                <span className={styles.share}><Share /></span>
                                <span className={styles.star}><StarComp starInfo={{ starUrl: `/saved/${post.id}/`, type: type, saved: post.is_saved }} /></span>

                            </div>
                            <Comments post={post} type={type} />
                        </div>
                    </section>

                    <div ref={watchElement} className={styles.like__comment}>
                        <a href="#comment">
                            <CommentComp commentInfo={commentInfo} />
                        </a>
                        <Likes likeInfo={{ count: post.likes, type: type, likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                    </div>
                    {post.bundle &&
                        <div onClick={toggleAside} className={styles.aside__toggle}>
                            <GoTriangleLeft size={23} />
                        </div>
                    }
                    <aside className={asideClasses}>
                        <span onClick={toggleAside}>
                            <AiOutlineClose size={iconSize} />
                        </span>
                        {/* <ArticleAside post={post} /> */}
                    </aside>
                </div>
            }
            {isLoading && <span className="loader"><SpreadLoader /></span>}
            {notFound && <ErrorPage image={img404} message={"Page not found"} statusCode={404} />}
        </Main>
    );
};

export default ArticleDetail;