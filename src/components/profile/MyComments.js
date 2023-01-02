import CommentCard from "components/others/cards/CommentCard";
import EmptyContentMessage from "./Message";
import image from "static/images/test_img.jpg";


export default function MyComments() {
    const fetchedComments = [].map((item) => {
        const params = {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, aperiam quia accusantium dignissimos molestiae magni reiciendis illum error debitis aliquam aspernatur modi omnis ad. Esse.",
            imageSrc: image,
            username: "someones username",
            date: "06 oct 2022"
        };
        return <CommentCard params={params} />
    });

    const displayBool = fetchedComments.length !== 0;

    return (
        <>
            {displayBool && <section className={``}>{fetchedComments}</section>}
            {!displayBool && <EmptyContentMessage message={"You've not posted any articles yet."} />}
        </>
    );
};