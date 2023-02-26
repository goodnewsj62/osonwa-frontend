import CommentCard from "components/others/cards/CommentCard";
import RenderListView from "components/others/RenderList";
import { useSelector } from "react-redux";


export default function MyComments({ posts, setPosts, isLoading, isFetchingNext, usernameOnURL }) {
    const profileInfo = useSelector((states) => states.profileState);

    const isUser = profileInfo.status && profileInfo.userInfo.username === usernameOnURL;




    const fetchedComments = posts.map((item) => {
        return <CommentCard comment={item} key={item.id} setComments={setPosts} />;
    });


    return <RenderListView posts={fetchedComments} isLoading={isLoading} isFetchingNext={isFetchingNext}
        message={isUser ? "You've no comments yet." : "user has no comments"} classes={"_"}
    />;
};