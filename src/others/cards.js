
import {AiFillHeart, AiFillStar} from "react-icons/ai";
import {RiShareForwardFill} from "react-icons/ri";
import {BiMessageSquareDetail} from "react-icons/bi";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdCancel} from "react-icons/md";
import {FcGoogle} from "react-icons/fc";

import rocket from "static/images/Saly-43.png";
import cookie from "static/images/cookie.png";
import miles from "static/images/test_img.jpg";
import styles from "./styles/cards.module.css";
import style from "./styles/cards_2.module.css";

const iconSize = 20 

function NormalCard(props){
    return (
        <div className= {style.normal__card}>
            <div  className={style.card__img}>
                <img src={miles} alt="logo" />
                <div className={style.bookmark}>
                    <AiFillStar size={iconSize} />
                </div>
            </div>
            <div className={style.card__detail} >
                <h4 aria-label="title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate id quaerat fuga cum voluptates animi.
                </h4>
                <p>Read more</p>
                <div>
                    <ul>
                        <li>
                            <div>
                            <BiMessageSquareDetail size={iconSize} />
                            </div>
                            <div>
                                8000
                            </div>
                        </li>
                        <li>
                            <div>
                                <RiShareForwardFill size={iconSize} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <AiFillHeart size={iconSize} />
                            </div>
                            <div>
                                30000
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}



function PopUpCard(props){
    return (
        <div className={styles.pop__up}>

        </div>
    )
}



function AuthCard(props){
    return (
        <div className={styles.auth__card} >
            <i className={styles.cancel}>
                <MdCancel  size={28} />
            </i>
            <div className={styles.auth__image} >
                <img src={rocket} alt="rocket" />
                <h4>Login to access this feature and many more</h4>
            </div>
            <div className={styles.auth__footer} >
                <div className={styles.action}>
                    <button type="button">
                        <span><FcGoogle size={iconSize} /></span> Sign up with google 
                    </button>
                    <span>Or sign up via other methods</span>
                </div>
                <div>
                    Already have an account? <span>Login </span>
                </div>
            </div>
        </div>
    )
}


function CookiePopup(props){
    return (
        <div className={style.footer__pop}>
            <div className={style.message}>
                <div>
                    <img src={cookie} alt="cookie" />
                    <img src={cookie} alt="cookie_2" />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, voluptatibus.</p>
            </div>
            <div className={style.buttons}>
                <button type="button">
                    Accept
                </button>
            </div>
        </div>
    )
}


function MessagePopup(props){
    return (
        <div className={styles.message}>
            <BsCheckCircleFill className={styles.icon__success} size={iconSize} />
            <MdCancel className={styles.icon__failure} size={iconSize} />
            <span></span>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing</p>
            <span className={styles.link}>
                link
            </span>
        </div>
    )
}


export { NormalCard, PopUpCard, MessagePopup,CookiePopup,AuthCard};