import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../app/store";
import { NewWorker } from "../../../../components/workers/newWorker/newWorker";

describe("Should correct render component NewWorker", () => {
  test("Should return correct page without worker", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NewWorker />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Введите имя сотрудника"));
  });
});
