import "./WorkerList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IWorker } from "../../types/workerInterface";
import { workerList } from "../../utils/workerList";
import { SortContainer } from "../sortContainer/sortContainer";

function WorkerList() {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);

  useEffect(() => {
    workerList().then((res) => setWorkers(res));
  }, []);

  return (
    <>
      {workers ? (
        <div className="worker-list">
          <SortContainer />
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
