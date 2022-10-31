

const TagDiv =  (props)=>{
    const fetchedTags = (
        <>
            <div className="tag">Python</div>
            <div className="tag">Javascript</div>
            <div className="tag">Beginner stuff</div>
        </>
    );
    return(
        <div className="label">
            <div className="tags">
                {fetchedTags}
            </div>
        </div>
    )
};


export default TagDiv;