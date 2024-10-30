import { workerList } from "../../utils/workerList";
import "@testing-library/jest-dom";

describe("Test from workList function", () => {
  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("Should return emptyArray", async () => {
    const mockData = [{ id: 1, name: "Worker 1" }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    const result = await workerList();
    expect(result).toEqual(mockData);
  });

  test("Should return error", async () => {
    const errorMessage = "Ошибка при получении данных: Not Found";
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });
    const result = await workerList();
    expect(result).toEqual([]);
    expect(consoleError).toHaveBeenCalledWith(
      "Ошибка:",
      new Error(errorMessage)
    );
    consoleError.mockRestore();
  });
});
