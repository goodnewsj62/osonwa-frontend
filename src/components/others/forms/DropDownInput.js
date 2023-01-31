import Input from "./Input";
import styles from "./styles/element.module.css";

const DropDownInput = ({ suggestions, params }) => {
    return (
        <div className={styles.field}>
            <Input params={params} />
            <button type="button">
                + add
            </button>
            <div className={styles.suggested}>
                {suggestions}
            </div>
        </div>
    )
};

export default DropDownInput;