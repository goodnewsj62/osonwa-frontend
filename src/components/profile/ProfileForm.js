import AreaField from "components/others/forms/AreaField";
import NamedField from "components/others/forms/NamedField";
import { useCallback, useReducer } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbCameraPlus } from "react-icons/tb";
import {  useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";
import { textFieldValidator, urlFieldValidator } from "utils/validators";
import UserNameField from "./profileForm/UserNameField";

import styles from "./styles/edit.module.css";


const dS = () => ({ content: "", isValid: true, error: "" } );


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



const ProfileForm =  ({closeHandler, setMessage})=>{
    const profileInfo =  useSelector((states)=>states.profileState.userInfo);

    const initialState = {
        username: {...dS(),  content:profileInfo.username}, 
        first_name: {...dS(),  content:profileInfo.first_name}, 
        last_name: {...dS(), content:profileInfo.last_name}, 
        bio: {...dS(),  content:profileInfo.bio }, 
        twitter_url:{...dS(), content:profileInfo.twitter_url},
        facebook_url: {...dS(), content: profileInfo.facebook_url},
        git_url:{...dS(),content: profileInfo.git_url},
        linkedin_url: {...dS(), content:profileInfo.linkedin_url},
        gmail_url:{...dS(),content:profileInfo.gmail_url }
    }

    const [userInputs, dispatch]  =  useReducer(formReducer,initialState);

    const isValid = useCallback(() => Object.values(userInputs).every((value) => value.isValid === true), [userInputs]);

    const transformData = ()=>{
        if(profileInfo.username === userInputs.username){
            const {_, ...data } = userInputs;
            return data
        }
        return userInputs
    };



    const submitHandler = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                const data =  transformData();
                const url = `auth/profile/${profileInfo.username}/`;
                const resp = await baseAxiosInstance.patch(url, data);
                if(resp.status >= 200)setMessage({state:true,type:"success", message:"profile updated"});
            }
            catch (error) {
                setMessage({state:true,type:"error", message:"profile update failed"});
            }
        }
        closeHandler(null);
    };


    return(
        <form onSubmit={submitHandler} className={styles.container}>
            <button type="button" onClick={closeHandler}>
                <IoMdCloseCircle size={30} />
            </button>
            <div className={styles.photo__area}>
                <div className={styles.design}></div>
                <div className={styles.empty}></div>
                <div className={styles.img}>
                    <input type="file" accept=".png,.jpg" />
                    <img src={profileInfo.image} alt="profile" />
                    <span>
                        <TbCameraPlus size={20} />
                    </span>
                    <div className={styles.mask}></div>
                </div>
            </div>
            <div className={styles.form__area}>
                <NamedField  dispatch={dispatch}
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
                <AreaField  dispatch={dispatch} 
                    fieldVal={userInputs.bio} 
                    label={"bio"} type={"text"} 
                    maxChar={165}
                />
                <NamedField dispatch={dispatch} 
                    fieldVal={userInputs.twitter_url} 
                    label={"twitter_url"} 
                    type={"twitter_url"}  
                    validator={urlFieldValidator}
                />
                <NamedField dispatch={dispatch} 
                    fieldVal={userInputs.facebook_url} 
                    label={"facebook_url"} 
                    type={"facebook_url"} 
                    validator={urlFieldValidator}
                />
                <NamedField dispatch={dispatch} 
                    fieldVal={userInputs.git_url} 
                    label={"git_url"} 
                    type={"git_url"}  
                    validator={urlFieldValidator}
                />
                <NamedField dispatch={dispatch} 
                    fieldVal={userInputs.gmail_url} 
                    label={"gmail_url"} 
                    type={"gmail_url"} 
                    validator={urlFieldValidator}
                />
                <NamedField dispatch={dispatch} 
                    fieldVal={userInputs.linkedin_url} 
                    label={"linkedin_url"} 
                    type={"linkedin_url"} 
                    validator={urlFieldValidator}
                />

                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    )
};

export default ProfileForm;