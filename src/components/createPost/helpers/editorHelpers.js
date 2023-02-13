import { HiCheck } from "react-icons/hi";
import { RiLoader3Line } from "react-icons/ri";
import styles from "../styles/form.module.css";



export const determine_status_text = (status) => {
    if (["saved", "saving"].indexOf(status) === -1) return "";
    else if (status === "saving") return status + "...";
    return status;
};


export const getStatusLoader = (status) => {
    const mapping = new Map([
        ["saved",
            (
                <span className={styles.saved}>
                    <HiCheck size={22} />
                </span>
            )
        ],
        ["saving",
            (
                <span className={styles.saving}>
                    <RiLoader3Line size={22} />
                </span>
            )
        ],
        ["clear", <></>]
    ]
    )
    return mapping.get(status);
}
