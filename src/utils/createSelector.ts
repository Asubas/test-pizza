import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const selectWorkerList = (state: RootState) => state.workers.workerList;
const selectSelectedJob = (state: RootState) => state.workers.selectedJob;
const selectShowArchived = (state: RootState) => state.workers.showArchived;

export const selectFilteredWorkers = createSelector(
  [selectWorkerList, selectSelectedJob, selectShowArchived],
  (workerList, selectedJob, showArchived) => {
    return workerList.filter((worker) => {
      const jobFilter = !selectedJob || worker.role.includes(selectedJob);
      const archiveMatch =
        (showArchived === "inArchive" && worker.isArchive) ||
        (showArchived === "noArchive" && !worker.isArchive) ||
        !showArchived;

      return jobFilter && archiveMatch;
    });
  },
);
