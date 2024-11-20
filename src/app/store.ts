import { configureStore } from "@reduxjs/toolkit";
import workerReducer from "./workersListSlice";

export const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
