import { SpreadLoader } from "components/others";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateArticle from "./CreateArticle";
import ErrorPage from "./ErrorPage";
import useFetchDetail from "./hooks/fetchDetail";
import img404 from "static/images/p404.svg";
import img403 from "static/images/p403.svg";




const EditPost =  ()=>{
    const [isAuthorized, setIsAuthorized] =  useState(false);
    const authState =  useSelector((states)=> states.authState);
    const profileState =  useSelector((states)=> states.profileState);    

    const [post, isLoading, notFound] =  useFetchDetail();


    const initState = {
        title: { isValid: true, content: post.title, error: "" },
        content: { isValid:true, content: { html: "", delta: post.content, text:post.text_content, error:"" } },
        bundle: { isValid:true, content: {id: post.bundle,  topic:post.bundle_name, taken_order_no: post.taken_order_no}, error:"" },
        order: { isValid:true, content: post.order,  error:"" }
    };

    useEffect(()=>{
        if(post.author)setIsAuthorized(authState.state && profileState.userInfo.id === post.author.id);
        console.log(post)
    },[authState, profileState,post])

    return(
        <>
            {
                !isLoading && !notFound && isAuthorized &&
                <CreateArticle initState={initState} initTags={post.tags} defaultImg={{file:post.cover_image}} post={post}  />
            }
            {!isAuthorized && <ErrorPage image={img403} message={"You are not authorized to edit this post"} statusCode={403} />}
            {notFound && <ErrorPage image={img404} message={"Page not found"} statusCode={404} />}
            {isLoading && <span className="loader"><SpreadLoader /></span>}
        </>
    )

};


export default EditPost;