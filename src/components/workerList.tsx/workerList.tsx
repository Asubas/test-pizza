import "./WorkerList.scss";
import { Link } from "react-router-dom";
import { SortContainer } from "../sortContainer/sortContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FilterContainer } from "../filterContainer/filterContainer";

function WorkerList() {
  const workers = useSelector((state: RootState) => state.workers.workerList);

  return (
    <>
      {workers ? (
        <div className="worker-list">
          <SortContainer />
          <FilterContainer />
          {workers.map((element) => (
            <div key={element.id}>
              <Link to={`/worker/${element.id}`}>{element.name}</Link>
              <span className="worker-name">{element.role}</span>
              <span className="worker-tel">{element.phone}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>Hello world</div>
      )}
    </>
  );
}

export { WorkerList };
