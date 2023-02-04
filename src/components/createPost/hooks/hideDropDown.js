import { useEffect } from "react";


const useHideDropdownOnClickOustside = (elementID,setShowhints)=>{
    useEffect(() => {
        const handler = (event) => {
            if (!event.target.closest(elementID)) setShowhints(false);
        }
        document.addEventListener("click", handler);

        return () => document.removeEventListener("click", handler);
    }, [setShowhints,elementID]);
};

export default useHideDropdownOnClickOustside;