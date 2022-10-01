import { configureStore } from "@reduxjs/toolkit";
import { authStateReducers } from "./authSlice";
import { modeSliceReducer } from "./modeSlice";
import { sideBarReducers } from "./SideBarSlice";


const store = configureStore({
    reducer: {
        authState: authStateReducers,
        mode: modeSliceReducer,
        sideBarState: sideBarReducers
    }
});


export default store;