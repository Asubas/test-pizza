import { createSlice } from "@reduxjs/toolkit";
import { IWorker } from "../types/workerInterface";

export const workerListSlice = createSlice({
  name: "workersListSlice",
  initialState: {
    workerList: [] as IWorker[],
    selectedJob: "",
    showArchived: "",
    sortByNameAsc: true,
    sortByBirthdayAsc: true,
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
      state.sortByNameAsc = !state.sortByNameAsc;
      state.workerList = state.workerList.slice().sort((a, b) => {
        return state.sortByNameAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    },
    sortWorkerByBirthday: (state) => {
      state.sortByBirthdayAsc = !state.sortByBirthdayAsc;
      state.workerList = state.workerList.slice().sort((a, b) => {
        const dateA = new Date(
          a.birthday.split(".").reverse().join("-"),
        ).getTime();
        const dateB = new Date(
          b.birthday.split(".").reverse().join("-"),
        ).getTime();
        return state.sortByBirthdayAsc ? dateA - dateB : dateB - dateA;
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
    filterByJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    filterByArchive: (state, action) => {
      state.showArchived = action.payload;
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
  filterByJob,
  filterByArchive,
} = workerListSlice.actions;

export default workerListSlice.reducer;
