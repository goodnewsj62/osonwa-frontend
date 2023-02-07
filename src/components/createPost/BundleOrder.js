import { useMemo } from "react";
import { useState } from "react";
import { objectIsEmpty } from "utils/helpers";
import useValidateOrder from "./hooks/validateOrder";
import styles from "./styles/advanced.module.css";



export default function BundleOrder({dispatch, orderVal, selectedBundle}){
    const [orderNo, setOrderNo] =  useState(0);
    const order_array = useMemo(()=>{
        return objectIsEmpty(selectedBundle)? [] : selectedBundle.taken_order_no;
    },[selectedBundle]);
    useValidateOrder(orderNo,dispatch, order_array)
    

    const changeHandler =  (event)=>{
        const val =  +event.target.value;
        let num = 0;

        if(Number.isNaN(val)){
            const message =  {error:"this field must be a number", isValid:false};
            dispatch({type:"order",  payload:message});
        }else if(!val){
            const message =  {error:"this field cannot be zero or let empty", isValid:false};
            dispatch({type:"order",  payload:message});
        }else{ 
            num =  val; 
            dispatch({type:"order", payload:{isValid:true,  error:"", content:num}});
        }
        setOrderNo(num);
    };

    const value = orderNo? orderNo : "";
    return(
        <div className={styles.num__input}>
            <input type="text" value={value} 
                onChange={changeHandler} 
                placeholder="enter order number"
                id=""
                disabled={objectIsEmpty(selectedBundle)? true: false}
                />
            <div className={styles.error}>
                <span>{orderVal.error}</span>
            </div>
        </div>
    )
};