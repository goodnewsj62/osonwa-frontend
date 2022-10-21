import { IoCloseOutline } from "react-icons/io5";


export default function ErrorContainer({ errorInterphase }) {
    const { errorInfo, setErrorInfo } = errorInterphase;
    return (
        <section aria-label="error tet">
            <button type="button" onClick={() => setErrorInfo((state) => { return { ...state, state: !state.state } })}>
                <IoCloseOutline />
            </button>
            <p>{errorInfo.message}</p>
        </section>
    );
};