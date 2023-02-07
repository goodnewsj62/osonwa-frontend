import Advanced from "components/createPost/AdvacedSection";
import Editor from "components/createPost/Editor";
import HeadSection from "components/createPost/HeadSection";
import OtherInp from "components/createPost/OtherInputs";
import Main from "components/others/MainWrapper";
import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/create.module.css";

const ds = () => ({ isValid: true, content: "", error: "" });
const initialState = {
    title: ds(),
    content: { ...ds(), content: { html: "", delta: {}, text: "" } },
    bundle: ds(),
    order: { ...ds(), content: 0 }
};

const reducer = (state, action) => {
    for (let field of Object.keys(state)) {
        if (action.type === field) {
            const fieldContent = { ...state[field], ...action.payload };
            return { ...state, [field]: fieldContent };
        }
    }
};


const CreateArticle = (props) => {
    const [fieldsVal, dispatch] = useReducer(reducer, initialState);
    const [imgHolder, setImgHolder] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    const [errormessage, setErrormessage] = useState({ message: "", status: false });
    const [savestatus, setSavestatus] = useState("clear");
    const [postResponseInfo, setPostResponseInfo] = useState({});
    const [imgHasChanged, setImgHasChanged] = useState(false);
    const navigate = useNavigate();
    const axios_ = useAuthAxios();


    axios_.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const isValid = useCallback(() => {
        return fieldsVal.title.isValid && fieldsVal.title.content && fieldsVal.content.isValid && fieldsVal.content.content.text;
    }, [fieldsVal.title, fieldsVal.content])



    useEffect(() => {
        // const beforeunloadHandler = (event) => { event.preventDefault(); return event.rerurnValue = "you may have changes that have not been stored" };
        // window.addEventListener("beforeunload", beforeunloadHandler);

        // return () => window.removeEventListener("beforeunload", beforeunloadHandler);
    }, []);

    useEffect(() => {
        setImgHasChanged(true);
    }, [imgHasChanged]);


    useEffect(() => {
        const timeout = setTimeout(() => setErrormessage({ message: "", status: false }), 5000);

        return () => clearTimeout(timeout);
    }, [errormessage.status]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isValid()) {
                patchPost().then((resp) => {
                    tagPostWrapper(resp);
                });
            };
        }, 120 * 1000);


        return () => clearInterval(interval);
    }, [isValid]);

    //overtime check for changes in content
    // if changes are available with a title and no saved post_id 
    // then post and save post_id
    // else patch content like normal save

    // see if all field is valid 
    // create a form data and fill all fields for blog
    // publish the post with  a patch
    // publish all tags required 

    // on success show saved tick in the UI



    function appendFileIfChanged(fData) {
        if (imgHolder.file && imgHasChanged) fData.append("cover_image", imgHolder.file); //TODO: REFACTOR

        return fData;
    }

    function constructData() {
        const fData = new FormData();

        for (let key in fieldsVal) {
            if (key === "content") {
                const writeupFormats = { delta: fieldsVal[key].content.delta, html: fieldsVal[key].content.html };
                const writeupText = fieldsVal[key].content.text;
                fData.append("content", JSON.stringify(writeupFormats));
                fData.append("text_content", writeupText);
                continue;
            }

            if (fieldsVal[key].content) fData.append(key, fieldsVal[key].content);
        }

        return appendFileIfChanged(fData);
    }

    function createErrorMessage(error) {
        const err_resp = error.response;
        let message;

        if (err_resp.status > 500) {
            message = "something went wrong at our end while saving";
        } else if (err_resp.status > 400 && err_resp.status < 500) {
            message = err_resp.data.message.error;
        } else if (error.request) {
            message = "saving failed request not sent"
        }

        setErrormessage({ message: message, status: true });
    }

    const patchPost = async () => {

        try {
            const url = `/blog/post/${postResponseInfo.slug_title}/${postResponseInfo.post_id}/`;
            const data = constructData();
            const resp = await axios_.patch(url, data);
            setPostResponseInfo(resp.data.data);
            setSavestatus("success");
            return resp
        } catch (error) {
            //catch should prompt error message
            createErrorMessage(error);
            return error
        }
    }

    const createPost = async () => {
        try {
            const url = "/blog/post/";
            const data = constructData();
            const resp = await axios_.post(url, data);
            setPostResponseInfo(resp.data.data);
            setSavestatus("success");
            return resp
        } catch (error) {
            createErrorMessage(error);
            return error
        }
    }

    const postTags = async (postData) => {
        try {
            const url = `/blog/post/add-tag/${postData.slug_title}/${postData.post_id}/`;
            const data = { "tags": selectedTags };
            const resp = await axios_.patch(url, data, {
                "Content-type": "application/json",
                // "Authorization": "Bearer " + authState.access,
            });
            return resp;
        } catch (error) { return error }
    }

    function postOrPatch() {
        if (postResponseInfo.post_id) {
            return patchPost();
        } else {
            return createPost();
        }
    }

    function tagPostWrapper(resp) {
        if ("status" in resp && [201, 200].indexOf(resp.status) !== -1) {
            const respData = resp.data.data;
            postTags(respData).then((resp) => {
                navigate(`/article/${respData.slug_title}-${respData.post_id}`);
            });
        }

        setErrormessage({ status: true, message: "an error occured, try again" });
    }

    const createPostHandler = (event) => {
        event.preventDefault();
        postOrPatch().then((resp) => {
            tagPostWrapper(resp);
        });


        setImgHasChanged(false);
        setErrormessage({ message: "oops an error occured", status: true });
    };



    return (
        <Main>
            <div className={styles.container}>
                <h1>Create Post</h1>
                <form onSubmit={createPostHandler} className={styles.form}>
                    <HeadSection
                        setImgHolder={setImgHolder}
                        dispatch={dispatch}
                        fieldVal={fieldsVal.title}
                    />
                    <Editor dispatch={dispatch} value={fieldsVal.content.delta} savestatus={savestatus} />
                    <OtherInp selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    <Advanced
                        dispatch={dispatch}
                        fieldVals={{ orderVal: fieldsVal.order }}
                    />
                    <div className={styles.submit}>
                        <button type="submit" disabled={isValid() ? false : true}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    )
};

export default CreateArticle;