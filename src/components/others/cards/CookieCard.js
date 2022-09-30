import style from "./styles/CookiePopup.module.css";
import cookie from "static/images/cookie.png";

function CookiePopup({ setState, state }) {

    function setAcceptedStatus(event) {
        localStorage.setItem("cookieStatus", "true")
        setState(true);
    }

    if (!state) {
        return (
            <div className={style.footer__pop}>
                <div className={style.message}>
                    <div>
                        <img src={cookie} alt="cookie" />
                        <img src={cookie} alt="cookie_2" />
                    </div>
                    <p>Our website uses cookies as specified in the cookies policy.</p>
                </div>
                <div className={style.buttons}>
                    <button onClick={setAcceptedStatus} type="button">
                        Accept
                    </button>
                </div>
            </div>
        );
    }
};


export default CookiePopup;