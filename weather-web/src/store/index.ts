import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
