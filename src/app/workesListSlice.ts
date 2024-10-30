import { createSlice } from "@reduxjs/toolkit";
import { IWorker } from "../types/workerInterface";

export const workerListSlice = createSlice({
  name: "workersListSlice",
  initialState: {
    workerList: [] as IWorker[],
  },
  reducers: {
    setWorkers: (state, action) => {
      state.workerList = action.payload;
    },
    addWorker: (state, action) => {
      state.workerList.push(action.payload);
    },
    editWorker: (state, action) => {
      const { id, editWorker } = action.payload;
      state.workerList = state.workerList.map((worker) => {
        return worker.id === id ? { ...worker, ...editWorker } : worker;
      });
    },
    sortWorkerByName: (state) => {
      state.workerList = state.workerList.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    sortWorkerByBirthday: (state) => {
      state.workerList = state.workerList.slice().sort((a, b) => {
        const dateA = new Date(
          a.birthday.split(".").reverse().join("-")
        ).getTime();
        const dateB = new Date(
          b.birthday.split(".").reverse().join("-")
        ).getTime();
        return dateA - dateB;
      });
    },
    addToArchive: (state, action) => {
      const workerId = action.payload;
      state.workerList = state.workerList.map((worker) => {
        if (worker.id === workerId) {
          return { ...worker, isArchive: !worker.isArchive };
        }
        return worker;
      });
    },
  },
});

export const {
  setWorkers,
  addWorker,
  editWorker,
  sortWorkerByBirthday,
  sortWorkerByName,
  addToArchive,
} = workerListSlice.actions;

export default workerListSlice.reducer;
