import { toast } from "react-toastify";
import { IWorker } from "../types/workerInterface";
import { errorDownloadFile } from "./toastOption";

async function workerList() {
  return fetch("../employees.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при получении данных: ${res.statusText}`);
      }
      return res.json();
    })
    .then((resData) => {
      return resData as IWorker[];
    })
    .catch(() => {
      toast.error("Ошибка загрузки файла сотрудников!", errorDownloadFile);
      return [];
    });
}

export { workerList };
