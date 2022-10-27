import Input from "../Input";
import styles from "../styles/loginform.module.css";


export default function DefaultField({ fieldVal, label, params }) {
    const { name = "" } = params;
    const spanClasses = fieldVal.error ? `${styles.error__info} ${styles.show__error}` : `${styles.error__info}`;
    return (
        <div className={`${styles.form__div}`}>
            <label htmlFor={name}>
                {label}
            </label>
            <Input params={params} />
            <span className={spanClasses}>{fieldVal.error}</span>
        </div>
    )
};