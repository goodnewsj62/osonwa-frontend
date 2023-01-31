import DropDownInput from "components/others/forms/DropDownInput";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles/other.module.css";

const OtherInp = () => {

    const tags = ["python", "docker", "jenkins"].map((item) => {
        return (
            <div key={item}>
                {item}
            </div>
        )
    });

    const selected = ["python", "docker", "embedded systems"].map((item) => {
        return (
            <div key={item}>
                <span className={styles.tag__nm}>#{item}</span>
                <span className={styles.rm__tag}>
                    <AiOutlineClose size={17} />
                </span>
            </div>
        )
    });

    return (
        <section className={styles.container} >
            <div className={styles.add__tags}>
                <div className={styles.tag__field}>
                    <label htmlFor="add__tag">
                        Add Tags
                    </label>
                    <div className={styles.suggested__field}>
                        <DropDownInput params={{}} suggestions={tags} />
                    </div>
                </div>
                <div className={styles.selected__tags}>
                    {selected}
                </div>
            </div>
        </section>
    )
};

export default OtherInp;