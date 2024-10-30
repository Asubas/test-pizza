import { useParams } from "react-router-dom";
import { WorkerForm } from "../workerForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

function EditWorker() {
  const { id } = useParams();
  const workerList = useSelector(
    (state: RootState) => state.workers.workerList
  );
  const EditWorker = workerList.find((worker) => worker.id === Number(id));
  return (
    <>
      <WorkerForm edit={true} worker={EditWorker} />
    </>
  );
}

export { EditWorker };
