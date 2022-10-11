import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authStateReducers } from "./authSlice";
import { modeSliceReducer } from "./modeSlice";


const rootReducer = combineReducers({
    authState: authStateReducers,
    mode: modeSliceReducer
});

export default function setUpStore(preloadedState) {
    return configureStore({ reducer: rootReducer, preloadedState });
}