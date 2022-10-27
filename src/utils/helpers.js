import { baseAxiosInstance } from "./requests";

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



export { isExpired, setAuthBasedOnRefreshToken, parseJwt, setAuthAndStorage, forwardDebounce, deBounce };