
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CompanyReducer } from "./Reducer";

const rootreducer=combineReducers({
    company:CompanyReducer
})
const compstore=configureStore({
    reducer:rootreducer, 
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
});

export default compstore;
export type RootState = ReturnType<typeof compstore.getState> ;
export type AppDispatch = typeof compstore.dispatch; 