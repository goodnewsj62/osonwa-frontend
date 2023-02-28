import ArticleSearch from "components/others/ArticleSearch";
import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SortPanel from "components/others/SortPanel";
import ToggleContents from "components/others/ToggleContent";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { articlePostListAdapter } from "utils/adapters";
import useScrollState from "./hooks/scrollState";
import styles from "./styles/articles.module.css";
import RenderListView from "components/others/RenderList";
import { genFetchPost } from "utils/helpers";
import useAuthAxios from "hooks/authAxios";

function Articles(props) {
    const [articleType, setArticleType] = useState("aggregate");
    const [filterParams, setFilterParams] = useState(["for you"]);
    const [search, setSearch] = useState({ status: false, value: "" });
    const [searchResult, setSearchResults] = useState({ isLoading: true, others: {}, posts: [] });
    const [aggegate, setAggregate] = useState({ isLoading: true, others: {}, posts: [] });
    const [internal, setInternal] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoadingAgg, setIsLoadingAgg] = useState(false);
    const [isLoadingIn, setIsLoadingIn] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const axios_ = useAuthAxios();



    const isAggregate = useCallback(() => articleType === "aggregate", [articleType]);
    const fetchAggNextPage = useFetchPage(aggegate, setAggregate, setIsLoadingAgg, isAggregate);
    useScrollState(fetchAggNextPage);

    const isInternal = useCallback(() => articleType === "articles", [articleType]);
    const fetchInternalNextPage = useFetchPage(internal, setInternal, setIsLoadingIn, isInternal);
    useScrollState(fetchInternalNextPage);

    const fetchSearchNextPage = useFetchPage(searchResult, setSearchResults, setIsLoadingSearch);
    useScrollState(fetchSearchNextPage);


    useEffect(() => {
        const baseUrl = `/articles/?filter=${JSON.stringify(filterParams)}`;
        Promise.all([
            genFetchPost(baseUrl + "&type=aggregate", setAggregate, axios_),
            genFetchPost(baseUrl + "&type=internal", setInternal, axios_)
        ]);
    }, [filterParams, axios_]);

    useEffect(() => {
        const url = `/article/search/?q=${search.value}&type=${articleType}`;
        if (search.status) genFetchPost(url, setSearchResults, axios_)
    }, [search, filterParams, axios_, articleType]);


    const aggregateList = useMemo(() => generateCardList(aggegate.posts), [aggegate]);
    const internalList = useMemo(() => generateCardList(internal.posts), [internal]);
    const searchList = useMemo(() => generateCardList(searchResult.posts), [searchResult]);


    function generateCardList(posts) {
        return posts.map((item) => {
            const info = articlePostListAdapter(item);
            return <ListCard info={info} key={item.id} />;
        });
    }

    const styleClasses = `${styles.list__grid} ${styles.pad_sides_5}`;
    const aggegateComp = <RenderListView posts={aggregateList} isLoading={aggegate.isLoading}
        isFetchingNext={isLoadingAgg} classes={styleClasses}
        message={"Oops! no aggregate articles found"} />;
    const internalComp = <RenderListView posts={internalList} isLoading={internal.isLoading}
        isFetchingNext={isLoadingIn} classes={styleClasses}
        message={"Oops! no posts was retrieved"} />;
    const searchComp = <RenderListView posts={searchList} isLoading={searchResult.isLoading}
        isFetchingNext={isLoadingSearch} classes={styleClasses}
        message={"Oops! no posts found"} />;


    const stateNames = useMemo(() => ["aggregate", "internal"], []);

    const getComponentList = useCallback((searchComp, internalComp, aggegateComp) => {
        if (search.status) {
            const showStrategy = {
                aggregate: [searchComp, internalComp],
                internal: [aggegateComp, searchComp]
            }
            return showStrategy[articleType];
        } else {
            return [aggegateComp, internalComp];
        }
    }, [search, articleType])

    const components = getComponentList(searchComp, internalComp, aggegateComp);
    const onScreen = useCallback((name) => setArticleType(name), []);

    return (
        <Main >
            <section className={styles.article__head} aria-labelledby="head">
                <h1 id="head">
                    Articles
                </h1>
                <div className={styles.sort__panel}>
                    <ArticleSearch setSearch={setSearch} />
                    <SortPanel filterParams={filterParams} setFilterParams={setFilterParams} />
                </div>
            </section>
            <ToggleContents stateNames={stateNames} components={components} callback={onScreen} />
        </Main>
    )
}


export default Articles;