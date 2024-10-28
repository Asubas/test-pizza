import { IWorker } from "../types/workerInterface";

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
    .catch((error) => {
      console.error("Ошибка:", error);
      return [];
    });
}

export { workerList };
