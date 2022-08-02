import { BsCloudSun } from "react-icons/bs";
import {IoCloudyNightOutline} from "react-icons/io5";
import { FcLike, FcFolder} from "react-icons/fc";


function ProfileNav(props){
    return(
        <nav aria-label="profile navigation" className="profile__options">
                <div className="profile__sec">
                    <div className="img__wrapper">
                        <img src="" alt="" />
                        <h2 className="first__letter">O</h2>
                    </div>
                    <div className="greeting">
                        <h4>Hi Osonwa</h4>
                        <p>
                            Good Morning!
                            <span></span>
                            <BsCloudSun className="morning__sun" />
                            <IoCloudyNightOutline className="evening_time" />
                        </p>
                    </div>
                </div>
                <div className="demacation"></div>
                <ul>
                    <li>Profile</li>
                    <li>Edit Profile</li>
                    <li>Posts</li>
                    <li>social accounts</li>
                </ul>
                <div className="demacation"></div>
                <ul className="previous__actions">
                    <li>
                        <FcFolder />
                        <p>Saved</p>
                    </li>
                    <li>
                        <FcLike />
                        <p>liked</p>
                    </li>
                </ul>
                <div className="demacation"></div>
                <ul className="nav__last">
                    <li>
                        <div className="appearance">
                            <span>apperance</span>
                            <div className="toggle__apperance">
                                <input type="checkbox" name="" id="mode" />
                                <label htmlFor="mode">
                                    <span className="mode__ball"></span>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>Logout</li>
                </ul>
            </nav>
    )
}




function Profile(props){
    return (
        <div className="profile__div">
            <div className="profile__img">
                <img src="" alt="" />
                <h2></h2>
            </div>
            <ProfileNav />
        </div>
    )
}



export default Profile;