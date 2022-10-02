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


function IconBar({ sideBarState }) {
    const dispatch = useDispatch();
    const iconSize = useContext(DefaultIconSize);


    const hideBarHandler = (event) => {
        dispatch(sideBarActions.show());
    };

    return (
        <div aria-label="icon nav" className={style.icon__bar}>
            <div className={style.curve__top}>
                <div></div>
            </div>
            <ul>
                <li>
                    <ImNewspaper size={iconSize * 0.9} />
                </li>
                <li>
                    <BsBroadcast size={iconSize * 0.9} />
                </li>
                <li onClick={hideBarHandler}>
                    <VscTriangleRight size={iconSize * 1.3} />
                </li>
                <li>
                    <GiNotebook size={iconSize * 0.99} />
                </li>
                <li>
                    <FaBoxOpen size={iconSize * 0.98} />
                </li>
            </ul>
            <div className={style.curve__bottom}>
                <div></div>
            </div>
        </div>
    )
}



export default IconBar;