import { useEffect } from "react";


const useScrollState = (fetchData) => {
    useEffect(() => {
        const scrollHandler = (event) => {
            const targetElement = document.body;
            const totalheight = window.innerHeight + window.scrollY;
            if (totalheight >= targetElement.scrollHeight) {
                fetchData();
            }
        };
        window.onscroll = scrollHandler;

        return () => window.onscroll = null;

    }, [fetchData]);

};

export default useScrollState;