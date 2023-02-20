const { default: useAuthAxios } = require("hooks/authAxios");
const { useEffect, useState } = require("react");
const { useSelector } = require("react-redux");
const { useParams } = require("react-router-dom");
const { fetchPost, baseAxiosInstance } = require("utils/requests");


const useFetchDetail = () => {
    const { slug, id } = useParams();
    const axios_ = useAuthAxios();
    const authState = useSelector((states) => states.authState);
    const [post, setPost] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPost_ = fetchPost
        const url = `/blog/post/${slug}/${id}`

        if (authState.state) {
            fetchPost_(axios_, url, setPost, setIsloading, setNotFound);
        } else {
            fetchPost_(baseAxiosInstance, url, setPost, setIsloading, setNotFound);
        }

    }, [id, setIsloading, slug, setPost, setNotFound, authState, axios_]);

    return [post, isLoading, notFound];
}


export default useFetchDetail;