import { SpreadLoader } from "components/others";
import ListCard from "components/others/cards/ListCard";
import EmptyContentMessage from "./Message";



export default function Posts({ posts, isLoading }) {



    const fetchedPosts = posts.map((item) => {
        return <ListCard item={item} key={item.id} />
    });

    const displayBool = fetchedPosts.length !== 0 && !isLoading;

    return (
        <>
            {displayBool && <section className={``}>{fetchedPosts}</section>}
            {isLoading && <SpreadLoader />}
            {!displayBool && <EmptyContentMessage message={"You've not posted any articles yet."} />}
        </>
    );
};