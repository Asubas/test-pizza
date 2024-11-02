import "./workerList.scss";
import { SortContainer } from "../../sortContainer/sortContainer";
import { useDispatch } from "react-redux";
import { FilterContainer } from "../../filterContainer/filterContainer";
import { filterByJob, filterByArchive } from "../../../app/workersListSlice";
import { useCallback } from "react";
import { MemoizedLink } from "./memoizedLink";
import { ListComponent } from "./list/listComponent";

const WorkerList = () => {
  const dispatch = useDispatch();
  const handleJobFilter = useCallback(
    (job: string) => {
      dispatch(filterByJob(job));
    },
    [dispatch]
  );

  const handleArchiveFilter = useCallback(
    (inArchive: string) => {
      dispatch(filterByArchive(inArchive));
    },
    [dispatch]
  );

  return (
    <>
      <div className="app-container">
        <div className="sort-section">
          <SortContainer />
          <FilterContainer
            filterByJob={handleJobFilter}
            filterByArchive={handleArchiveFilter}
          />
          <MemoizedLink to={"/worker/new"} className={"newWorker-link"}>
            Добавить нового сотрудника
          </MemoizedLink>
        </div>
        <ListComponent />
      </div>
    </>
  );
};

export { WorkerList };
