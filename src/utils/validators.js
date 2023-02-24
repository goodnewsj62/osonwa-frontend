

export const textFieldValidator = (trimmedValue, hasSpaces, dispatch, type, label) => {
    if (trimmedValue === "" || trimmedValue === " ") {
        const payload = { isValid: false, error: "this field is required" };
        dispatch({ type: type, payload: payload });
    }
    else if (trimmedValue.length < 3) {
        const payload = { isValid: false, error: `${label} must be greater than two characters` };
        dispatch({ type: type, payload: payload });
    } else if (hasSpaces) {
        const payload = { isValid: false, error: `${label} has a space in between characters` };
        dispatch({ type: type, payload: payload });
    } else {
        const payload = { isValid: true, error: "" };
        dispatch({ type: type, payload: payload });
    }
};


export const urlFieldValidator = (baseurl, isEmail = false) => (trimmedValue, hasSpaces, dispatch, type, label) => {

    if (trimmedValue && !isEmail) {
        performUrlChecks(trimmedValue, hasSpaces, dispatch, type, baseurl, label);
    } else if (trimmedValue && isEmail) {
        performEmailChecks(trimmedValue, hasSpaces, dispatch, type, baseurl, label);
    } else {
        dispatch({ type: type, payload: { isValid: true, error: "" } });
    }
};


function performUrlChecks(trimmedValue, hasSpaces, dispatch, type, baseurl, label) {
    const isValidUrl = isValidUrlCheck(trimmedValue, baseurl);


    if (!trimmedValue.match(/https:\/\//)) {
        const payload = { isValid: false, error: `url should start with https://` };
        dispatch({ type: type, payload: payload });
    } else if (!isValidUrl) {
        const payload = { isValid: false, error: `does not match ${baseurl} url` };
        dispatch({ type: type, payload: payload });
    } else if (hasSpaces) {
        const payload = { isValid: false, error: `${label} has a space in between characters` };
        dispatch({ type: type, payload: payload });
    } else {
        const payload = { isValid: true, error: "" };
        dispatch({ type: type, payload: payload });
    }
}
function performEmailChecks(trimmedValue, hasSpaces, dispatch, type, baseurl, label) {
    if (!trimmedValue.match(/.+@.+(net|com|org)$/)) {
        const payload = { isValid: false, error: `email invalid` };
        dispatch({ type: type, payload: payload });
    }
    else if (hasSpaces) {
        const payload = { isValid: false, error: `${label} has a space in between characters` };
        dispatch({ type: type, payload: payload });
    } else {
        const payload = { isValid: true, error: "" };
        dispatch({ type: type, payload: payload });
    }
}


function isValidUrlCheck(val, urlBase) {
    const exprStr = "https:\/\/w{0,3}\.?" + urlBase + ".com\/+."
    const expr = new RegExp(exprStr)
    return val.match(expr);
}

