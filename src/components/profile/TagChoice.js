import { useState } from "react";
import styles from "./styles/tagchoice.module.css";



const TagChoice = ({ setHasPickedTags }) => {
    // already picked tags id should be set in state below after
    // first render
    const [pickedTags, setPickedTags] = useState([]);

    //dummy fill
    const numarr = [];
    const tags_ = ["python", "js", "3d printing", "gaming", "data science"];
    for (let i = 1; i <= 20; i++) {
        numarr.push(i);
    }
    const index = Math.max(0, (Math.round(((Math.random() * 20) / 4))) - 1);

    const tags = numarr.map((item) => {
        return (
            // data-id should be item.id
            <div key={item} data-id={item} onClick={pickHandler}>
                {tags_[index]}
            </div>
        )
    });

    const pickHandler = (event) => {
        const dataID = event.target.getAttribute("data-id");
        const index = pickedTags.indexOf(+dataID);

        if (index !== -1) {
            const newTags = pickedTags.splice(0);
            newTags.splice(index, 1);
            setPickedTags(newTags);
            event.target.classList.remove(`${styles.highlight}`);
        } else {
            setPickedTags((arr) => [...arr, +dataID]);
            event.target.classList.add(`${styles.highlight}`);
        }
    };


    const handleSubmit = () => {
        //setHasPickedTags();
    };

    return (
        <div className={styles.select}>
            <span>Lets know your interest's</span>
            <div className={styles.tags}>
                {tags}
            </div>
            <div className={styles.submit}>
                <button onClick={handleSubmit}>
                    save
                </button>
            </div>
        </div>
    )
};


export default TagChoice;