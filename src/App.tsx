import { Route, Routes } from "react-router-dom";
import { Worker } from "./components/worker/worker";
import { ErrorPage } from "./error-page";
import { WorkerList } from "./components/workerList.tsx/workerList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WorkerList />} />
      <Route path="worker/:id" element={<Worker />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
