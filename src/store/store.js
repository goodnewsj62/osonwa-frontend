import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authStateReducers } from "./authSlice";
import { modeSliceReducer } from "./modeSlice";
import { sideBarReducers } from "./SideBarSlice";


const rootReducer = combineReducers({
    authState: authStateReducers,
    mode: modeSliceReducer,
    sideBarState: sideBarReducers
});

export default function setUpStore(preloadedState) {
    return configureStore({ reducer: rootReducer, preloadedState });
}