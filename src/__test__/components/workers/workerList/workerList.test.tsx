import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { WorkerList } from "../../../../components/workers/workerList/workerList";
import configureStore from "redux-mock-store";
import { addToArchive } from "../../../../app/workesListSlice";
import { RootState } from "../../../../app/store";

const mockStore = configureStore<RootState>();

describe("WorkerList Component", () => {
  let store: ReturnType<typeof mockStore>;
  const initialState = {
    workers: {
      workerList: [
        {
          id: 1,
          name: "Илья Емельянов",
          isArchive: false,
          role: "driver",
          phone: "+7 (883) 508-3269",
          birthday: "12.02.1982",
        },
      ],
      sortByNameAsc: true,
      sortByBirthdayAsc: true,
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

  test("Should be correct send dispatch for added worket to archive", () => {
    fireEvent.click(screen.getByLabelText("архив"));
    const expectedAction = addToArchive(1);
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
