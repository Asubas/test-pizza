import { Link, useParams } from "react-router-dom";
import { WorkerForm } from "../workerForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

function EditWorker() {
  const { id } = useParams();
  const workerList = useSelector(
    (state: RootState) => state.workers.workerList
  );
  const editWorker = workerList.find((worker) => worker.id === Number(id));
  if (!editWorker) {
    return (
      <div>
        <p>Работник не найден</p>
        <Link to={"/"}>На главную</Link>
      </div>
    );
  }
  return <WorkerForm edit={true} worker={editWorker} />;
}

export { EditWorker };
