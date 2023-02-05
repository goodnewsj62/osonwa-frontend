import { useState } from "react";
import {  GoTriangleRight } from "react-icons/go";
import BundleOptions from "./BundleOptions";

import styles from "./styles/advanced.module.css";


const Advanced = ({dispatch, fieldVals}) => {
    const [show, setShow] = useState(false);
    const showContentHandler =  (event)=>{
        setShow((state)=>!state);
    };

    const wrapperStyles =  show ? `${styles.wrapper} ${styles.show__wrapper}` : styles.wrapper;  
    return(
        <section className={styles.container}>
            <div className={styles.toggle}>
                <h3 onClick={showContentHandler}>Advanced options <GoTriangleRight className={show? styles.rotate__svg : ""} /></h3>
            </div>
            <div className={styles.main__content} >
                <div className={wrapperStyles}>
                    <BundleOptions dispatch={dispatch} fieldVals={fieldVals} />
                </div>
            </div>
        </section>
    )
};

export default Advanced;