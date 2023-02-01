import DropDownInput from "components/others/forms/DropDownInput";
import { AiFillInfoCircle } from "react-icons/ai";
import { GoTriangleLeft } from "react-icons/go";

import styles from "./styles/advanced.module.css";

const BundleOptions = () => {
    return (
        <div className={styles.bundles}>
            <div className={styles.info}>
                <span>
                    <AiFillInfoCircle size={25} />
                </span>
                <div className={styles.message}>
                    <span><GoTriangleLeft size={20} /></span>
                    <p>Closely related articles can be ordered sequentially and grouped as a bundle.</p>
                </div>
            </div>
            <div className={styles.select__bundle}>
                <div className={styles.select__bundles} >
                    <DropDownInput params={{ placeholder: "find or create bundle" }}
                        suggestions={["python"]}
                    />
                </div>
                <input type="text" placeholder="enter order number " id="" />
            </div>
        </div>
    )
};

export default BundleOptions;