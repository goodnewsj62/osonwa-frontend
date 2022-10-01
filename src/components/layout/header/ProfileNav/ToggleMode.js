import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import modeSliceActions from "store/modeSlice";
import styles from "./styles/ToggleMode.module.css";



function ChangeApperance({ setShow, mode, ...others }) {
    const currentMode = useSelector((state) => state.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("mode", currentMode);
    }, [currentMode, dispatch]);

    const toggleModeHandler = (event) => {
        dispatch(modeSliceActions.toggleMode());
    };

    const borderHighlight = currentMode === "dark" ? styles.border__highlight : '';
    const moveBall = currentMode === "dark" ? styles.ball__shift : '';

    return (
        <div className={`${styles.appearance} appearance`} onClick={toggleModeHandler} >
            <span>Apperance</span>
            <button type="button" className={`${borderHighlight}`}>
                <span className={`${styles.ball} ${moveBall}`}></span>
            </button>
        </div>
    );
};

export default ChangeApperance;