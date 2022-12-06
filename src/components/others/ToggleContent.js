import { useEffect } from "react";
import { useState } from "react";

import styles from  "./styles/tog.module.css";


const ToggleContents =  ({stateNames,components, callback})=>{
    const [state, setState] =  useState(true);
    const [compOne, compTwo]  =  components;
    const [headOne, headTwo] =  stateNames;

    useEffect(()=>{
        if(callback !== undefined )  callback(state? headOne : headTwo);
    },[state, callback, headOne, headTwo]);

    const isSelected = (status)=> status? `${styles.isActive}`:`${styles.inActive}`;

    return(
        <>
            <div className={styles.toggle__header}>
                <button onClick={()=>setState(true)} className={isSelected(state)} type="button">{headOne}</button>
                <button onClick={()=>setState(false)} className={isSelected(!state)} type="button">{headTwo}</button>
            </div>
            <>
                {state && compOne}
                {!state && compTwo }
            </>
        </>
    )
};

export default ToggleContents;