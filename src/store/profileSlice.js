import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseAxiosInstance } from "utils/requests";



const fetchProfileInfo = createAsyncThunk("profileSlice/fetchProfileInfo", async ({ username, accessToken }, ThunkApi) => {
    try {
        let url = `/auth/profile/${username}/`;
        const headers = { "Content-Type": "application/json" };
        if (!username) {
            url = "/auth/profile/";
            headers["Authorization"] = "Bearer " + accessToken;
        }
        const response = await baseAxiosInstance({ url, method: "get", headers: headers });
        return response.data.data;

    } catch (err) {
        const message = err.response.data.message;
        return ThunkApi.rejectWithValue({ message: message, status: err.response.status })
    }
});


const updateInterests = createAsyncThunk("interests/updateInterests", async ({ arr, toDelete, username, accessToken }, ThunkApi) => {
    try {
        const data = { "interest": arr };
        const url = `auth/interests/${username}/`
        baseAxiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken
        const response = await Promise.all([
            baseAxiosInstance.patch(url, data),
            baseAxiosInstance({ url: url, data: { "interest": toDelete }, method: "delete" }),
        ]);

        ThunkApi.dispatch(fetchProfileInfo({ username: username, accessToken: accessToken }));

        return response[2].data.data
    } catch (err) {
        const message = err.response.data.message
        return ThunkApi.rejectWithValue({ message: message, status: err.response.status })
    }
});


const initialState = { status: false, userInfo: {}, interests: [] };


const profileSlice = createSlice({
    name: "profileSlice",
    initialState: initialState,
    reducers: {
        setState: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateUserinfo: (state, action) => {
            state.userInfo = action.payload;
        },
        updateStatus: (state, action) => {
            state.status = action.payload;
        },
        updateInterests: (state, action) => {
            state.interests = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProfileInfo.fulfilled, (state, action) => {
            state.status = true;
            state.userInfo = action.payload;
            state.interests = action.payload.interests;
        });
    }
});

const profileSliceActions = profileSlice.actions;
const profileSliceReducers = profileSlice.reducer;

export default profileSliceActions;
export { profileSliceReducers, fetchProfileInfo, updateInterests };