import { createSlice } from "@reduxjs/toolkit";


const initialState = { state: false, refresh: "", access: "" };

const saveAuthToken = (jwtToken) => {
    return dispatch => {
        const token = JSON.stringify(jwtToken);
        localStorage.setItem("token", token);
        dispatch({ state: true, refresh: jwtToken.refresh, access: jwtToken.access });
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setAuthState(state, payload) {
            return payload.state;
        }
    }
});



// const setAuthStatusHandler = null;
// const authenticateUserThunk =  null;
// const logoutUserThunk = null;

const authStateReducers = authSlice.reducer;
const authStateActions = authSlice.actions;

export default authStateActions;
export { authStateReducers, saveAuthToken };