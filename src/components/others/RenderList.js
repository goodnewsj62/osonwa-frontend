import EmptyContentMessage from "components/profile/Message";
import { memo } from "react";
import SpreadLoader from "./loaders/SpreadLoader";
import cardStyles from "./styles/lists.module.css";




const RenderListView =  ({posts, isLoading, isFetchingNext, message,classes})=>{
    const showCards =  posts.length !== 0 && !isLoading;
    const showMessage =  posts.length === 0 && !isLoading;
    return (
        <>
            {showCards && <section aria-label="liked article" className={classes?classes: cardStyles.articles}>{posts}</section>}
            {(isLoading || isFetchingNext) && <div className={cardStyles.loader}><SpreadLoader /></div>}
            {showMessage && <EmptyContentMessage message={message} />}
        </>
    );
};

export default memo(RenderListView);