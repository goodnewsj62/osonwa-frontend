import { SpreadLoader } from "components/others";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateArticle from "./CreateArticle";
import useFetchDetail from "./hooks/fetchDetail";



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
            {/* {!isAuthorized && <Page403 />} */}
            {/* {!notFound && <Page404 />} */}
            {isLoading && <span className="loader"><SpreadLoader /></span>}
        </>
    )

};


export default EditPost;