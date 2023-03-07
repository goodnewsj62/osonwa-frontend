import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "store/profileSlice";
import styles from "./styles/tagchoice.module.css";



const TagChoice = ({ setHasPickedTags, hasChoosenTags, hideHandler }) => {
    // already picked tags id should be set in state below after
    // first render
    const userInterests = useSelector((states) => states.profileState.interests);
    const [pickedTags, setPickedTags] = useState([...userInterests]);
    const [deletedTags, setDeletedTags] = useState([]);
    const interests = useSelector((states) => states.interestState.allInterests);
    const username = useSelector((states) => states.profileState.userInfo.username);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authState);
    const mode = useSelector((states) => states.mode);



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
            mark_if_is_interest(name)
            setPickedTags(newTags);
            event.target.classList.remove(`${styles.highlight}`);
        } else {
            setPickedTags((arr) => [...arr, name]);
            removeFromDeleted(name);
            event.target.classList.add(`${styles.highlight}`);
        }
    };

    function mark_if_is_interest(removed) {
        if (userInterests.indexOf(removed !== -1)) {
            setDeletedTags((state) => [...state, removed]);
        }
    }

    function removeFromDeleted(name) {
        const index = deletedTags.indexOf(name);
        if (index !== -1) {
            const deletedArray = deletedTags.splice(0);
            deletedArray.splice(index, 1);
            setDeletedTags(deletedArray);
        }
    }

    const handleSubmit = () => {
        const accessToken = authState.access;
        dispatch(updateInterests({ arr: pickedTags, toDelete: deletedTags, username: username, accessToken: accessToken }))
            .unwrap()
            .then((resp) => {
                if (!hasChoosenTags) {
                    setHasPickedTags();
                }
            })
            .catch((resp) => {
                hideHandler(HTMLElement);
            });
    };

    return (
        <div className={styles.select} data-theme={mode} >
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