import { EditWorker } from "../../../../components/workers/editWorker/editWorker";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../app/store";
// import configureStore from "redux-mock-store";

// const testWorker = {
//   id: 15,
//   name: "Иванна Калашникова",
//   isArchive: true,
//   role: "waiter",
//   phone: "+7 (927) 488-2568",
//   birthday: "24.03.1982",
// };

// const useSelector = jest.fn();
// const mockStore = configureStore();
describe("Should correct render component EditWorker", () => {
  test("Should return correct page without worker", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <EditWorker />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Работник не найден"));
  });

  //   test("Should return correct form if worker have", () => {
  //     const testStore = mockStore({
  //       workers: {
  //         workerList: [testWorker],
  //       },
  //     });
  //     render(
  //       <MemoryRouter initialEntries={["/worker/15"]}>
  //         <Provider store={testStore}>
  //           <EditWorker />
  //         </Provider>
  //       </MemoryRouter>
  //     );
  //     act(() => {
  //       expect(window.location.pathname).toBe("/");
  //       expect(screen.getByText("Изменить данные")).toBeInTheDocument();
  //       useSelector.mockClear();
  //     });
  //   });
});
