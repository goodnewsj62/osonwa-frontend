import AreaField from "components/others/forms/AreaField";
import NamedField from "components/others/forms/NamedField";
import { useCallback, useReducer } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbCameraPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";
import { textFieldValidator, urlFieldValidator } from "utils/validators";
import profileSliceActions from "store/profileSlice";

import styles from "./styles/edit.module.css";
import UserNameField from "./profileForm/UserNameField";
import { useRef } from "react";


const dS = () => ({ content: "", isValid: true, error: "" });


const formReducer = (state, action) => {
    const keys = Object.keys(state);
    for (let key of keys) {
        if (key === action.type) {
            const payload = { ...state[key], ...action.payload };
            return { ...state, [key]: payload }
        }
    }

    return state;
};



const ProfileForm = ({ closeHandler, setMessage }) => {
    //TODO: REFACTOR
    const profileInfo = useSelector((states) => states.profileState.userInfo);
    const dispatch_ = useDispatch();
    const imgRef = useRef();
    const fileRef = useRef();

    const initialState = {
        username: { ...dS(), content: profileInfo.username },
        first_name: { ...dS(), content: profileInfo.first_name },
        last_name: { ...dS(), content: profileInfo.last_name },
        bio: { ...dS(), content: profileInfo.bio },
        twitter_url: { ...dS(), content: profileInfo.twitter_url },
        facebook_url: { ...dS(), content: profileInfo.facebook_url },
        git_url: { ...dS(), content: profileInfo.git_url },
        linkedin_url: { ...dS(), content: profileInfo.linkedin_url },
        gmail_url: { ...dS(), content: profileInfo.gmail_url }
    }

    const [userInputs, dispatch] = useReducer(formReducer, initialState);
    const authState = useSelector((states) => states.authState);

    const isValid = useCallback(() => Object.values(userInputs).every((value) => value.isValid === true), [userInputs]);

    const transformData = () => {
        let inputRaw;
        if (profileInfo.username === userInputs.username.content) {
            const { username, ...otherInp } = userInputs;
            inputRaw = otherInp;
        } else {
            inputRaw = userInputs;
        }


        let formData = new FormData();
        for (let field in inputRaw) {
            const val = inputRaw[field].content ? inputRaw[field].content : "";
            formData.append(field, val)
        }
        return formData;
    };



    const submitHandler = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                const data = transformData();
                const url = `auth/profile/${profileInfo.username}/`;
                baseAxiosInstance.defaults.headers.common["Authorization"] = "Bearer " + authState.access;
                baseAxiosInstance.defaults.headers.common["Content-Type"] = "'multipart/form-data'";

                if (fileRef.current.files.length) data.append("image", fileRef.current.files[0]);
                const resp = await baseAxiosInstance.patch(url, data);

                dispatch_(profileSliceActions.updateUserinfo(resp.data.data));
                setMessage({ state: true, type: "success", message: "profile updated" });
            }
            catch (error) {
                setMessage({ state: true, type: "error", message: "profile update failed" });
            }
        }
        closeHandler(null);
    };

    function showChosenImg(event) {
        const src = URL.createObjectURL(event.target.files[0])
        imgRef.current.src = src
    }

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            <div className={styles.wrapper}>
                <button type="button" onClick={closeHandler}>
                    <IoMdCloseCircle size={30} />
                </button>
                <div className={styles.photo__area}>
                    <div className={styles.design}></div>
                    <div className={styles.empty}></div>
                    <div className={styles.img}>
                        <input ref={fileRef} type="file" onChange={showChosenImg} accept=".png,.jpg" />
                        <img ref={imgRef} src={profileInfo.image} alt="profile" />
                        <span>
                            <TbCameraPlus size={20} />
                        </span>
                        <div className={styles.mask}></div>
                    </div>
                </div>
                <div className={styles.form__area}>
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.first_name}
                        label={"Firstname"}
                        type={"first_name"}
                        validator={textFieldValidator}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.last_name}
                        label={"Lastname"}
                        type={"last_name"}
                        validator={textFieldValidator}
                    />
                    <UserNameField dispatch={dispatch} fieldVal={userInputs.username} />
                    <AreaField dispatch={dispatch}
                        fieldVal={userInputs.bio}
                        label={"bio"}
                        type={"bio"}
                        maxChar={165}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.twitter_url}
                        label={"twitter_url"}
                        type={"twitter_url"}
                        validator={urlFieldValidator("twitter")}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.facebook_url}
                        label={"facebook_url"}
                        type={"facebook_url"}
                        validator={urlFieldValidator("facebook")}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.git_url}
                        label={"github_url"}
                        type={"git_url"}
                        validator={urlFieldValidator("github")}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.gmail_url}
                        label={"gmail_url"}
                        type={"gmail_url"}
                        validator={urlFieldValidator("", true)}
                    />
                    <NamedField dispatch={dispatch}
                        fieldVal={userInputs.linkedin_url}
                        label={"linkedin_url"}
                        type={"linkedin_url"}
                        validator={urlFieldValidator("linkedin")}
                    />

                    <button type="submit">
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
};

export default ProfileForm;