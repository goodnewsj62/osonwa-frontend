import ListCard from "components/others/cards/ListCard";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";
import { genFetchPost, imageOrDefault } from "utils/helpers";
import useScrollState from "./hooks/scrollState";
import styles from "pages/styles/articles.module.css";
import RenderListView from "components/others/RenderList";
import Main from "components/others/MainWrapper";

import style from "./styles/source.module.css";
import { SpreadLoader } from "components/others";




const Source =  ()=>{
    const {type, name}=  useParams();
    const axios_ = useAuthAxios();
    const [results, setResult] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoading, setIsLoading] = useState(true);

    const fetchNewsNextPage = useFetchPage(results, setResult, setIsLoading);
    useScrollState(fetchNewsNextPage);

    useEffect(()=>{
        const url =  `/website/?type=${type}&name=${name}`;
        genFetchPost(url,setResult,axios_);
    }, [axios_, type, name]);


    const cards = results.posts.map((item) => {
        const info =type === "news"?  newsListAdapter(item):  articlePostListAdapter(item); 
        return <ListCard info={info} key={item.id} />;
    });

    const styleClasses = `${styles.list__grid} ${styles.pad_sides_5}`;
    const cardLists = <RenderListView posts={cards} isLoading={results.isLoading}
        isFetchingNext={isLoading} classes={styleClasses}
        message={"Oops no posts was retrieved"} />;

    const mainUrl =  (str)=>{
        return str.match(/^https:\/\/.+\.(com|blog|net|org|io|to)/)[0]
    }

    return(
        <Main>
            {
                results.posts.length > 0 &&
                <>
                    <section className={style.header} >
                        <div className={style.logo}>
                            <img src={imageOrDefault(results.posts[0].pub_image)} alt="source logo or default logo" />
                            <h2>{name}</h2>
                        </div>
                        <div className={style.lnk}>
                            <a href={mainUrl(results.posts[0].source_url)} rel="noreferrer noopener" target="_blank"  >
                                Go to website
                            </a>
                        </div>
                    </section>
                    <section>
                        {cardLists}
                    </section>
                </>
            }
            {isLoading && <span className="loader"><SpreadLoader /></span>}
        </Main>
    )
};

export default Source;