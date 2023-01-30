import Editor from "components/createPost/Editor";
import HeadSection from "components/createPost/HeadSection";
import Main from "components/others/MainWrapper";
import styles from "./styles/create.module.css";



const CreateArticle = (props) => {

    return(
        <Main>
            <div className={styles.container}>
                <h1>Create Post</h1>
                <form action="" className={styles.form}>
                    <HeadSection />
                    <Editor />
                </form>
            </div>
        </Main>
    )
};

export default CreateArticle;