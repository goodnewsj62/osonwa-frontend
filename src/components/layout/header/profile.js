import { BsCloudSun } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { FcLike, FcFolder } from "react-icons/fc";
import image from "static/images/test_image.png";
import styles from "../styles/header/profile.module.css";
import {ToggleMode} from "pages/Layout";

import { useContext, useState } from "react";
import { memo } from "react";

function ProfileNav({ show, setShow,...others }) {

    const toggleShow = (e)=>{
        const timeout = setTimeout(()=>{setShow(!show)}, 300);
        return timeout;
    }

    return (
        <nav style={show ? {} : { display: "none" }} aria-label="profile navigation" className={styles.profile__options}>
            <div className={styles.profile__sec}>
                <div onClick={(e)=>{toggleShow(e)}} className={styles.img__wrapper}>
                    <img src={image} alt="profile" />
                    <h2 className="first__letter">O</h2>
                </div>
                
                <div className={styles.greeting}>
                    <h4>Hi Osonwa</h4>
                    <p>
                        Good Morning!
                        <span></span>
                        <BsCloudSun className="morning__sun" />
                        <IoCloudyNightOutline className="evening_time" />
                    </p>
                </div>
            </div>
            <div className={styles.demacation}></div>
            <ul onClick={(e)=>{toggleShow(e)}}>
                <li>Profile</li>
                <li>Edit Profile</li>
                <li>Posts</li>
                <li>Social accounts</li>
            </ul>
            <div className={styles.demacation}></div>
            <ul onClick={(e)=>{toggleShow(e)}} className={styles.previous__actions}>
                <li>
                    <FcFolder size={20} />
                    <p>Saved</p>
                </li>
                <li>
                    <FcLike size={20} />
                    <p>Liked</p>
                </li>
            </ul>
            <div className={styles.demacation}></div>
            <ul className={styles.nav__last}>
                <li>
                    <ChangeApperance />
                </li>
                <li onClick={(e)=>{toggleShow(e)}}>Logout</li>
            </ul>
        </nav>
    )
}


const checkMode = () => localStorage.getItem("mode") === "dark"? true : false;
function ChangeApperance({setShow, ...others}) {
    const [darkMode, setDarkMode] = useState(checkMode);
    const [mode,setMode] = useContext(ToggleMode);

    
    function toggleMode(e) {
        if(mode === "dark"){
            localStorage.setItem("mode","light" );
            setMode("light");
            setDarkMode(false);
        }else{
            localStorage.setItem("mode","dark");
            setMode("dark");
            setDarkMode(true);
        }
    }
    return (
        <div className={`${styles.appearance} appearance`} onClick={(e)=>{toggleMode(e)}} >
            <span>Apperance</span>
            <button type="button" className={`${darkMode? styles.border__highlight : ''}`}>
                <span className={`${styles.ball} ${darkMode? styles.ball__shift : ''}`}></span>
            </button>
        </div>
    )
}



function Profile({ show,setShow, ...others }) {
    return (
        <div className={styles.profile__div}>
            <img onClick={(e)=>{setShow(!show)}} src={image} alt="profile" />
            <h2 onClick={(e)=>{setShow(!show)}} >O</h2>
            <ProfileNav show={show} setShow={setShow}/>
        </div>
    )
}



export default memo(Profile);