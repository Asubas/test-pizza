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
    addWorker: (state) => {},
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
    filterWorkerByRole: (state, action) => {
      const role = action.payload;
      if (!role) {
        return;
      }
      state.workerList = state.workerList.filter(
        (worker) => worker.role === role
      );
    },
    filterWorkerByStatus: (state) => {},
  },
});

export const {
  setWorkers,
  addWorker,
  sortWorkerByBirthday,
  sortWorkerByName,
  filterWorkerByRole,
  filterWorkerByStatus,
} = workerListSlice.actions;

export default workerListSlice.reducer;
