import { useCallback, useEffect } from "react";



const useValidateOrder = (orderNo, dispatch, order_array) => {

    const validateOrderNum = useCallback(() => {
        let message;

        if (order_array.indexOf(orderNo) === -1 && orderNo > 0) {
            message = { isValid: true, error: "" };
            dispatch({ type: "order", payload: message });
        } else if (order_array.length < 1) {
            message = { isValid: false, error: "" };
            dispatch({ type: "order", payload: message });
        }
        else if (order_array.indexOf(orderNo) !== -1) {
            message = { isValid: false, error: "another post with this number exists" };
            dispatch({ type: "order", payload: message });
        }


    }, [orderNo, dispatch, order_array])


    useEffect(() => {
        validateOrderNum()
    }, [orderNo, validateOrderNum]);
};

export default useValidateOrder;