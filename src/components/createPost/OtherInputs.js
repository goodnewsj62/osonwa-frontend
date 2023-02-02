import DropDownInput from "components/others/forms/DropDownInput";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles/other.module.css";

const OtherInp = ({ fieldsVal }) => {
    const [fetchedTags, setFetchedTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const tags = fetchedTags.map((item) => {
        return (
            <div key={item.id}>
                {item.tag_name}
            </div>
        )
    });

    const removeTag = (event) => {
        const tag_id = event.target.getAttribute("data-id");
        setSelectedTags(selectedTags.filter((item) => item.id !== +tag_id));
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
                        <DropDownInput params={{}} suggestions={tags} />
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