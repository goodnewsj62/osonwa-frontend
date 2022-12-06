import { Link } from "react-router-dom";
import { useRef,useMemo } from "react";

import DetailHeader from "components/others/DetailHeader";
import ImgTitle from "components/others/ImgTitle";
import Main from "components/others/MainWrapper";
import CommentComp from "components/others/CommentComp";
import Likes from "components/others/Likes";
import Comments from "components/others/Comments";
import Share from "components/others/Share";
import Star from "components/others/Star";

import { hideLikeCommentBar } from "./helpers/articleHelpers";
import useObserver from "./hooks/posObserver";
import styles from "./styles/artdetail.module.css";


const FeedDetail = (props) => {
    const contentRef = useRef();
    const sectionElement = useRef();
    const watchElement = useRef();

    const observerOptions = useMemo(() => { return { root: sectionElement.current, threshold: 0 } }, []);
    const observerLogic = useMemo(() => hideLikeCommentBar(watchElement), []);
    const content = { src: "", creator: "", pubDate: "", profLink: "" }

    useObserver(observerOptions, observerLogic, contentRef)

    return (
        <Main >
            <div ref={sectionElement} className={`${styles.wrapper__div} ${styles.center}`}>
                <section aria-label="main content" className={styles.main__content}>
                    <DetailHeader template={content} />
                    <ImgTitle src={""} title={""} />
                    <div className={styles.write__up}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum fugiat autem, cumque dolorum fugit alias eos inventore dolorem nulla debitis? Necessitatibus eum, numquam culpa aut beatae dolor tempore laboriosam placeat perspiciatis ipsum sunt et quasi ratione minima illo tenetur non pariatur! Amet dolore placeat neque, velit quod qui, ex aliquam earum rerum nulla aliquid veritatis, sapiente quas. Itaque delectus enim natus repellendus. Dicta provident dignissimos, aliquid exercitationem amet optio odit, ratione adipisci nisi eaque aspernatur velit praesentium, consectetur culpa mollitia delectus possimus. Quam fugit, unde placeat id quia ratione dolores optio omnis nostrum velit voluptatum sit consequuntur? Maxime ducimus perspiciatis, mollitia rem tempore quod voluptas autem tempora hic commodi ipsam veniam, aut rerum laborum distinctio ipsa sint cumque totam quae asperiores fugit! Quae, corrupti quisquam. Quia porro voluptatibus quisquam exercitationem obcaecati vitae, reprehenderit earum, repellendus neque deleniti, eius assumenda autem necessitatibus. Soluta deleniti vitae quam exercitationem error vel doloremque corrupti numquam laboriosam inventore maxime sed, neque, sunt maiores magnam ex dolore magni quod porro amet ducimus. Labore dolor sequi consectetur voluptates laborum sapiente velit quo error illum iste, dolorum possimus tempora eos aliquam doloremque voluptatibus alias! Nulla asperiores, provident labore delectus architecto illum nam ab, nihil repudiandae dignissimos at inventore aliquid nobis in laudantium repellendus nemo odit tempore ut accusamus, cumque quasi. Voluptatem, animi debitis magni modi exercitationem voluptatibus totam quis ipsum aperiam praesentium quasi fugit maxime officia alias provident? Sunt eaque id laborum repellat corporis provident aperiam ea, dolorem pariatur, at voluptatem inventore est aut sequi nemo fugit excepturi hic. Harum culpa dignissimos esse deleniti quos? Unde, doloribus in tenetur vel cupiditate modi eum facere nesciunt ducimus nostrum dolorum consequuntur alias accusamus placeat recusandae earum laborum deleniti harum nemo beatae odio! Fugit quisquam tempore laboriosam voluptates aspernatur amet non officia eaque necessitatibus ratione veniam sit atque magnam obcaecati facilis delectus fuga dolorem labore numquam, iure id quibusdam! Maiores officia explicabo dolore expedita nam deserunt dolorum reprehenderit quidem, voluptas quaerat sit adipisci odit nostrum veritatis, nulla nihil. Magnam maiores numquam veniam quisquam dicta alias hic iusto nemo nulla repudiandae et dolore accusamus, optio fugit. Vitae quos esse deleniti ut, quibusdam expedita eaque. Mollitia nobis quisquam quas nisi deserunt consectetur quos, harum veniam dolore, officia deleniti. Ratione ab quo voluptatem ad quia, ipsam repellendus nulla est possimus, reprehenderit maiores expedita culpa eius? A, eaque molestiae! Asperiores est voluptatibus facere nostrum quisquam tempore excepturi quasi ullam vero impedit libero, error ut dolore nam quos dolor quo quaerat fugit quia mollitia ab voluptas delectus. Porro ipsam facilis sint eveniet nam vel rerum adipisci laboriosam voluptates, aut eum quis. Reiciendis, quod, vel blanditiis provident asperiores laborum, a illo cumque quo quaerat eius labore enim omnis earum. Quisquam dolor enim fugiat illum dolorem tempora ea a, esse ab eligendi beatae. Dolores impedit, explicabo nesciunt eos ipsum beatae aliquam ullam harum qui eveniet corporis ducimus sed ut quo vel suscipit! Perspiciatis, assumenda debitis ipsam maiores omnis nesciunt inventore eligendi molestias esse itaque minus quaerat, adipisci quia, doloremque molestiae. Amet repellat, adipisci consequatur delectus sunt autem vitae?
                    </div>
                    
                    <div className={styles.read__more}>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            read more
                        </a>
                    </div>

                    <div id="comment" ref={contentRef} className={styles.article__extras}>
                        <div className={styles.interaction}>
                            <Link to="">
                                <CommentComp />
                            </Link>
                            <div className={styles.like}>
                                <Likes />
                            </div>

                            <span className={styles.share}><Share /></span>
                            <span className={styles.star}><Star /></span>
                        </div>
                        <Comments />
                    </div>
                </section>

                <div ref={watchElement} className={`${styles.like__comment} ${styles.hoz__center}`}>
                    <a href="#comment">
                        <CommentComp />
                    </a>
                    <Likes />
                </div>
            </div>
        </Main>
    );
};

export default FeedDetail;