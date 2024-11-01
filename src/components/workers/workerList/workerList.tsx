import "./workerList.scss";
import { SortContainer } from "../../sortContainer/sortContainer";
import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../../filterContainer/filterContainer";
import {
  addToArchive,
  filterByJob,
  filterByArchive,
} from "../../../app/workersListSlice";
import { ChangeEvent, useCallback } from "react";
import { selectFilteredWorkers } from "../../../utils/createSelector";
import { MemoizedLink } from "./memoizedLink";

const WorkerList = () => {
  const dispatch = useDispatch();
  const filteredWorkers = useSelector(selectFilteredWorkers);

  const handleClickArchive = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addToArchive(Number(event.target.id)));
  };
  const handleJobFilter = useCallback(
    (job: string) => {
      dispatch(filterByJob(job));
    },
    [dispatch],
  );

  const handleArchiveFilter = useCallback(
    (inArchive: string) => {
      dispatch(filterByArchive(inArchive));
    },
    [dispatch],
  );

  return (
    <>
      {filteredWorkers && filteredWorkers.length > 0 ? (
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
          <ul className="worker-list">
            {filteredWorkers.map((element) => (
              <li key={element.id}>
                <MemoizedLink
                  className={"worker-name"}
                  to={`/worker/${element.id}`}
                >
                  {element.name}
                </MemoizedLink>
                <label className="worker-archived" htmlFor={`${element.id}`}>
                  архив
                  <input
                    id={`${element.id}`}
                    type="checkbox"
                    onChange={handleClickArchive}
                    checked={element.isArchive}
                  />
                </label>
                <span className="worker-role">{element.role}</span>
                <span className="worker-tel">{element.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Список сотрудников пустой!</div>
      )}
    </>
  );
};

export { WorkerList };
