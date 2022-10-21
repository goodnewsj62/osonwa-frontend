import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";



export default function SignUpForm(props) {
    return (
        <form >
            <div className="form__div">
                <label htmlFor="username">
                    Username
                </label>
                <input type="text" name="username" id="username" />
            </div>
            <div className="form__div">
                <label htmlFor="email">
                    Email
                </label>
                <input type="text" name="email" id="email" />
            </div>
            <div className="form__div">
                <label htmlFor="first__name">
                    Firstname
                </label>
                <input type="text" name="first_name" id="first__name" />
            </div>
            <div className="form__div">
                <label htmlFor="last__name">
                    Lastname
                </label>
                <input type="text" name="last_name" id="last__name" />
            </div>
            <div className="form__div password__div">
                <label htmlFor="password">
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
            <div className="form__div password__div">
                <label htmlFor="confirm__password">
                    Comfirm Password
                </label>
                <input type="password" name="confirm_password" id="confirm__password" />
            </div>
            <button type="submit">
                Signup
            </button>
        </form>
    );
};