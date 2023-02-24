import ListCard from "components/others/cards/ListCard";
import RenderListView from "components/others/RenderList";
import useAuthAxios from "hooks/authAxios";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { deletePost } from "./helpers/fetchHelper";



export default function Posts({ posts, setPosts, isLoading, isFetchingNext }) {
    const axios_ = useAuthAxios();
    const profileInfo = useSelector((states) => states.profileState);

    const messageCallback = useCallback((action, id_) => {
        const actions = {
            delete: deletePost
        }

        const post = posts.filter((post) => post.id === id_)[0]
        const url = `/blog/post/${post.slug_title}/${post.post_id}/`;
        const handler = actions[action]

        const _ = handler ? handler(id_, url, axios_, removeDeleted) : undefined;
        function removeDeleted(id_) {
            setPosts((state) => (
                {
                    ...state,
                    posts: state.posts.filter((item) => item.id !== id_)
                }
            ));
        };
    }, [axios_, setPosts, posts]);





    const fetchedPosts = posts.map((item) => {
        const showOptions = profileInfo.status && profileInfo.userInfo.id === item.author.id
        const info = {
            postID: item.id,
            showOptions: showOptions,
            editUrl: `edit/${item.slug_title}/${item.post_id}`,
            messageCallback: messageCallback,
            detailUrl: `article/${item.slug_title}/${item.post_id}`,
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
            shareUrl: process.env.REACT_APP_DOMAIN + `/article/${item.slug_title}/${item.post_id}`,
            type: "post"
        }
        return <ListCard info={info} key={item.id} />
    });


    return <RenderListView posts={fetchedPosts} isLoading={isLoading} isFetchingNext={isFetchingNext} message={"You've not posted any articles yet."} classes={"_"} />;
};