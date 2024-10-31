import { WorkerForm } from "../../../components/workers/workerForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { addWorker, editWorker } from "../../../app/workesListSlice";

const testWorker = {
  id: 15,
  name: "Иванна Калашникова",
  isArchive: true,
  role: "waiter",
  phone: "+7 (927) 488-2568",
  birthday: "24.03.1982",
};

const mockStore = configureStore();

describe("Should correct render component WorkerForm", () => {
  beforeEach(() => {
    const initialState = { testWorker };
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <WorkerForm worker={testWorker} />
        </Provider>
      </MemoryRouter>
    );
  });

  test("Test for correct render", () => {
    expect(screen.getByText("Введите дату рождения"));
  });

  test("Should correct submit testWorker for new testWorker", async () => {
    const store = mockStore({ testWorker });
    store.dispatch(addWorker(testWorker));

    fireEvent.submit(
      screen.getByRole("button", { name: "Добавить сотрудника" })
    );
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual({
      type: "workersListSlice/addWorker",
      payload: {
        birthday: "24.03.1982",
        id: 15,
        isArchive: true,
        name: "Иванна Калашникова",
        phone: "+7 (927) 488-2568",
        role: "waiter",
      },
    });
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Should correct submit testWorker for edit testWorker", async () => {
    const store = mockStore({ testWorker });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <WorkerForm edit={true} lastWorkerNumber={17} worker={testWorker} />
        </Provider>
      </MemoryRouter>
    );
    store.dispatch(editWorker(testWorker));
    fireEvent.submit(screen.getByRole("button", { name: "Изменить данные" }));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual({
      type: "workersListSlice/editWorker",
      payload: {
        birthday: "24.03.1982",
        id: 15,
        isArchive: true,
        name: "Иванна Калашникова",
        phone: "+7 (927) 488-2568",
        role: "waiter",
      },
    });
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("should display matching error when data birthday is invalid, date after 2020 years", async () => {
    fireEvent.input(screen.getByLabelText("Введите дату рождения"), {
      target: {
        value: "2024-01-01",
      },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Добавить сотрудника" })
    );
    expect(
      await screen.findByText("Выберите дату до 2020-12-31")
    ).toBeInTheDocument();
  });

  test("should display matching error when data birthday is invalid, date before 1960 years", async () => {
    fireEvent.input(screen.getByLabelText("Введите дату рождения"), {
      target: {
        value: "1959-01-01",
      },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Добавить сотрудника" })
    );
    expect(
      await screen.findByText("Выберите дату после 1960-01-01")
    ).toBeInTheDocument();
  });
});
