import Advanced from "components/createPost/AdvacedSection";
import Editor from "components/createPost/Editor";
import HeadSection from "components/createPost/HeadSection";
import OtherInp from "components/createPost/OtherInputs";
import Main from "components/others/MainWrapper";
import CenterMessagePopup from "components/others/MessageCentral";
import styles from "./styles/create.module.css";



const CreateArticle = (props) => {

    return (
        <Main>
            <div className={styles.container}>
                <h1>Create Post</h1>
                <form action="" className={styles.form}>
                    <HeadSection />
                    <Editor />
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