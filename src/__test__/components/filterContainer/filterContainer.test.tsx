import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterContainer } from "../../../components/filterContainer/filterContainer";

describe("Test filter container component", () => {
  const mockFilterByJob = jest.fn();
  const mockFilterByArchive = jest.fn();
  beforeEach(() => {
    render(
      <FilterContainer
        filterByJob={mockFilterByJob}
        filterByArchive={mockFilterByArchive}
      />
    );
  });

  test("changes job select value", () => {
    fireEvent.change(screen.getByLabelText("Должность"), {
      target: { value: "cook" },
    });

    expect(
      (screen.getByRole("option", { name: "Повар" }) as HTMLOptionElement)
        .selected
    ).toBeTruthy();
    expect(screen.getByText("Должность")).toBeInTheDocument();
  });

  test("changes archive select value", () => {
    fireEvent.change(screen.getByLabelText("Архив"), {
      target: { value: "inArchive" },
    });

    expect(
      (screen.getByRole("option", { name: "В архиве" }) as HTMLOptionElement)
        .selected
    ).toBeTruthy();
  });
});
