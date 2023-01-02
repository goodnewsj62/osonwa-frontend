import ListCard from "components/others/cards/ListCard";
import EmptyContentMessage from "./Message";



export default function Posts() {
    const fetchedPosts = [1,2,3].map((item) => {
        return <ListCard />
    });

    const displayBool =  fetchedPosts.length !== 0;

    return (
        <>
            { displayBool &&<section className={``}>{fetchedPosts}</section>}
            {!displayBool && <EmptyContentMessage message={"You've not posted any articles yet."} />}
        </>
    );
};