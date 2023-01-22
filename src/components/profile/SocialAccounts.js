import { DefaultIconSize } from "components/wrappers/IconSize";
import { memo, useContext } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./styles/profile.module.css";



const SocialAccounts = ({ profileInfo }) => {
    const iconSize = useContext(DefaultIconSize);
    const {
        twitter_url,
        facebook_url,
        gmail_url,
        linkedin_url,
        git_url } = profileInfo;
    return (
        <div className={styles.socials}>
            {facebook_url && <a href={facebook_url} target="_blank" rel="noreferrer noopener"><FaFacebookF size={iconSize} /></a>}
            {twitter_url && <a href={twitter_url} target="_blank" rel="noreferrer noopener"><BsTwitter size={iconSize} /></a>}
            {gmail_url && <a href={gmail_url} target="_blank" rel="noreferrer noopener"><FcGoogle size={iconSize} /></a>}
            {linkedin_url && <a href={linkedin_url} target="_blank" rel="noreferrer noopener" ><BsLinkedin size={iconSize} /></a>}
            {git_url && <a href={git_url} target="_blank" rel="noreferrer noopener"><BsGithub size={iconSize} /></a>}
        </div>
    );
};

export default memo(SocialAccounts);