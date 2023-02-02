import Advanced from "components/createPost/AdvacedSection";
import Editor from "components/createPost/Editor";
import HeadSection from "components/createPost/HeadSection";
import OtherInp from "components/createPost/OtherInputs";
import Main from "components/others/MainWrapper";
import { useReducer, useState } from "react";
// import CenterMessagePopup from "components/others/MessageCentral";
import styles from "./styles/create.module.css";

const ds = () => ({ isValid: true, content: "", error: "" });
const initialState = {
    title: ds(),
    content: { ...ds(), content: { html: "", delta: {}, text: "" } },
    bundle: { ...ds() }
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


    return (
        <Main>
            <div className={styles.container}>
                <h1>Create Post</h1>
                <form action="" className={styles.form}>
                    <HeadSection
                        setImgHolder={setImgHolder}
                        dispatch={dispatch}
                        fieldVal={fieldsVal.title}
                    />
                    <Editor dispatch={dispatch} value={fieldsVal.content.delta} />
                    <OtherInp />
                    <Advanced />
                    <div className={styles.submit}>
                        <button type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>
            {/* <CenterMessagePopup message={"You may have unsaved changes will you like to still leave"} /> */}
        </Main>
    )
};

export default CreateArticle;