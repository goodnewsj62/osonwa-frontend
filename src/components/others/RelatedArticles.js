import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";
import SpreadLoader from "./loaders/SpreadLoader";
import styles from "./styles/relatedArt.module.css";




const RelatedArticles = ({ post }) => {
    const [data, setData] = useState({ posts: [], topic: "" });
    const [isLoading, setIsloading] = useState(true);
    const classFunc = (state) => state.isActive ? `${styles.nav__highlight}` : "";

    useEffect(() => {
        const getBundle = async (bundleID) => {
            try {
                const resp = await baseAxiosInstance.get(`/blog/bundle/${bundleID}/`);
                setData(resp.data.data);
                setIsloading(false);
                return resp
            } catch (err) {
                setIsloading(false);
                return err;
            }
        }

        getBundle(post.bundle);
    }, [post]);

    const articles = data.posts.map((item) => {
        return (
            <li key={item.id}>
                <NavLink to={`/article/${item.slug_title}/${item.post_id}`} className={classFunc}>
                    {item.title}
                </NavLink>
            </li>
        )
    });

    return (
        <>
            {
                !isLoading &&
                <div>
                    <h3>{data.topic}</h3>
                    <ul className={styles.realed__articles}>
                        {articles}
                    </ul>
                </div>
            }
            {isLoading && <span className="loader"><SpreadLoader /></span>}
        </>
    );
};


export default RelatedArticles;