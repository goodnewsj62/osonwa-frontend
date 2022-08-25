

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