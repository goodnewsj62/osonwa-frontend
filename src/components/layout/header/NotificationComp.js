
import AuthPopupModal from "components/others/AuthPopupModal";
import NotificationBoard from "components/others/modal/Notification";
import useCurrentUrlPath from "hooks/currentUrlPath";
import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { resetCount } from "store/notifySlice;";
import useHideOnClickedOutside from "utils/clickedOutside";
import styles from "./styles/nav.module.css";


export default function NotificationComp({ iconSize }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const authState = useSelector((state) => state.authState.state);
    const { unReadCount, result } = useSelector((states) => states.notifyState);

    const modalRef = useHideOnClickedOutside(() => setIsOpen(false));
    const currentPath = useCurrentUrlPath();

    const dispatch = useDispatch();



    useEffect(() => {
        if (isOpen) {
            dispatch(resetCount());
        }
    }, [isOpen, dispatch]);


    //handle --> if the user is not authenticated
    const onClickHandler = () => {
        if (!authState) {
            //check auth state
            setIsOpen(false);
            setLoginModal(true);
        } else {
            setIsOpen((state) => !state)
        }
    };

    const closeLoginPopup = () => setLoginModal(false);


    return (
        <div ref={modalRef} onClick={onClickHandler} className={styles.bell}>
            {unReadCount > 0 && <span> {unReadCount > 10 ? "10+" : unReadCount}</span>}
            <i><FiBell size={iconSize} /></i>
            {isOpen && <NotificationBoard info={result} />}
            {loginModal && <AuthPopupModal hideHandler={closeLoginPopup} next={currentPath} />}
        </div>
    );
};
