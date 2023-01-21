import { configureStore } from "@reduxjs/toolkit";
import { authStateReducers } from "./authSlice";
import { interestReducers } from "./interestsSlice";
import { modeSliceReducer } from "./modeSlice";
import { profileSliceReducers } from "./profileSlice";
import { sideBarReducers } from "./SideBarSlice";


const store = configureStore({
    reducer: {
        authState: authStateReducers,
        mode: modeSliceReducer,
        sideBarState: sideBarReducers,
        profileState: profileSliceReducers,
        interestState: interestReducers,
    }
});


export default store;