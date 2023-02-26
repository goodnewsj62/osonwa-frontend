import useAuthAxios from "hooks/authAxios";
import useCurrentUrlPath from "hooks/currentUrlPath";
import useMessage from "hooks/messageHook";
import { mention } from "pages/CommentDetail";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import AuthPopupModal from "../AuthPopupModal";
import MessagePopup from "../cards/MessagePopupCard";
import styles from "./styles/comments.module.css";



const CommentForm = ({ id, type, setComment, createHandler, delta = {} }) => {
    const [content, setContent] = useState({ text_content: "", content: { delta: { ops: [], ...delta }, html: "" } });
    const [errors, setError] = useState({ error: "", isValid: true });
    const [authPopup, setauthPopUp] = useState(false);
    const [message, setMessage] = useMessage();


    const profileState = useSelector((states) => states.profileState);

    const axios_ = useAuthAxios();
    const setReplyTo = useContext(mention);
    const currentPath = useCurrentUrlPath();

    useEffect(() => {
        if (delta && delta.ops) {
            setContent((state) => {
                return {
                    ...state, content: { ...state.content, delta: { ops: [...delta.ops, ...state.content.delta.ops] } }
                }
            });

            setReplyTo("");
        }
    }, [delta, setReplyTo]);

    const modules = {
        toolbar: {
            container: [
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                ['link', 'code-block'],
                [{ 'script': 'sub' }, { 'script': 'super' }],

                ['clean'],
            ],
        },
        syntax: true,
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }


    const changeHandler = (content, delta, source, editor) => {
        const values = { html: content, delta: editor.getContents() };
        validateContent(editor.getText());
        setContent({ text_content: editor.getText(), content: values });
    };

    function validateContent(content) {
        let error = "";
        let isValid = true;

        if (content && content.length < 0) {
            error = "content cannot be left empty"
            isValid = false;
        } else if (content && content.length > 1500) {
            error = "content too long"
            isValid = false;
        }
        setError({ error: error, isValid: isValid });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!profileState.userInfo.id) {
            setauthPopUp(true);
            return;
        }

        if (createHandler) {
            await createHandler(content);
        } else {
            uploadComment();
        }
        setContent({ text_content: "", content: { delta: { ops: [], ...delta }, html: "" } });
    };

    // const handleUserNameMentioned

    async function uploadComment() {
        try {
            const data = {
                "type": type,
                "object_id": id,
                "text_content": content.text_content,
                "content": JSON.stringify(content.content)
            };
            const resp = await axios_.post("/comment/", data);
            setComment((state) => ({ ...state, posts: [resp.data.data, ...state.posts] }));
            setMessage({ message: "comment success", status: true, category: "success" });
            return resp
        } catch (err) {
            setMessage({ message: "oops and error occurred", status: true, category: "failure" });
            return err;
        }
    }


    return (
        <>
            <form className={styles.body} onSubmit={handleSubmit}>
                <div className={styles.count}>
                    <span>
                        {content.text_content.length} / 1500
                    </span>
                </div>
                <div className={styles.editor} id="quill__editor">
                    <ReactQuill
                        placeholder="write something..."
                        theme="snow"
                        modules={modules}
                        scrollingContainer="#quill__editor"
                        onChange={changeHandler}
                        value={content.content.delta}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                {
                    !errors.isValid &&
                    <div className={styles.error}>
                        <p>{errors.error}</p>
                    </div>
                }
                <div className={styles.submit}>
                    <button disabled={!errors.isValid ? true : false}>
                        <span>Submit</span>
                        <span><HiPaperAirplane size={16} /></span>
                    </button>
                </div>
            </form>
            {authPopup && <AuthPopupModal hideHandler={() => setauthPopUp(false)} next={currentPath} />}
            {message.status && <MessagePopup message={message.message} category={message.category} />}
        </>
    )
};

export default CommentForm;