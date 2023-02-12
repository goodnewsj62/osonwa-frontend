import { SpreadLoader } from "components/others";
import ListCard from "components/others/cards/ListCard";
import { useLocation } from "react-router-dom";
import EmptyContentMessage from "./Message";



export default function Posts({ posts, isLoading }) {

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
            starInfo: { starUrl: `/saved/${item.id}`, type: "post", saved: item.is_saved },
            commentInfo: {},
            shareUrl: process.env.REACT_APP_DOMAIN + `/article/${item.slug_title}-${item.post_id}`,
        }
        return <ListCard info={info} key={item.id} />
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