import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./styles/tagchoice.module.css";



const TagChoice = ({ setHasPickedTags, hideHandler }) => {
    // already picked tags id should be set in state below after
    // first render
    const [pickedTags, setPickedTags] = useState([]);

    //dummy fill
    const numarr = [];
    const tags_ = ["python", "js", "3d printing", "gaming", "data science"];
    for (let i = 1; i <= 20; i++) {
        numarr.push(i);
    }

    const tags = numarr.map((item) => {
        const index = Math.max(0, (Math.round(((Math.random() * 20) / 4))) - 1);
        return (
            // data-id should be item.id
            <button type="button" key={item} data-id={item} onClick={pickHandler}>
                {tags_[index]}
            </button>
        )
    });

    function pickHandler(event) {
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
            <div className={styles.close} onClick={hideHandler}> <AiFillCloseCircle size={40} /></div>
            <span className={styles.heading}>Lets know your interest's</span>
            <div className={styles.tags}>
                {tags}
            </div>
            <div className={styles.submit}>
                <button type="button" onClick={handleSubmit}>
                    save
                </button>
            </div>
        </div>
    )
};


export default TagChoice;