import { Route, Routes } from "react-router-dom";
import { EditWorker } from "./components/workers/editWorker/editWorker";
import { ErrorPage } from "./error-page";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkers } from "./app/workersListSlice";
import { workerList } from "./utils/workerList";
import { NewWorker } from "./components/workers/newWorker/newWorker";
import { WorkerList } from "./components/workers/workerList/workerList";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const workersData = await workerList();
      dispatch(setWorkers(workersData));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<WorkerList />} />
        <Route path="worker/:id" element={<EditWorker />} />
        <Route path="worker/new" element={<NewWorker />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
