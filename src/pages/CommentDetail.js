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
        /* create url to post if the comment is a child of a comment
            then because of the max two layer nesting  of comments
            then the parent comment reference the post so get the 
            detail of the post from parent else 
            get details of post from comment content_object
        */
        if (isLoading) return;


        if(post.content_type === "comment"){
            const object_ = post.content_object.content_object
            const type = object_.instance_type;
            const id = type === "post"? object_.post_id: object_.id;
            const slug_title= object_.slug_title;
            
            return urlFromType(type,slug_title,id);
            
        }else{
            const type = post.content_object.instance_type;
            const id = type === "post"? post.content_object.post_id:post.content_object.id;
            const slug_title= post.content_object.slug_title;
            return urlFromType(type,slug_title,id);
        }
    },[urlFromType, post, isLoading]);


    const commentCreationHandler = async (content)=>{
        if(post.content_type === "comment" && post.content_object.content_type !== "comment"){
            const id = post.content_object.id;
            return await postComment(id,content);
        }else if(["news","article","post"].indexOf(post.content_type) !== -1){
            const id = post.id;
            return await postComment(id,content);
        }
    }

    async function postComment(id, content){
        try {
            const data= {
                "object_id":id,
                "type":"comment",
                "content":JSON.stringify(content.content),
                "text_content":content.text_content,
                "mentions": getMentions(content.text_content)
            }

            const resp = await axios_.post("/comment/", data);
            setNewComment(resp.data.data)
            setMessage({message:"comment created", category:"success", status:true});
            return resp;
        } catch (error) {
            console.log(error.response)
            setMessage({message:"comment creation failed", category:"failure", status:true});
            return error
        }
    }


    function getMentions(text){
        const allMentions =  text.match(/@\w+/gm)
        const foundReference =  allMentions? allMentions : [];
        const distinctValue =  new Set(foundReference);
        return Array.from(distinctValue);
    }


    const delta =  useMemo(()=>{
        if(replyTo){
            return {
                ops: [
                    { insert: "@" + replyTo, attributes: { link: "#" } },
                ]
            }
        }
        return {ops:[]};
    }, [replyTo])

    return(
        <Main>
            {
                !isLoading && !notFound &&
                <mention.Provider value={setReplyTo}>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <section className={styles.main__comment}>
                                <div className={styles.see_post}>
                                    <Link to={postUrl()}>
                                        see post
                                    </Link>
                                </div>
                                <CommentCard comment={post} />
                            </section>

                            
                            <section className={styles.comments}>
                                    <Comments post={post} type={"comment"} showForm={false} setExtra={newComment}/>
                            </section>
                        </div>
                        <section className={styles.comment__form}>
                            <CommentForm createHandler={commentCreationHandler} delta={delta} />
                        </section>
                    </div>
                </mention.Provider>
            }
            {notFound && <ErrorPage image={img404} message={"Page not found"} statusCode={404} />}
            {message.status && <MessagePopup message={message.message} category={message.category} /> }
        </Main>
    )
};


export default CommentDetail;