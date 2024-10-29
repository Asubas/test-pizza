import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Worker } from "./components/workers/worker";
import { ErrorPage } from "./error-page";
import { WorkerList } from "./components/workerList.tsx/workerList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkers } from "./app/workesListSlice";
import { workerList } from "./utils/workerList";
import { NewWorker } from "./components/workers/newWorker/newWorker";

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
      <Route path="worker/:id" element={<Worker />} />
      <Route path="worker/new" element={<NewWorker />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
