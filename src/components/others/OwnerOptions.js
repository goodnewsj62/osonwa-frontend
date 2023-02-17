import { DefaultIconSize } from "components/wrappers/IconSize";
import { useState } from "react";
import { useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import CenterMessagePopup from "components/others/MessageCentral";

import styles from "./styles/owneropt.module.css";



const OwnerOptions =  ({editUrl, postID, message})=>{
    const [showNav, setShowNav] = useState(false);
    const [warning, setWarning] = useState(false);
    const iconSize =  useContext(DefaultIconSize);

    const handleClick = ()=> setShowNav((state)=> !state);
    const handleDelete =  ()=> setWarning(true);
    const deleteInfo = "This action will be permanent and cannot be reversed. Are you sure you want to go ahead?"
    const affirmHandler =  ()=>{
        message("delete",postID); 
        setWarning(false)
    };



    return (
        <>
            <div className={styles.container}>
                <span onClick={handleClick}>
                    <BsThreeDots size={iconSize} />
                </span>
                {showNav && 
                    <ul>
                        <li onClick={handleDelete}>
                            <div>
                                <span><RiDeleteBin6Line size={iconSize} /></span>
                                <span>Delete</span>
                            </div>
                        </li>
                        <li>
                            <Link to={`/${editUrl}`} >
                                <span><FiEdit size={iconSize} /></span>
                                <span>Edit</span>
                            </Link>
                        </li>
                    </ul>
                }
            </div>
            {warning && 
                <CenterMessagePopup 
                                message={deleteInfo} 
                                affirmHandler={affirmHandler}
                                hideHandler={()=>setWarning(false)}
                    />
            }
        </>
    )
};
export default  OwnerOptions;