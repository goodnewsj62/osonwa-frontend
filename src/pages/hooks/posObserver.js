const { useEffect } = require("react")


const useObserver = (observerOptions, callable, observedElementRef, isValid) => {

    useEffect(() => {
        const initObserver = () => {
            const observer = new IntersectionObserver(callable, observerOptions);
            observer.observe(observedElementRef.current);
        };


        if (isValid && isValid()) { //optional isValid
            initObserver()
        } else if (!isValid) {
            const observer = new IntersectionObserver(callable, observerOptions);
            observer.observe(observedElementRef.current);
        }

    }, [observerOptions, observedElementRef, callable, isValid]);

    return;
}

export default useObserver;