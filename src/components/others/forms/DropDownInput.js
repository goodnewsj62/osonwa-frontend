import InfinteToFroBar from "../loaders/ToFroBar";
import Input from "./Input";
import styles from "./styles/element.module.css";

const DropDownInput = ({ suggestions, params, createAndAdd, isLoading, show }) => {
    return (
        <div className={styles.field}>
            <Input params={params} />
            <button onClick={createAndAdd} type="button">
                + add
            </button>
            {
                show &&
                <div className={styles.suggested}>
                    <span>
                        {isLoading && <InfinteToFroBar style={{ position: "absolute", top: "0px", left: "0px" }} />}
                    </span>
                    {suggestions}
                </div>
            }
        </div>
    )
};

export default DropDownInput;