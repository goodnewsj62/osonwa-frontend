import { IoCloseOutline } from "react-icons/io5";
import styles from "./styles/error.module.css";


export default function ErrorContainer({ errorInterphase }) {
    const { errorInfo, setErrorInfo } = errorInterphase;
    return (
        <section aria-label="error text" className={styles.error__div}>
            <button type="button" onClick={() => setErrorInfo((state) => { return { ...state, state: !state.state } })}>
                <IoCloseOutline size={20} />
            </button>
            <p>{errorInfo.message}</p>
        </section>
    );
};