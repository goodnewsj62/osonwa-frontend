import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import Input from "./Input";
import styles from "./styles/loginform.module.css";
import { authenticateUserAndRedirect } from "utils/helpers";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function LoginForm({ setErrorInfo }) {
    const [passShow, setPassShow] = useState(false);
    const [passValue, setPassValue] = useState("");
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const togglePasswordVisibility = (event, value) => {
        if (value === "show") {
            // input.type =  "text";
            setPassShow(true);
        } else {
            setPassShow(false);
        }
    };
    const iconSize = 20;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await axios.post(process.env.REACT_APP_BACKEND_URL + "/authenticate", {
                username: username, password: passValue
            });

            authenticateUserAndRedirect(resp.data.data, dispatch, navigate, location.state);
        } catch (error) {
            const data = error.response.data;
            console.log(error)
            if (data) {
                setErrorInfo({ state: true, message: data.message.error });
            } else if (error.request) {
                setErrorInfo({ state: true, message: "request not sent. tip: check if you're connected to the internet" });
            }
        }
    }

    const passwordChange = (event) => setPassValue(event.target.value);
    const usernameChange = (event) => setUsername(event.target.value);

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.form__div}`}>
                <label htmlFor="username">
                    Username/Email
                </label>
                <Input params={{ type: "text", changeFunc: usernameChange, value: username }} />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="password">
                    Password
                </label>
                {passShow ? <Input params={{ type: "text", changeFunc: passwordChange, value: passValue }} /> : <Input params={{ type: "password", changeFunc: passwordChange, value: passValue }} />}
                <div>
                    {
                        passShow ?
                            <span onClick={(e) => togglePasswordVisibility(e, "hide")} className={`${styles.open__eye}`}>
                                <AiOutlineEye size={iconSize} />
                            </span> :
                            <span onClick={(e) => togglePasswordVisibility(e, "show")} className={`${styles.close__eye}`}>
                                <AiFillEyeInvisible size={iconSize} />
                            </span>
                    }
                </div>
            </div>
            <div className={styles.submit}>
                <button type="submit">
                    Login
                </button>
            </div>
            <div className={`${styles.other__links}`}>
                <Link to="/signup">
                    first time? sign up instead
                </Link>
                <button type="button">
                    forgot password
                </button>
            </div>
        </form>
    );
};