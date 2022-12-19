import {useMemo}  from "react";
import ListCard  from  "components/others/cards/ListCard";
import  Main  from "components/others/MainWrapper";
import ToggleContents from "components/others/ToggleContent";

import styles from "./styles/articles.module.css";



const Trending =  ()=>{
    
    const newsResource =  [1,2,3].map((item)=>{
        return <ListCard />
    });

    const newsFeed =  <section aria-label="trending news" className={`${styles.articles}`}>{newsResource}</section>;
    const articleFeed =  <section aria-label="trending articles" className={`${styles.articles}`}> {[newsResource[1]]}</section>

    const onScreen =  ()=>undefined;
    const contentNames =  useMemo(()=>["news","articles"], []);
    const components =  useMemo(()=>[newsFeed, articleFeed], []);

    return (
        <Main>
            <h1 className={styles.page__header}>Trending</h1>
            <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
        </Main>
    );
};


export default Trending;