import App from "../App";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";

describe("Render App component", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
});

test("Should be correct render", () => {
  expect(screen.getByText("Должность")).toBeInTheDocument();
});
