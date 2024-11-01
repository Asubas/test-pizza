import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { ErrorPage } from "../error-page";
import "@testing-library/jest-dom";

describe("Render ErrorPage component", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ErrorPage />
      </Provider>
    </BrowserRouter>,
  );

  test("Should be correct render", () => {
    expect(screen.getByText("Sorry something went wrong!")).toBeInTheDocument();
  });
});
