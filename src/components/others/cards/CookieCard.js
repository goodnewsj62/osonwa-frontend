import style from "./styles/CookiePopup.module.css";
import cookie from "static/images/cookie.png";
import { useEffect } from "react";

function CookiePopup({ cookieState: { hasAcceptedCookie, setHasAcceptedCookie } }) {

    useEffect(() => {
        if (hasAcceptedCookie === false) {
            localStorage.setItem("cookieStatus", "true");
        }
    }, [hasAcceptedCookie]);

    function cookieStatusHandler(event) {
        setHasAcceptedCookie(true);
    }

    return (
        <div className={style.footer__pop}>
            <div className={style.message}>
                <div>
                    <img src={cookie} alt="cookie" />
                    <img src={cookie} alt="cookie_2" />
                </div>
                {/* TODO: Please reconstruct this text */}
                <p>Our website uses cookies as specified in the cookies policy.</p>
            </div>
            <div className={style.buttons}>
                <button onClick={cookieStatusHandler} type="button">
                    Accept
                </button>
            </div>
        </div>
    );
};


export default CookiePopup;