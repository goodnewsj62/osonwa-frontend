import { baseAxiosInstance } from "utils/requests";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


export const fetchNotifications = createAsyncThunk("user/fetchNotification", async (access, ThunkAPI) => {
    try {
        const resp = await baseAxiosInstance.get("/auth/notification/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access
            }
        });
        return resp.data.data;
    } catch (err) {
        return err
    }
});

export const fetchNext = createAsyncThunk("user/fetchNext", async ({ axios_, next_url }, ThunkAPI) => {
    try {
        const resp = await axios_.get(next_url);
        return resp;
    } catch (err) {
        return err
    }
});
export const fetchUnRead = createAsyncThunk("user/fetchUnRead", async (axios_, ThunkAPI) => {
    try {
        const resp = await axios_.get("/auth/notification/?unread=true");
        return resp;
    } catch (err) {
        return err
    }
});

const initialState = {
    unReadCount: 0,
    result: { isLoading: true, others: {}, posts: [] }
}

const notifySlice = createSlice({
    name: "notifySlice",
    initialState: initialState,
    reducers: {
        resetCount(state, action) {
            return { ...state, unReadCount: 0 }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            const { results, ...others } = action.payload;
            state.result.isLoading = false;
            state.result.others = others;
            state.result.posts = results;
            state.unReadCount = results.length ? results[0].read_count : 0;
        });
        builder.addCase(fetchNext.fulfilled, (state, action) => {
            const { results, ...others } = action.payload;
            state.result.isLoading = false;
            state.result.others = others;
            state.result.posts = [...state.result.posts, ...results];
        });
        builder.addCase(fetchUnRead.fulfilled, (state, action) => {
            const { results, ...others } = action.payload;
            state.result.isLoading = false;
            state.result.others = others;
            state.result.posts = [...results, ...state.result.posts];
            state.unReadCount = results.length ? results[0].read_count : 0;
        });
    }
});


export const { resetCount } = notifySlice.actions;
const notifyReducers = notifySlice.reducer;
export default notifyReducers;
