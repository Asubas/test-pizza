import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { WorkerList } from "../../../../components/workers/workerList/workerList";
import configureStore from "redux-mock-store";
import {
  addToArchive,
  filterByArchive,
  filterByJob,
} from "../../../../app/workersListSlice";
import { RootState } from "../../../../app/store";

const mockStore = configureStore<RootState>();

describe("WorkerList Component", () => {
  let store: ReturnType<typeof mockStore>;
  const initialState = {
    workers: {
      workerList: [
        {
          id: 1,
          name: "Илья Емельянфф",
          isArchive: false,
          role: "driver",
          phone: "+7 (883) 508-3269",
          birthday: "12.02.1982",
        },
      ],
      sortByNameAsc: true,
      sortByBirthdayAsc: true,
      selectedJob: "",
      showArchived: "",
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WorkerList />
        </Provider>
      </BrowserRouter>
    );
  });

  test("Should be correct send dispatch for added worker to archive", () => {
    fireEvent.click(screen.getByLabelText("архив"));
    const expectedAction = addToArchive(1);
    expect(store.getActions()).toEqual([expectedAction]);
  });

  test("Should be correct send dispatch for filtering working by job", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "Должность" }), {
      target: { value: "cook" },
    });
    const expectedAction = filterByJob("cook");
    expect(store.getActions()).toEqual([expectedAction]);
  });

  test("Should be correct send dispatch for filtering working by archive", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "Архив" }), {
      target: { value: "inArchive" },
    });
    const expectedAction = filterByArchive("inArchive");
    expect(store.getActions()).toEqual([expectedAction]);
  });
});

describe("", () => {
  test("Should correct render without workers", () => {
    jest.clearAllMocks();
    const emptyMockStore = configureStore<RootState>();
    const emptyStore = emptyMockStore({
      workers: {
        workerList: [],
        sortByNameAsc: false,
        sortByBirthdayAsc: false,
        selectedJob: "cook",
        showArchived: "",
      },
    });
    render(
      <BrowserRouter>
        <Provider store={emptyStore}>
          <WorkerList />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Список сотрудников пустой!")).toBeInTheDocument();
  });
});
