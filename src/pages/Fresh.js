import Main from "components/others/MainWrapper";

import styles from "./styles/articles.module.css";
import ListView from "components/views/ListView";



const Fresh = () => {

    return (
        <Main>
            <h1 className={styles.page__header}>Fresh</h1>
            <ListView url="/fresh/" />
        </Main>
    );
};


export default Fresh;