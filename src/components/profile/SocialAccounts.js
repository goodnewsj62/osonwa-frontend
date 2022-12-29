import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./styles/profile.module.css";



const SocialAccounts = (props)=>{
    const iconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.socials}>
            <a href="" target="_blank"><FaFacebookF size={iconSize} /></a>
            <a href="" target="_blank"><BsTwitter size={iconSize} /></a>
            <a href="" target="_blank"><FcGoogle size={iconSize} /></a>
            <a href="" target="_blank"><BsLinkedin size={iconSize} /></a>
            <a href="" target="_blank"><BsGithub size={iconSize} /></a>
        </div>
    );
};

export default SocialAccounts;