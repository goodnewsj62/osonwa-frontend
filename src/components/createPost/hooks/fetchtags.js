import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deBounce } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";



const useFetchTags = (inputValue, url_, query = "") => {
    const [fetchedTags, setFetchedTags] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const authState = useSelector((states) => states.authState);
    if (authState.access) baseAxiosInstance.defaults.headers.common["Authorization"] = "Bearer " + authState.access;

    const fetchMatchedTags = useCallback(async () => {
        try {
            const url = query ? (url_ + query) : `${url_}${inputValue}`;

            const resp = await baseAxiosInstance.get(url)
            setFetchedTags(resp.data.data);
        } catch (err) { }

        setIsloading(false);
    }, [inputValue, url_, query])

    useEffect(() => {
        setIsloading(true);
        deBounce(fetchMatchedTags, 1500)()
    }, [inputValue, fetchMatchedTags]);

    return [fetchedTags, isLoading]
};

export default useFetchTags;