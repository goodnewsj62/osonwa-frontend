

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


export const urlFieldValidator = (trimmedValue, hasSpaces, dispatch, type, label) => {

    if (trimmedValue) {
        performUrlChecks(trimmedValue, hasSpaces, dispatch, type, label)
    } else {
        dispatch({ type: type, payload: { isValid: true, error: "" } });
    }
};


function performUrlChecks(trimmedValue, hasSpaces, dispatch, type, label) {
    const url = type.split("_")[0]
    const isValidUrl = isValidUrlCheck(trimmedValue, url);


    if (!trimmedValue.match(/https:\/\//)) {
        const payload = { isValid: false, error: `url should start with https://` };
        dispatch({ type: type, payload: payload });
    } else if (!isValidUrl) {
        const payload = { isValid: false, error: `does not match ${url} url` };
        dispatch({ type: type, payload: payload });
    } else if (hasSpaces) {
        const payload = { isValid: false, error: `${label} has a space in between characters` };
        dispatch({ type: type, payload: payload });
    } else {
        const payload = { isValid: true, error: "" };
        dispatch({ type: type, payload: payload });
    }
}


function isValidUrlCheck(val, urlBase) {
    const exprStr = "https:\/\/" + urlBase + ".com\/+."
    const expr = new RegExp(exprStr)
    return val.match(expr);
}