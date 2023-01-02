import { useState } from "react";
import styles from "./styles/switch.module.css";


const NavSwitch  =  ({handler, subjects})=>{
    const [active, setActive]= useState(subjects[0]);
    
    const clickHandler =  (event)=>{
        const content =  event.target.innerText.trim();
        handler(content);
        setActive(content);
    };

    const items =  subjects.map((item)=>{
        const classNames = active === item?  `${styles.box} ${styles.selected}`: `${styles.box}`;
        return (
            <div key={item} onClick={clickHandler} className={classNames}>
                <span>{item}</span>
                <div className={styles.bar}></div>
            </div>
        );
    });

    return (
        <nav className={styles.container}>
            {items}
        </nav>
    )
};


export default NavSwitch;