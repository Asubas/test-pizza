import "./workerList.scss";
import { Link } from "react-router-dom";
import { SortContainer } from "../../sortContainer/sortContainer";
import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../../filterContainer/filterContainer";
import { addToArchive } from "../../../app/workesListSlice";
import { ChangeEvent, memo, useCallback, useEffect, useReducer } from "react";
import { RootState } from "../../../app/store";
import { initialState, reducer } from "../../../utils/reducer";

const WorkerList = memo(() => {
  const workers = useSelector((state: RootState) => state.workers.workerList);
  const dispatch = useDispatch();
  const [stateReducer, dispatchReducer] = useReducer(reducer, initialState);

  const handleClickArchive = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(addToArchive(Number(event.target.id)));
    },
    [dispatch],
  );

  const filterByJob = useCallback((job: string) => {
    dispatchReducer({ type: "filteredByJob", payload: job });
  }, []);

  const filterByArchive = useCallback((inArchive: string) => {
    dispatchReducer({ type: "filteredByArchive", payload: inArchive });
  }, []);

  const arrayWorkers = stateReducer.workers.filter((worker) => {
    const jobFilter =
      !stateReducer.selectedJob ||
      worker.role.includes(stateReducer.selectedJob);
    const archiveMatch =
      (stateReducer.showArchived === "inArchive" && worker.isArchive) ||
      (stateReducer.showArchived === "noArchive" && !worker.isArchive) ||
      stateReducer.showArchived === "";

    return jobFilter && archiveMatch;
  });

  useEffect(() => {
    if (workers.length > 0) {
      dispatchReducer({ type: "initialWorkers", payload: workers });
    }
  }, [workers]);

  return (
    <>
      {arrayWorkers ? (
        <>
          <div className="app-container">
            <div className="sort-section">
              <SortContainer />
              <FilterContainer
                filterByJob={filterByJob}
                filterByArchive={filterByArchive}
              />
              <Link className="newWorker-link" to={"/worker/new"}>
                Добавить нового работника
              </Link>
            </div>
            <ul className="worker-list">
              {arrayWorkers.map((element) => (
                <li key={element.id}>
                  <Link className="worker-name" to={`/worker/${element.id}`}>
                    {element.name}
                  </Link>
                  <label className="worker-archived" htmlFor={`${element.id}`}>
                    Архив
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
        </>
      ) : (
        <div>Список работников пустой!</div>
      )}
    </>
  );
});

export { WorkerList };
