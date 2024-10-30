import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { EditWorker } from "./components/workers/editWorker/editWorker";
import { ErrorPage } from "./error-page";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkers } from "./app/workesListSlice";
import { workerList } from "./utils/workerList";
import { NewWorker } from "./components/workers/newWorker/newWorker";
import { WorkerList } from "./components/workers/workerList.tsx/workerList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workersData = await workerList();
        dispatch(setWorkers(workersData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<WorkerList />} />
      <Route path="worker/:id" element={<EditWorker />} />
      <Route path="worker/new" element={<NewWorker />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
