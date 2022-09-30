import styles from "./styles/ToggleMode.module.css";


function ChangeApperance({ setShow, mode, ...others }) {
    const darkMode = null;
    const toggleMode = (e) => { };
    return (
        <div className={`${styles.appearance} appearance`} onClick={(e) => { toggleMode(e) }} >
            <span>Apperance</span>
            <button type="button" className={`${darkMode ? styles.border__highlight : ''}`}>
                <span className={`${styles.ball} ${darkMode ? styles.ball__shift : ''}`}></span>
            </button>
        </div>
    )
}


export default ChangeApperance;