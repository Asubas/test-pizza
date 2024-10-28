import { Route, Routes } from "react-router-dom";
import { Worker } from "./components/worker/worker";
import { ErrorPage } from "./error-page";
import { WorkerList } from "./components/workerList.tsx/workerList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkers } from "./slices/workesListSlice";
import { workerList } from "./utils/workerList";

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
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
