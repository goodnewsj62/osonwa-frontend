import { useState } from "react";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "./styles/header.module.css";

const HeadSection = (props) => {
    const [showImg, setShowImg] =  useState(false);
    const imgRef =  useRef();
    const fileHandler = (event)=>{
        const image =  URL.createObjectURL(event.target.files[0]);
        imgRef.current.src =  image;

        setShowImg(image?true:false);
    };

    return(
        <section className={styles.container}>
            <div className={styles.title}>
                <input placeholder="Title" type="text" id="title" />
                <span className={styles.slide__bar}></span>
            </div>
            <div className={styles.file__area}>
                <img ref={imgRef} style={{display: showImg? "block": "none"}} src="" alt="cover" />
                <div className={styles.file__text}>
                    <span>
                        <IoMdAdd size={33}/>
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

export default HeadSection;