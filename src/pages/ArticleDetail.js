import ArticleAside from "components/others/ArticleAside";
import DetailHeader from "components/others/DetailHeader";
import ImgTitle from "components/others/ImgTitle";
import Main from "components/others/MainWrapper";



const ArticleDetail =  (props)=>{
    const content =  {src:"", creator: "", pubDate:"", profLink:""}
    return (
        <Main >
            <section aria-label="main content" className="">
                <DetailHeader template={content} />
                <ImgTitle src={""} title={""} />
                <p >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ut ea vitae dicta distinctio dolore nulla sint assumenda id eius, vel, magni nisi? Error maiores tenetur qui voluptatum, reprehenderit quibusdam quos harum tempora enim! Exercitationem, tempore, sint iste excepturi nihil adipisci eum dolor, ullam hic neque tenetur sequi aliquam harum?
                </p>
                <Comments />
            </section>
            <div className="like__comment">

            </div>
            <aside className="">
                <ArticleAside />
            </aside>
        </Main>
    );
};

export default ArticleDetail;