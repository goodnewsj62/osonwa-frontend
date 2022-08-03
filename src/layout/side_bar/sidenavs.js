import { ImNewspaper } from "react-icons/im";
import {BsBroadcast} from "react-icons/bs";
import {FaBoxOpen} from  "react-icons/fa";
import {GiNotebook} from "react-icons/gi";
import { TbJumpRope } from "react-icons/tb";


function MainNav(props) {
    const iconSize = 20
    return (
        <nav aria-label="side nav bar">
            <ul>
                <li>
                    <ImNewspaper size={iconSize} /><span></span> News
                </li>
                <li>
                    <BsBroadcast size={iconSize} /> <span></span> Trending
                </li>
                <li>
                    <FaBoxOpen size={iconSize}  /><span></span> Fresh
                </li>
                <li>
                    <GiNotebook size={iconSize} /> <span></span> Articles
                </li>
                <li>
                    <TbJumpRope size={iconSize} /> <span></span> Threads
                </li>
            </ul>
        </nav>
    )
}


function NavOthers(props) {
    return (
        <nav aria-label="other relevant navigation">
            <ul>
                <li>

                </li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </nav>
    )
}


export { NavOthers, MainNav };