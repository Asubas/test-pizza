import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { WorkerForm } from "../workerForm";

function NewWorker() {
  const lastWorkerNumber = useSelector(
    (state: RootState) => state.workers.workerList
  );

  return <WorkerForm lastWorkerNumber={lastWorkerNumber.length} />;
}

export { NewWorker };
