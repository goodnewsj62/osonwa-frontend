
import { AiFillHeart } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";

import style from "./styles/NormalCardAction.module.css";



function NormalCardAction({ iconSize }) {
    return (
        <div className={style.user__actions}>
            <div className={style.pub__date}>
                <BsDot className={style.bs__dot} size={30} />
                <span id="pub__date" >30 mins ago</span>
            </div>
            <ul>
                <li>
                    <div>
                        <BiMessageSquareDetail size={iconSize} />
                    </div>
                    <div>
                        800
                    </div>
                </li>
                <li>
                    <div>
                        <AiFillHeart size={iconSize} />
                    </div>
                    <div>
                        300
                    </div>
                </li>
                <li>
                    <div>
                        <RiShareForwardFill size={iconSize} />
                    </div>
                </li>
            </ul>
        </div>
    );
};



export default NormalCardAction;