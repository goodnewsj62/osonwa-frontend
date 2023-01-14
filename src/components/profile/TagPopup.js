import Cover from 'components/others';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import TagChoice from './TagChoice';



export default function TagPopup(props){
    const authState =  useSelector((state)=>state.authState.state);
    const [closeTagModal, setCloseTagModal] =  useState(false);
    const [hasChoosenTags, setHasChoosenTags] = useState(true);


    useEffect(() => {
        const tagStatus = localStorage.getItem("tagStatus");

        if (tagStatus !== "true") setHasChoosenTags(false);

    }, []);

    const setHasPickedTags =  ()=>{
        setCloseTagModal(true);
        setHasChoosenTags(true);
        localStorage.setItem("tagStatus", "true");
    };

    const hideHandler =  (e)=>{
        setCloseTagModal(true);
    }

    console.log(hasChoosenTags, authState, closeTagModal)

    // if(!hasChoosenTags && authState && !closeTagModal){
    if(true){
        return(
            <>
                {ReactDOM.createPortal(<TagChoice setHasPickedTags={setHasPickedTags} hideHandler={hideHandler} />,document.getElementById("auth__div"))}
                {ReactDOM.createPortal(<Cover hideHandler={hideHandler} />,document.getElementById("mask"))}
            </>
        );
    }

    return <></>
};