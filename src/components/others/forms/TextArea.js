import Area from "./Area";
import styles from "./styles/fields.module.css";


const TextArea = ({ fieldVal, label, params, maxChar, customClasses }) => {
    const { name = "" } = params;
    const spanClasses = fieldVal.error ? `${styles.error__info} ${styles.show__error}` : `${styles.error__info}`;

    return (
        <div className={`${customClasses ? customClasses : styles.form__div}`}>
            {maxChar && <div className={styles.char__count}>{fieldVal.content.length}/{maxChar}</div>}
            <label htmlFor={name}>
                {label}
            </label>
            <Area params={params} />
            <span className={customClasses ? "" : spanClasses}>{fieldVal.error}</span>
        </div>
    )
};

export default TextArea;