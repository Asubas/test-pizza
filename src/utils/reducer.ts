import { IWorker } from "../types/workerInterface";

type State = {
  workers: IWorker[];
  selectedJob: string;
  showArchived: string;
};

type Action =
  | { type: "initialWorkers"; payload: IWorker[] }
  | { type: "filteredByJob"; payload: string }
  | { type: "filteredByArchive"; payload: string };

const initialState: State = {
  workers: [],
  selectedJob: "",
  showArchived: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "initialWorkers":
      return { ...state, workers: action.payload };
    case "filteredByJob":
      return { ...state, selectedJob: action.payload };
    case "filteredByArchive":
      return { ...state, showArchived: action.payload };
    default:
      return state;
  }
}

export { reducer, initialState };
