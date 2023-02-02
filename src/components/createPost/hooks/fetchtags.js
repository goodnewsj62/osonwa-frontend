import { useCallback, useEffect, useState } from "react";
import { deBounce } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";



const useFetchTags = (inputValue) => {
    const [fetchedTags, setFetchedTags] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const fetchMatchedTags = useCallback(async () => {
        try {
            const url = `/blog/tag/search/?keyword=${inputValue}`;
            const resp = await baseAxiosInstance.get(url)
            setFetchedTags(resp.data.data);
        } catch (err) { }

        setIsloading(false);
    }, [inputValue])

    useEffect(() => {
        setIsloading(true);
        deBounce(fetchMatchedTags, 1500)()
    }, [inputValue, fetchMatchedTags]);

    return [fetchedTags, isLoading]
};

export default useFetchTags;