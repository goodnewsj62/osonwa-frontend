import { VscTriangleRight } from "react-icons/vsc";
import { ImNewspaper } from "react-icons/im";
import { BsBroadcast } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

import style from "./styles/iconbar.module.css";
import { useDispatch } from "react-redux";
import sideBarActions from "store/SideBarSlice";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";
import { NavLink } from "react-router-dom";


function IconBar({ sideBarState }) {
    const dispatch = useDispatch();
    const iconSize = useContext(DefaultIconSize);


    const hideBarHandler = (event) => {
        dispatch(sideBarActions.show());
    };

    const classes = (navState) => navState.isActive ? style.active : "";

    return (
        <div aria-label="icon nav" className={style.icon__bar}>
            <div className={style.curve__top}>
                <div></div>
            </div>
            <ul>
                <li>
                    <NavLink className={classes} to="/">
                        <ImNewspaper size={iconSize * 0.9} />
                    </NavLink>
                    <span> feed</span>
                </li>
                <li>
                    <NavLink className={classes} to="/trending"> <BsBroadcast size={iconSize * 0.9} /></NavLink>
                    <span>trending</span>
                </li>
                <li style={{ cursor: "pointer" }} onClick={hideBarHandler}>
                    <VscTriangleRight size={iconSize * 1.3} />
                </li>
                <li>
                    <NavLink className={classes} to="/articles" >
                        <GiNotebook size={iconSize * 0.99} />
                    </NavLink>
                    <span>articles</span>
                </li>
                <li>
                    <NavLink className={classes} to="/fresh" >
                        <FaBoxOpen size={iconSize * 0.98} />
                    </NavLink>
                    <span>fresh</span>
                </li>
            </ul>
            <div className={style.curve__bottom}>
                <div></div>
            </div>
        </div>
    )
}



export default IconBar;