import img from "static/images/test_img.jpg";


const ImgTitle = (props)=>{
    return (
        <div className="">
            <img src={img} alt="featured img" />
            <div className="title__div">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci quae tenetur obcaecati molestias illum saepe quod dolore, totam alias magni porro iusto. Ducimus nostrum in soluta quam magnam tenetur?</h1>
                <p className="mob__warning">
                    click the arrow at the right side to see the list of content
                </p>
            </div>
        </div>
    );
};


export default ImgTitle;
