import { useParams } from "react-router-dom";

function Comment(props) {
    // all other comments under 
    // when you cli8ck on read more more comments should load (you could create a sub comments and still do pagination :))
    return (
        <div>
        </div>
    )
}



function Comments(props) {
    const { id } = useParams();
    return (
        [].map((comment, index, copmments) => {
            return <Comment comment={comment} />
        })
    )
}


export { Comments };