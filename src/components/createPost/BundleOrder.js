import { memo } from "react";
import { useMemo } from "react";
import { objectIsEmpty } from "utils/helpers";
import useValidateOrder from "./hooks/validateOrder";
import styles from "./styles/advanced.module.css";



const BundleOrder = ({ dispatch, orderVal, selectedBundle }) => {
    const order_array = useMemo(() => {
        return objectIsEmpty(selectedBundle) ? [] : selectedBundle.taken_order_no;
    }, [selectedBundle]);
    useValidateOrder(orderVal.content, dispatch, order_array)


    const changeHandler = (event) => {
        const val = +event.target.value;
        let num = 0;
        let message = {};

        if (Number.isNaN(val)) {
            message = { error: "this field must be a number", isValid: false };
        } else if (!val) {
            message = { error: "this field cannot be zero or let empty", isValid: false };
        } else {
            num = val;
            message = { isValid: true, error: "" };
        }
        dispatch({ type: "order", payload: { ...message, content: num } });
    };

    const value = orderVal.content ? orderVal.content : "";
    return (
        <div className={styles.num__input}>
            <input type="text" value={value}
                onChange={changeHandler}
                placeholder="enter order number"
                id=""
                disabled={objectIsEmpty(selectedBundle) ? true : false}
            />
            <div className={styles.error}>
                <span>{orderVal.error}</span>
            </div>
        </div>
    )
};


export default memo(BundleOrder);