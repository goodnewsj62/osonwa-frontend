import { SpreadLoader } from "components/others";
import ListCard from "components/others/cards/ListCard";
import EmptyContentMessage from "./Message";



export default function Posts({ posts, isLoading, isFetchingNext }) {

    const fetchedPosts = posts.map((item) => {
        const info = {
            detailUrl: `article/${item.slug_title}-${item.post_id}`,
            imgSrc: item.cover_image,
            dpSrc: item.author.profile.image,
            publisherUrl: `${item.author.username}`,
            date: item.date_updated,
            content: item.text_content,
            title: item.title,
            publisher: item.author.first_name + " " + item.author.last_name,
            tagsInfo: { tags: item.tags, tagLink: "/blog/tags/" },
            likeInfo: { count: item.likes, type: "post", likeUrl: `/liked/${item.id}/`, is_liked: item.is_liked },
            starInfo: { starUrl: `/saved/${item.id}/`, type: "post", saved: item.is_saved },
            commentInfo: {},
            shareUrl: process.env.REACT_APP_DOMAIN + `/article/${item.slug_title}-${item.post_id}`,
        }
        return <ListCard info={info} key={item.id} />
    });

    const displaySection = fetchedPosts.length !== 0 && !isLoading;
    const displayMessage = fetchedPosts.length === 0 && !isLoading;

    return (
        <>
            {displaySection && <section className={``}>{fetchedPosts}</section>}
            {(isLoading || isFetchingNext) && <div style={{ margin: "10px 0", padding: "1rem 0" }}> <SpreadLoader /></div>}
            {displayMessage && <EmptyContentMessage message={"You've not posted any articles yet."} />}
        </>
    );
};