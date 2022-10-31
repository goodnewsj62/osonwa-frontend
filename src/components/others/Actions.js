
import { useContext } from "react";
import { RiShareForwardFill } from "react-icons/ri";
import { DefaultIconSize } from "components/wrappers/IconSize";
import CommentComp from "./CommentComp";
import Likes from "./Likes";
import StarComp from "./StarComp";
import styles from "./styles/actioncomp.module.css";



const ListCardAction =  (prop)=>{
    const iconSize = useContext(DefaultIconSize);

    return(
        <div className={styles.enclosement}>
            <CommentComp />
            <Likes />
            <div className="">
                <RiShareForwardFill size={iconSize} />
            </div>
            <StarComp />
        </div>
    );
};


export default ListCardAction;