import axios from "axios";
import { useEffect, useState } from "react";

function useAxios({ url, ...kwargs }) {
    const [respInfo, setRespInfo] = useState({});

    const [data, headers] = extractHeaderAndDataOrSetDefault(kwargs);

    useEffect(() => {
        makeRequest({ setRespInfo, url, ...kwargs, data, headers });
    }, [url])


    return [respInfo]
}


function extractHeaderAndDataOrSetDefault(kwargs) {
    const data = kwargs.data ? kwargs.data : {};
    const extraHeaders = kwargs.headers ? kwargs.headers : {}
    const headers = {
        "Authorization": "Bearer ",
        "content-type": "application/json",
        ...extraHeaders
    }
    return [data, headers]
}

async function makeRequest({ setRespInfo, url, ...kwargs }) {
    try {
        const response = await axios.request(
            {
                method: kwargs.method ? kwargs.method : "get",
                baseURL: "",
                url: url,
                data: {
                    ...kwargs.data
                },
                headers: kwargs.headers
            }
        );

        setRespInfo({ status: response.status, data: response.data });
    } catch (error) {
        setErrors(error, setRespInfo);
    }
}


function setErrors(error, setRespInfo) {
    if (error.response) {
        setRespInfo({ status: error.response.status, data: error.response.data });
    } else if (error.request) {
        // setRespInfo({ status: , data: {}});
        console.log(error.request)  // set status as request timeout
    } else {
        console.log(error.message);
    }
}

const baseAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKED_URL,
    headers: { "Content-Type": "application/json" }
});


export { useAxios, baseAxiosInstance };