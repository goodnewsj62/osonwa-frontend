import { Link, useParams } from "react-router-dom";
import { GoTriangleLeft } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useContext, useMemo, useEffect, useCallback } from "react";

import ArticleAside from "components/others/ArticleAside";
import DetailHeader from "components/others/DetailHeader";
import ImgTitle from "components/others/ImgTitle";
import Main from "components/others/MainWrapper";
import CommentComp from "components/others/CommentComp";
import Likes from "components/others/Likes";
import Comments from "components/others/Comments";
import Share from "components/others/Share";
import Star from "components/others/Star";

import { DefaultIconSize } from "components/wrappers/IconSize";
import useObserver from "./hooks/posObserver";
import { hideLikeCommentBar } from "./helpers/articleHelpers";
import styles from "./styles/artdetail.module.css";
import { baseAxiosInstance } from "utils/requests";
import { SpreadLoader } from "components/others";
import { useSelector } from "react-redux";
import useAuthAxios from "hooks/authAxios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";



const ArticleDetail = (props) => {
    const [barVisible, setBarVisible] = useState(false);
    const [post, setPost] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [notFound, setNotFound] = useState(false);


    const { id, slug } = useParams();
    const authState = useSelector((states) => states.authState);
    const axios_ = useAuthAxios();

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

    useEffect(() => {
        const fetchPost = async (axiosInstance) => {
            try {
                const resp = await axiosInstance.get(`/blog/post/${slug}/${id}`);
                setPost(resp.data.data);
                setIsloading(false);
                return resp
            } catch (err) {
                if (err.response.status === 404) {
                    setIsloading(false);
                    setNotFound(true);
                }
                return err;
            }
        }

        if (authState.state) {
            fetchPost(axios_);
        } else {
            fetchPost(baseAxiosInstance)
        }

    }, [id, setIsloading, slug, setPost, setNotFound, authState, axios_]);

    useEffect(() => {
        if (post.id) {
            //code highlight
            document.querySelectorAll('#content__writeUp pre').forEach((el) => {
                window.hljs.highlightElement(el);
            });
        }
    }, [post]);


    const asideClasses = barVisible ? `${styles.aside} ${styles.show__aside}` : `${styles.aside}`
    const quillInstance = new QuillDeltaToHtmlConverter(post.content ? post.content.ops : [])


    return (
        <Main >
            {
                !isLoading && !notFound &&
                <div ref={sectionElement} className={styles.wrapper__div}>
                    <section aria-label="main content" className={styles.main__content}>
                        <DetailHeader post={post} />
                        <ImgTitle post={post} />
                        <div ref={contRef} id="content__writeUp" className={styles.write__up} dangerouslySetInnerHTML={{ __html: quillInstance.convert() }} >
                        </div>
                        <div id="comment" ref={contentRef} className={styles.article__extras}>
                            <div className={styles.interaction}>
                                <Link to="">
                                    <CommentComp commentInfo={{}} />
                                </Link>
                                <div className={styles.like}>
                                    <Likes likeInfo={{ count: post.likes, type: "post", likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                                </div>

                                <span className={styles.share}><Share /></span>
                                <span className={styles.star}><Star /></span>

                            </div>
                            <Comments />
                        </div>
                    </section>

                    <div ref={watchElement} className={styles.like__comment}>
                        <a href="#comment">
                            <CommentComp commentInfo={{}} />
                        </a>
                        <Likes likeInfo={{ count: post.likes, type: "post", likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                    </div>
                    <div onClick={toggleAside} className={styles.aside__toggle}>
                        <GoTriangleLeft size={23} />
                    </div>
                    <aside className={asideClasses}>
                        <span onClick={toggleAside}>
                            <AiOutlineClose size={iconSize} />
                        </span>
                        <ArticleAside post={post} />
                    </aside>
                </div>
            }
            {isLoading && <span className="loader"><SpreadLoader /></span>}
            {/* {notFound && <Page404 />} */}
        </Main>
    );
};

export default ArticleDetail;