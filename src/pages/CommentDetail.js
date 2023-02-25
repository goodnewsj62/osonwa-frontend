import { MessagePopup } from "components/others";
import CommentCard from "components/others/cards/CommentCard";
import Comments from "components/others/Comments";
import CommentForm from "components/others/forms/CommentForm";
import Main from "components/others/MainWrapper";
import useAuthAxios from "hooks/authAxios";
import useMessage from "hooks/messageHook";
import { useEffect } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { useCallback, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import useFetchDetail from "./hooks/fetchDetail";
import styles from "./styles/comment.module.css";
import img404 from "static/images/p404.svg";


export const mention =  createContext();


const CommentDetail = ()=>{
    const {id} = useParams();
    const [replyTo, setReplyTo] =  useState("");
    const location =  useLocation();
    const axios_ = useAuthAxios();

    const [newComment, setNewComment] =  useState({});

    const [post, isLoading, notFound] = useFetchDetail(`/comment/${id}/`);
    const [message, setMessage]= useMessage();


    useEffect(()=>{
        if(Object.keys(location).indexOf("state") !== -1 && location.state && location.state.username){
            setReplyTo(location.state.username);
        }
    }, [location]);

    const urlFromType =  useCallback((type, slug_title,id)=>{
        if(type === "news"){
                return `/aggregate/news/${slug_title}/${id}`;
        }else if(type==="article"){
            return `/aggregate/article/${slug_title}/${id}`;
        }
        return `/article/${slug_title}/${id}`;
    },[])

    const postUrl =  useCallback(()=>{
        if (isLoading) return;


        if(post.content_type === "comment"){
            const id = post.content_object.content_object.id;
            const slug_title= post.content_object.content_object.slug_title;
            const type = post.content_object.content_object.instance_type;
            return urlFromType(type,slug_title,id);
            
        }else{
            const id = post.content_object.id;
            const slug_title= post.content_object.slug_title;
            const type = post.content_object.instance_type;
            return urlFromType(type,slug_title,id);
        }
    },[urlFromType, post, isLoading]);


    const commentCreationHandler = (content)=>{
        if(post.content_type === "comment" && post.content_object.content_type !== "comment"){
            const id = post.content_object.id;
            postComment(id);
        }else if(["news","article","post"].indexOf(post.content_type) !== -1){
            const id = post.id;
            postComment(id);
        }
    }

    async function postComment(id, content){
        try {
            const data= {
                "id":id,
                "type":"comment",
                "content":content.content,
                "text_content":content.text_content,
                "mentions": getMentions(content.text_content)
            }

            const resp = await axios_.post("/comment/", data);
            setNewComment(resp.data.data)
            setMessage({message:"comment created", category:"success", status:true});
            return resp;
        } catch (error) {
            setMessage({message:"comment creation failed", category:"failure", status:true});
            return error
        }
    }


    function getMentions(text){
        const allMentions =  text.match(/\s@\w+/gm)
        const foundReference =  allMentions? allMentions : [];
        return [replyTo,...foundReference];
    }


    const delta =  useMemo(()=>{
        if(replyTo){
            return {
                ops: [
                    { insert: replyTo, attributes: { link: "#" } },
                ]
            }
        }
        return {};
    }, [replyTo])

    return(
        <Main>
            {
                !isLoading && !notFound &&
                <>
                    <section className={styles.main__comment}>
                        <div>
                            <Link to={postUrl()}>
                                see post
                            </Link>
                        </div>
                        <CommentCard comment={post} />
                    </section>

                <section className={styles.comments}>
                    <mention.Provider setReplyTo={setReplyTo}>
                        <Comments post={post} type={"comment"} showForm={false} setExtra={newComment}/>
                    </mention.Provider>
                </section>
                <section className={styles.comment__form}>
                    <CommentForm createHandler={commentCreationHandler} delta={delta} />
                </section>
                </>
            }
            {notFound && <ErrorPage image={img404} message={"Page not found"} statusCode={404} />}
            {message.status && <MessagePopup message={message.message} category={message.category} /> }
        </Main>
    )
};


export default CommentDetail;