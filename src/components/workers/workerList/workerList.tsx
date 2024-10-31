import "./workerList.scss";
import { Link } from "react-router-dom";
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

const WorkerList = () => {
  const dispatch = useDispatch();
  const filteredWorkers = useSelector(selectFilteredWorkers);

  const handleClickArchive = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(addToArchive(Number(event.target.id)));
    },
    [dispatch]
  );

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
      {filteredWorkers && filteredWorkers.length > 0 ? (
        <div className="app-container">
          <div className="sort-section">
            <SortContainer />
            <FilterContainer
              filterByJob={handleJobFilter}
              filterByArchive={handleArchiveFilter}
            />
            <Link className="newWorker-link" to={"/worker/new"}>
              Добавить нового работника
            </Link>
          </div>
          <ul className="worker-list">
            {filteredWorkers.map((element) => (
              <li key={element.id}>
                <Link className="worker-name" to={`/worker/${element.id}`}>
                  {element.name}
                </Link>
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
        <div>Список работников пустой!</div>
      )}
    </>
  );
};

export { WorkerList };
