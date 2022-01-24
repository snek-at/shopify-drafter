import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSelectorHook, useDispatch } from "react-redux";
import DraftsReducer from "./modules/Drafts";

const rootReducer = combineReducers({
  drafts: DraftsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector = createSelectorHook<RootState>();
export const useTypedDispatch = useDispatch;

const store = configureStore({ reducer: rootReducer });

export default store;