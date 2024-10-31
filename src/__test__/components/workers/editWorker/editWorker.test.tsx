import { EditWorker } from "../../../../components/workers/editWorker/editWorker";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../app/store";

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
});
