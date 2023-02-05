import Advanced from "components/createPost/AdvacedSection";
import Editor from "components/createPost/Editor";
import HeadSection from "components/createPost/HeadSection";
import OtherInp from "components/createPost/OtherInputs";
import Main from "components/others/MainWrapper";
import useAuthAxios from "hooks/authAxios";
import { useEffect, useReducer, useState } from "react";
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
    const [savestatus, setSavestatus] = useState("nothing");
    const [postResponseInfo, setPostResponseInfo] = useState({});
    const axios_ = useAuthAxios();

    useEffect(() => {
        // const beforeunloadHandler = (event) => { event.preventDefault(); return event.rerurnValue = "you may have changes that have not been stored" };
        // window.addEventListener("beforeunload", beforeunloadHandler);

        // return () => window.removeEventListener("beforeunload", beforeunloadHandler);
    }, []);

    //overtime check for changes in content
    // if changes are available with a title and no saved post_id 
    // then post and save post_id
    // else patch content like normal save

    // see if all field is valid 
    // create a form data and fill all fields for blog
    // publish the post with  a patch
    // publish all tags required 

    // on success show saved tick in the UI

    function constructData() {
        const fData = new FormData();
        for (let key in fieldsVal) {
            if (key === "content") {
                const writeupFormats = { delta: fieldsVal[key].content.delta, html: fieldsVal[key].content.html };
                const writeupText = fieldsVal[key].content.text;
                const content = {}
                continue;
            }
        }

    }

    const patchPost = async () => {
        try {
            const url = ``;
            const data = constructData();
            axios_.patch(url, data)

        } catch (error) {
            //catch should prompt error message
        }
    }

    const createPost = () => {
        try {
            const url = "";
        } catch (error) {

        }
    }

    const createPostHandler = (event) => {

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
                    <Editor dispatch={dispatch} value={fieldsVal.content.delta} />
                    <OtherInp selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    <Advanced
                        dispatch={dispatch}
                        fieldVals={{ orderVal: fieldsVal.order }}
                    />
                    <div className={styles.submit}>
                        <button type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    )
};

export default CreateArticle;