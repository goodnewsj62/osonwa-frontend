import Input from "components/auth/Input";
import styles from "./styles/fields.module.css";

export default function TextField({ fieldVal, label, params, customClasses }) {
    const { name = "" } = params;
    const spanClasses = fieldVal.error ? `${styles.error__info} ${styles.show__error}` : `${styles.error__info}`;

    return (
        <div className={`${customClasses ? customClasses : styles.form__div}`}>
            <label htmlFor={name}>
                {label}
            </label>
            <Input params={params} />
            <span className={customClasses ? "" : spanClasses}>{fieldVal.error}</span>
        </div>
    )
};