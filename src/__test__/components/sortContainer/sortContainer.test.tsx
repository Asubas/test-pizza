import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortContainer } from "../../../components/sortContainer/sortContainer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../../app/workesListSlice";

const mockStore = configureStore();
describe("Test sort container component", () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SortContainer />
      </Provider>
    );
  });

  test("sort by name called", () => {
    fireEvent.click(screen.getByText("Сортировать по имени"));
    const expectedPayload = sortWorkerByName();
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  test("sort by birthday called", () => {
    fireEvent.click(screen.getByText("Сортировать по дате рождения"));
    const expectedPayload = sortWorkerByBirthday();
    expect(store.getActions()).toEqual([expectedPayload]);
  });
});
