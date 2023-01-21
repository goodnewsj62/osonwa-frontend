import { createSlice } from "@reduxjs/toolkit";



const initialState = { status: false, userInfo: {}, interests: [] };


const profileSlice = createSlice({
    name: "profileSlice",
    initialState: initialState,
    reducers: {
        setState: (state, action) => { },
        updateUserinfo: (state, action) => { },
        updateStatus: (state, action) => { },
        updateInterests: (state, action) => { }
    }
});

const profileSliceActions = profileSlice.actions;
const profileSliceReducers = profileSlice.reducer;

export default profileSliceActions;
export { profileSliceReducers };