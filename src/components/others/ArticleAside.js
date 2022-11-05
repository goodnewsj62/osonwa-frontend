import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";


import img from "static/images/test_img.jpg";
import RelatedArticles from "./RelatedArticles";
import styles from "./styles/artaside.module.css";

const ArticleAside = (props) => {
    const bio =  true;
    const twitter_url =  true;
    const linkedin_url =true;
    const facebook_url =  true;
    const iconSize =  18;

    return (
        <div className={styles.aside__content}>
            <section className={styles.profile__info} >
                <Link to="">
                    <div className={styles.profile}>
                        <img src={img} alt="creator" />
                        <span>Lorem, ipsum dolor.</span>
                    </div>
                </Link>
                {
                    bio && 
                    <div className={styles.bio}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quia qui non quo nobis impedit?
                    </div>
                }
                <div className={styles.socials}>
                    {twitter_url && <a href="#">  <AiOutlineTwitter size={iconSize} /></a>}
                    {linkedin_url && <a href="#"> <AiFillLinkedin size={iconSize} /></a>}
                    {facebook_url && <a href="#"> <BsFacebook size={iconSize} /></a>}
                </div> 
            </section>
            <div className={styles.related__content}>
                <RelatedArticles />
            </div>
        </div>
    )
};

export default ArticleAside;