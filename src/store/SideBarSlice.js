import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const SideBarSlice = createSlice({
    name: "sideToggle",
    initialState,
    reducers: {
        toggleState(state) {
            return !state;
        },
        hide(state) {
            return false;
        },
        show(state) {
            return true;
        }
    }
});


export const sideBarReducers = SideBarSlice.reducer;
const sideBarActions = SideBarSlice.actions;
export default sideBarActions;