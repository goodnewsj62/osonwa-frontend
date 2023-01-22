import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "store/interestsSlice";
import styles from "./styles/tagchoice.module.css";



const TagChoice = ({ setHasPickedTags, hasChoosenTags, hideHandler }) => {
    // already picked tags id should be set in state below after
    // first render
    const userInterests = useSelector((states) => states.profileState.interests);
    const [pickedTags, setPickedTags] = useState([...userInterests]);
    const interests = useSelector((states) => states.interestState.allInterests);
    const username = useSelector((states) => states.profileState.userInfo.username);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authState);



    const tags = interests.map(({ id, name }) => {
        if (pickedTags.indexOf(name) !== -1) {
            return (
                <button className={styles.highlight} type="button" key={id} onClick={pickHandler}>
                    {name}
                </button>
            )
        } else {
            return (
                <button type="button" key={id} onClick={pickHandler}>
                    {name}
                </button>
            )
        }
    });

    function pickHandler(event) {
        const name = event.target.innerText.trim();
        const index = pickedTags.indexOf(name);

        if (index !== -1) {
            const newTags = pickedTags.splice(0);
            newTags.splice(index, 1);
            setPickedTags(newTags);
            event.target.classList.remove(`${styles.highlight}`);
        } else {
            setPickedTags((arr) => [...arr, name]);
            event.target.classList.add(`${styles.highlight}`);
        }
    };

    const handleSubmit = () => {
        const accessToken = authState.access;
        dispatch(updateInterests({ arr: pickedTags, username, accessToken: accessToken }))
            .unwrap()
            .then((resp) => {
                if (!hasChoosenTags) {
                    setHasPickedTags();
                }
            })
            .catch((resp) => { });
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
    );
};


export default TagChoice;