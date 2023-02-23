import Main from "components/others/MainWrapper";

import styles from "./styles/articles.module.css";
import ListView from "components/views/ListView";



const Trending = () => {
    return (
        <Main>
            <h1 className={styles.page__header}>Trending</h1>
            <ListView url={"/trending/"} />
        </Main>
    );
};


export default Trending;