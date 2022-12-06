const { useEffect } = require("react")


const useObserver = (observerOptions, callable, observedElementRef) => {

    console.log(callable, observerOptions)
    useEffect(() => {
        const observer = new IntersectionObserver(callable, observerOptions);
        observer.observe(observedElementRef.current);
    }, [observerOptions, observedElementRef, callable]);

    return;
}

export default useObserver;