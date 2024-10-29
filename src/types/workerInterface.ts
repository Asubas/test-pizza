export interface IWorker {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

export interface INewWorker {
  id: number;
  name: string;
  isArchive: boolean;
  role: "cook" | "driver" | "waiter";
  phone: string;
  birthday: string;
}
