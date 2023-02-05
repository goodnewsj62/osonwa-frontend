import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect } from "react";



const useValidateOrder = (orderNo, dispatch) => {
    const axios_ = useAuthAxios();

    const validateOrderNum = useCallback(async () => {
        try {
            const url = ``;
            const resp = axios_.get(url);
            let message;

            if (resp.data.data.status && orderNo > 0) {
                message = { isValid: true, error: "" };
                dispatch({ type: "order", payload: message });
                return
            }

            message = { isValid: true, error: "another post with this number exists" };
            dispatch({ type: "order", payload: message });

        } catch (err) {
            const message = { isValid: false, error: "" };
            dispatch({ type: "order", payload: message });
        }
    }, [orderNo, dispatch, axios_])

    useEffect(() => {
        validateOrderNum()
    }, [orderNo, validateOrderNum]);
};

export default useValidateOrder;