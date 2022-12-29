import { useState } from "react";



const NavSwitch  =  ({handler, subjects})=>{
    const [active, setActive]= useState(subjects[0]);
    
    const clickHandler =  (event)=>{
        const content =  event.target.innerText.trim();
        handler(content);
        setActive(content);
    };

    const items =  subjects.map((item)=>{
        const classNames = active === item?  ``: ``;
        return (
            <div onClick={clickHandler} className={classNames}>
                <span>{item}</span>
                <div className={``}></div>
            </div>
        );
    });

    return (
        <nav>
            {items}
        </nav>
    )
};


export default NavSwitch;