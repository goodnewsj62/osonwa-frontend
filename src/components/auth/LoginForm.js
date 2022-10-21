import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginForm(props) {
    return (
        <form >
            <div className="form__div">
                <label htmlFor="">
                    Username/Email
                </label>
                <input type="text" name="username" id="username" />
            </div>
            <div className="form__div password__div">
                <label htmlFor="">
                    Password
                </label>
                <input type="password" name="password" id="password" />
                <div>
                    <span className="open__eye">
                        <AiOutlineEye />
                    </span>
                    <span className="close__eye">
                        <AiFillEyeInvisible />
                    </span>
                </div>
            </div>
            <button type="submit">
                Login
            </button>
            <div className="other__links">
                <button type="button">
                    first time? sign up instead
                </button>
                <button type="button">
                    forgot password
                </button>
            </div>
        </form>
    );
};