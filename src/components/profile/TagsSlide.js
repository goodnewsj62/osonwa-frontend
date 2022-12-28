



const TagSlide = (props) => {
    return (
        <div className="tags">
            <button className="left" type="button">
                <FaAngleLeft size={iconSize} />
            </button>
            <div className="slide">
                <div className="tag">
                    <Link to="/" >Python</Link>
                </div>
                <div className="tag">
                    <Link to="/" >3D Printing</Link>
                </div>
                <div className="tag">
                    <Link to="/" >JavaScript</Link>
                </div>
                <div className="tag">
                    <Link to="/" >Gaming</Link>
                </div>
                <div className="tag">
                    <Link to="/" >Software</Link>
                </div>
            </div>
            <button className="right" type="button">
                <FaAngleRight size={iconSize} />
            </button>
        </div>
    )
};

export default TagSlide;