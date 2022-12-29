import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

const ProfileHeader = (props) => {
    const iconSize = useContext(DefaultIconSize);

    return (
        <section>
            <div className="header">
                <div className="profile__img">
                    <img src={``} alt="profile" />
                </div>
                <div className="edit__button">
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
            <div className="bio">
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, suscipit perspiciatis aliquid nam ad aliquam dolores tempore magni, laboriosam amet vitae minus sunt praesentium quod? Fugit cupiditate consequuntur accusantium ad?
                </p>
            </div>
            <div className="social__acc">
                <a href="" target="_blank"></a>
                <a href="" target="_blank"></a>
                <a href="" target="_blank"></a>
            </div>
            <div className="tags">
                <h5>Interests</h5>
                <button className="add__tag" type="button">
                    <BsPlusCircleFill size={iconSize} />
                </button>
                {/* <TagSlide /> */}
            </div>
        </section>
    )
};



export default ProfileHeader;