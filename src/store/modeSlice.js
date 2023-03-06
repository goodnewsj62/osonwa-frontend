import { createSlice } from "@reduxjs/toolkit";


const initialState = "light";

const modeSlice = createSlice({
    name: "mode",
    initialState: initialState,
    reducers: {
        toggleMode(state) {
            if (state === "light") {
                return "dark";
            } else {
                return "light";
            }
        }
        ,
        setMode(state, actions) {
            return actions.payload;
        }
    }
});



const modeSliceActions = modeSlice.actions;
const modeSliceReducer = modeSlice.reducer;


export default modeSliceActions;
export { modeSliceReducer };

