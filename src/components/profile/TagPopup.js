import Cover from 'components/others';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import TagChoice from './TagChoice';



export default function TagPopup(props) {
    const authState = useSelector((state) => state.authState.state);
    const [closeTagModal, setCloseTagModal] = useState(false);
    const [hasChoosenTags, setHasChoosenTags] = useState(true);
    const popUpState = props.show;


    useEffect(() => {
        const tagStatus = localStorage.getItem("tagStatus");
        if (tagStatus !== "true") setHasChoosenTags(false);
    }, []);

    useEffect(() => {
        if (popUpState) setHasChoosenTags(false);
        else setHasChoosenTags(true);
    }, [popUpState]);

    const setHasPickedTags = () => {
        if (popUpState) props.setShow(false);
        setCloseTagModal(true);
        setHasChoosenTags(true);
        localStorage.setItem("tagStatus", "true");
    };

    const hideHandler = (e) => {
        if (popUpState) props.setShow(false);
        setCloseTagModal(true);
    }


    if (!hasChoosenTags && authState && !closeTagModal) {
        return (
            <>
                {ReactDOM.createPortal(<TagChoice setHasPickedTags={setHasPickedTags} hasChoosenTags={hasChoosenTags} hideHandler={hideHandler} />, document.getElementById("auth__div"))}
                {ReactDOM.createPortal(<Cover hideHandler={hideHandler} />, document.getElementById("mask"))}
            </>
        );
    }

    return <></>
};