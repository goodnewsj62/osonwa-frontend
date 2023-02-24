import useAuthAxios from "hooks/authAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "utils/requests";


const useFetchAggDetail = () => {
    const { type, slug, id } = useParams();
    const axios_ = useAuthAxios();
    const [post, setPost] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPost_ = fetchPost
        const url = type === "news" ? `/news/${slug}/${id}` : `/article/${slug}/${id}`;

        fetchPost_(axios_, url, setPost, setIsloading, setNotFound);

    }, [id, setIsloading, slug, setPost, setNotFound, type, axios_]);

    return [post, isLoading, notFound, type];
};

export default useFetchAggDetail;