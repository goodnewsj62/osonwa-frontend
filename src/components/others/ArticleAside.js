import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";


import { imageOrDefault, imgErrorHandler } from "utils/helpers";
import RelatedArticles from "./RelatedArticles";
import styles from "./styles/artaside.module.css";

const ArticleAside = ({ post }) => {
    const bio = post.author.profile.bio;
    const twitter_url = post.author.profile.twitter_url;
    const linkedin_url = post.author.profile.linkedin_url;
    const facebook_url = post.author.profile.facebook_url;
    const iconSize = 18;

    return (
        <div className={styles.aside__content}>
            <section className={styles.profile__info} >
                <Link to={`/${post.author.username}`}>
                    <div className={styles.profile}>
                        <img src={imageOrDefault(post.author.profile.image)} onError={imgErrorHandler} alt="creator" />
                        <span>{post.author.first_name + " " + post.author.last_name}</span>
                    </div>
                </Link>
                {
                    bio &&
                    <div className={styles.bio}>
                        {bio}
                    </div>
                }
                <div className={styles.socials}>
                    {twitter_url && <a href={twitter_url}>  <AiOutlineTwitter size={iconSize} /></a>}
                    {linkedin_url && <a href={linkedin_url}> <AiFillLinkedin size={iconSize} /></a>}
                    {facebook_url && <a href={facebook_url}> <BsFacebook size={iconSize} /></a>}
                </div>
            </section>
            <div className={styles.related__content}>
                <RelatedArticles post={post} />
            </div>
        </div>
    )
};

export default ArticleAside;