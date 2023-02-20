import { memo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "./styles/header.module.css";
import style from "./styles/general.module.css";

const HeadSection = ({ dispatch, fieldVal, setImgHolder, image }) => {
    const [showImg, setShowImg] = useState(image ? true : false);

    const fileHandler = (event) => {
        setShowImg(true);
        setImgHolder({ file: event.target.files[0] })
    };

    const validateTitle = (event) => {
        const title = event.target.value;
        const trimmedTitle = title.trim();
        let message = { isValid: true, error: "", content: title };

        if (!title) {
            message = { isValid: false, content: title, error: "this field is required" };
        } else if (trimmedTitle.length < 4) {
            message = { isValid: false, content: title, error: "the title must me more than 3 characters long" }
        }

        dispatch({ type: "title", payload: message });
    }

    const imgSrc = image && typeof image !== "string" ? URL.createObjectURL(image) : (image || "");

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <input placeholder="Title" type="text" onChange={validateTitle} value={fieldVal.content} id="title" />
                <span className={styles.slide__bar}></span>
                <div className={style.error}>
                    {fieldVal.error}
                </div>
            </div>
            <div className={styles.file__area}>
                <img src={imgSrc} style={{ display: showImg ? "block" : "none" }} alt="cover" />
                <div className={styles.file__text}>
                    <span>
                        <IoMdAdd size={33} />
                    </span>
                    <span>
                        <i>click or drag image to add cover image </i>
                    </span>
                </div>
                <input onChange={fileHandler} type="file" name="" id="" accept=".jpg,.png,.jpeg,.webp" />
            </div>
        </section>
    )
};

export default memo(HeadSection);