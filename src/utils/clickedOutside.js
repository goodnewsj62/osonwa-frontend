import { useEffect, useRef } from "react";

const useHideOnClickedOutside = (handlerLogic) => {
    const modalRef = useRef();

    const handler = (event) => {
        if (!modalRef.current.contains(event.target)) {
            handlerLogic()
        }
    }

    useEffect(() => {

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler)
    }, []);

    return modalRef;
};



export default useHideOnClickedOutside;