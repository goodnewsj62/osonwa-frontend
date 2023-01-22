import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { baseAxiosInstance } from "utils/requests";



const fetchAllInterest =  createAsyncThunk("interests/fetchAllInterest", async (options={},ThunkApi)=>{
    try{
        const response =  await baseAxiosInstance({method:"get", url: "auth/interests"});
        const data =  response.data.data
        ThunkApi.dispatch(interestAction.populateInterests(data))
        return data 

    }catch(err){
        const message = err.response.data.message
        return ThunkApi.rejectWithValue({message:message, status:err.response.status})
    }
});


const updateInterests =  createAsyncThunk("interests/updateInterests", async ({arr,username}, ThunkApi)=>{
    try{
        const data =  {"interest":arr};
        const response =  await baseAxiosInstance.patch(`auth/interests/${username}/`,data);
        //ThunkApi.dispatch() //call to refetch users profile
        return response.data.message
    }catch(err){
        const message = err.response.data.message
        return ThunkApi.rejectWithValue({message:message, status:err.response.status})
    }
});

const initialState = { state: "empty", allInterests: [] };


const interestSlice = createSlice({
    name: "interestslice",
    initialState: initialState,
    reducers: {
        populateInterests: (state, action) => {
            return { state: "populated", allInterests: [...action.payload] }
        }
    }
});


const interestReducers = interestSlice.reducer;
const interestAction =  interestSlice.actions;

export default interestAction;
export {interestReducers, fetchAllInterest, updateInterests};