import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortContainer } from "../../../components/sortContainer/sortContainer";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const sortByName = () => ({ type: "sortWorkerByName" });
const sortByBirthday = () => ({ type: "sortWorkerByBirthday" });
describe("Test sort container component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SortContainer />
      </Provider>
    );
  });

  test("sort by name called", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(sortByName());
    fireEvent.click(screen.getByText("Сортировать по имени"));
    const actions = store.getActions();
    const expectedPayload = { type: "sortWorkerByName" };
    expect(actions).toEqual([expectedPayload]);
  });

  test("sort by birthday called", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(sortByBirthday());
    fireEvent.click(screen.getByText("Сортировать по дате рождения"));
    const actions = store.getActions();
    const expectedPayload = { type: "sortWorkerByBirthday" };
    expect(actions).toEqual([expectedPayload]);
  });
});
