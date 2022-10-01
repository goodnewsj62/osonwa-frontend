import { configureStore } from "@reduxjs/toolkit";
import { authStateReducers } from "./authSlice";
import { modeSliceReducer } from "./modeSlice";


const store = configureStore({
    reducer: {
        authState: authStateReducers,
        mode: modeSliceReducer,
    }
});


export default store;