import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAxiosInstance } from "utils/requests";


const initialState = { state: false, refresh: "", access: "" };

const saveAuthToken = (jwtToken) => {
    return dispatch => {
        const token = JSON.stringify(jwtToken);
        localStorage.setItem("token", token);
        dispatch(authStateActions.setAuthState({ state: true, refresh: jwtToken.refresh, access: jwtToken.access }));
    }
};

const clearToken = () => {
    return dispatch => {
        localStorage.setItem("token", "");
        dispatch(authStateActions.setAuthState({ state: false, refresh: "", access: "" }));
    };
};

const refreshToken = createAsyncThunk("user/refreshToken", async (refreshJWT, ThunkAPI) => {
    try {
        const response = await baseAxiosInstance.post("/refresh/", { refresh: refreshJWT });
        const data = response.data.data
        ThunkAPI.dispatch(saveAuthToken(data));
        return data
    } catch (error) {
        const errResp = error.response;
        ThunkAPI.dispatch(clearToken());
        return ThunkAPI.rejectWithValue({ message: errResp.data.message, status: errResp.status });
    }
});

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setAuthState(state, action) {
            return { ...state, ...action.payload }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.refresh = "";
            state.access = "";
            state.state = false;
        });
    }
});



// const setAuthStatusHandler = null;
// const authenticateUserThunk =  null;
// const logoutUserThunk = null;

const authStateReducers = authSlice.reducer;
const authStateActions = authSlice.actions;

export default authStateActions;
export { authStateReducers, saveAuthToken, refreshToken };