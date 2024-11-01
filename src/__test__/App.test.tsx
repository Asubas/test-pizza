import App from "../App";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { RootState } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore<RootState>();
const store = mockStore({
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
    selectedJob: "",
    showArchived: "",
  },
});
describe("Render App component", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );

  test("Should be correct render", () => {
    expect(screen.getByText("Должность")).toBeInTheDocument();
  });
});
