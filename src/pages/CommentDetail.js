import CommentCard from "components/others/cards/CommentCard";
import Comments from "components/others/Comments";
import Main from "components/others/MainWrapper";
import { useParams } from "react-router-dom";
import useFetchDetail from "./hooks/fetchDetail";
import styles from "./styles/comment.module.css";



const CommentDetail = ()=>{
    const {id} = useParams();

    const [post, isLoading, notFound] = useFetchDetail(`/comment/${id}/`);


    return(
        <Main>
            <section className={styles.main__comment}>
                <div>
                    <Link to={}>
                        see post
                    </Link>
                </div>
                <CommentCard comment={} />
            </section>

            <section className={styles.comments}>
                <Comments post={} type={"comment"} />
            </section>
        </Main>
    )
};


export default CommentDetail;