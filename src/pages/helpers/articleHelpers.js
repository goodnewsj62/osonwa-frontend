export const hideLikeCommentBar = (watchElement) => {
    return (entries, obserer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                watchElement.current.style.display = "None";
            } else {
                watchElement.current.style.display = "flex";
            }
        }
    }
}