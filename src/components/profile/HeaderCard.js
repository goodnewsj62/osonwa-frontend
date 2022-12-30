import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import { HiPencil } from "react-icons/hi";
import SocialAccounts from "./SocialAccounts";
import TagSlide from "./TagsSlide";
import styles from "./styles/profile.module.css";
import img from "static/images/test_img.jpg";

const ProfileHeader = (props) => {
    const iconSize = useContext(DefaultIconSize);

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <span></span>
                <div className={styles.profile__img}>
                    <img src={img} alt="profile" />
                </div>
                <div className={`${styles.edit__button}`}>
                    <button onClick={() => { }}>
                        <span>
                            Edit Profile
                        </span>
                        <i>
                            <HiPencil size={20} />
                        </i>
                    </button>
                </div>
            </div>
            <div className={styles.bio}>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, suscipit perspiciatis aliquid nam ad aliquam dolores tempore magni, laboriosam amet vitae minus sunt praesentium quod? Fugit cupiditate consequuntur accusantium ad?
                </p>
            </div>
            <div className={styles.social__acc}>
                <SocialAccounts />
            </div>
            <div className={styles.tags}>
                <h5>Interests</h5>
                <button className="add__tag" type="button">
                    <BsPlusCircleFill size={iconSize} />
                </button>
                <TagSlide />
            </div>
        </section>
    )
};



export default ProfileHeader;