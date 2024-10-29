import { configureStore } from "@reduxjs/toolkit";
import workerReducer from "./workesListSlice";

export const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
