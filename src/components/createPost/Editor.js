
import { useRef } from "react";
import { useEffect } from "react";
import styles from "./styles/form.module.css";

export default function Editor(props){
    const container =  useRef();
    const quillArea =  useRef();

    useEffect(()=>{
    }, [])

    return (
        <section ref={container} className={styles.editor__container}>
            <div id="toolbar"></div>
            <div ref={quillArea} className={styles.editor}  id="quill__editor">
            </div>
        </section>
    )
};