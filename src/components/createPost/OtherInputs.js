import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles/other.module.css";
import TagsFetchWrapper from "./TagsFetchWrapper";

const OtherInp = ({ fieldsVal }) => {
    const [selectedTags, setSelectedTags] = useState([]);



    const removeTag = (event) => {
        const tag_id = event.target.closest("div").getAttribute("data-id");
        setSelectedTags((tags) => tags.filter((item) => item.id !== +tag_id));
    }

    const selected = selectedTags.map((item) => {
        return (
            <div key={item.id} data-id={item.id} >
                <span className={styles.tag__nm}>#{item.tag_name}</span>
                <span onClick={removeTag} className={styles.rm__tag}>
                    <AiOutlineClose size={17} />
                </span>
            </div>
        )
    });

    return (
        <section className={styles.container} >
            <div className={styles.add__tags}>
                <div className={styles.tag__field}>
                    <label htmlFor="add__tag">
                        Add Tags
                    </label>
                    <div className={styles.suggested__field}>
                        <TagsFetchWrapper setSelectedTags={setSelectedTags} />
                    </div>
                </div>
                <div className={styles.selected__tags}>
                    {selected}
                </div>
            </div>
        </section>
    )
};

export default OtherInp;