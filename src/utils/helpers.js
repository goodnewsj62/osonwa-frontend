import { saveAuthToken } from "store/authSlice";
import { baseAxiosInstance } from "./requests";
import image from "static/images/test_img.jpg";


function parseJwt(token = "") {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}




function isExpired(js_object) {
    try {
        return isExpiredLoic(js_object)
    } catch (err) {
        throw new Error(err)
    } finally {
        return [true, true]
    }
}


function isExpiredLoic(js_object) {
    const exp = new Date(js_object["exp"] * 1000);
    const today = new Date();
    const next_two_days = new Date();
    next_two_days.setDate(today.getDay + 2);

    const has_expired = exp - today < 1 ? true : false;
    const soon_expire = exp - next_two_days < 1 ? true : false;
    return [has_expired, soon_expire]
}


function setAuthBasedOnRefreshToken({ setAuth, tokenHasExpired, tokenSoonExpire, refreshHasExpired }) {
    if (!tokenHasExpired && !tokenSoonExpire) {
        setAuth(true)
    }
    else if (!tokenHasExpired && tokenSoonExpire) {
        setAuth(true)
        requestNewTokens(setAuthAndStorage()) // setAuth is not passed so a rerender do not happen
    } else if (tokenHasExpired && !refreshHasExpired) {
        requestNewTokens(setAuthAndStorage(setAuth))
    }
}


async function requestNewTokens(callback) {
    const response = await baseAxiosInstance.post("/auth/refresh", { refresh: localStorage.getItem("refreshToken") });
    if (response.status < 300) {
        callback(response.data.data["access"], response.data.data["refresh"])
    }
}


const setAuthAndStorage = (setAuth) => {
    return (accessToken, refreshToken) => {
        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            if (setAuth) setAuth(true);
        }
    }
}



function forwardDebounce(callback, timeout = 300) {
    // after first call timer is set to a value so callback is not called again until timeout
    //then it is undefined
    let timer;
    return (...args) => {
        if (!timer) {
            callback(args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => { timer = undefined }, timeout);
    }
}


function deBounce(callback, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback(...args) }, timeout);
    }
}


function authenticateUserAndRedirect(data, dispatch, navigate, locationInfo) {
    dispatch(saveAuthToken(data));
    if (locationInfo && "next" in locationInfo) {
        navigate(`/${locationInfo.next}`);
    } else {
        navigate("/");
    }
}

function extractErrorMessages(message, fields, setFieldError, genError) {
    for (let key in message) {
        const err = message[key];
        if (fields.indexOf(key) !== -1) {
            setFieldError(key, err);
        } else {
            genError(err);
        }
    }
}

export function axiosFormErrorHandler(error, fields, handleFieldError, handleGeneralError) {
    const dataInfo = error.response.data;
    if (dataInfo) {
        extractErrorMessages(dataInfo.message, fields, handleFieldError, handleGeneralError);
    } else if (error.request) {
        handleGeneralError("request not sent. tip: check if you're connected to the internet");
    }
}

export function setStandardError(setErrorInfo, err) {
    if (err.response) {
        if (err.response.status >= 500) { //TODO: create standard error variables
            setErrorInfo({ state: true, message: "oops an error occurred in our system" });
        } else if (err.response.status >= 400 && err.response.status < 500) {
            setErrorInfo({ state: true, message: err.response.data.message.error });
        }
    } else if (err.request) {
        setErrorInfo({ state: true, message: "request not sent. tip: check if you're connected to the internet" });
    }
};


export function objectIsEmpty(object_) {
    return (
        Object.keys(object_).length < 1
    )
}

export function loginRequiredRedirect(url, authState, navigate, setAuthPopup, options = {}) {
    if (authState) {
        navigate(url, { ...options });
    } else {
        setAuthPopup(true);
    }
}

export const toggleAction = async (axios_, url, type, rejectHandler) => {
    try {
        const resp = await axios_.patch(url, { "type": type }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return resp

    } catch (err) {
        rejectHandler(err.response);
        return err;
    }
};


export function shortenCount(count) {
    if (count > 999 && count < 1000000) {
        return (count / 1000).toFixed(1) + "K";
    } else if (count > 99999) {
        return (count / 1000000).toFixed(1) + "M";
    }
    return count;
}



export const genFetchPost = async (url, setState, axios_) => {
    try {
        const resp = await axios_.get(url);
        const { results, ...others } = resp.data.data;
        setState({ isLoading: false, others: others, posts: results });
        return resp;
    } catch (err) {
        setState((state) => ({ ...state, isLoading: false }));
        return err;
    }
};



export const formatDate = (isoString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(isoString);
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
};


export const trimCharsTo = (string_, max_) => {
    if (string_.length >= max_) return string_.substring(0, max_) + '...'
    return string_
};

export const imageOrDefault = (img) => {
    if (!img) return image;

    if (img.startsWith("http")) return img;

    return process.env.REACT_APP_BACKEND_URL + img;
}

export const imgErrorHandler = (event) => {
    event.target.src = image;
}

export { authenticateUserAndRedirect, extractErrorMessages, isExpired, setAuthBasedOnRefreshToken, parseJwt, setAuthAndStorage, forwardDebounce, deBounce };