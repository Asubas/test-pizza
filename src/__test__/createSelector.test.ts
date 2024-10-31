import { selectFilteredWorkers } from "../utils/createSelector";

describe("Should correct return workers list or worker", () => {
  const initialState = (job = "", inArchive = "") => ({
    workers: {
      workerList: [
        {
          id: 1,
          name: "Илья Емельянфф",
          isArchive: false,
          role: "driver",
          phone: "+7 (883) 508-3269",
          birthday: "12.02.1982",
        },
        {
          id: 2,
          name: "Александр Ларионов",
          isArchive: true,
          role: "waiter",
          phone: "+7 (823) 440-3602",
          birthday: "26.01.1986",
        },
      ],
      selectedJob: job,
      showArchived: inArchive,
      sortByNameAsc: true,
      sortByBirthdayAsc: true,
    },
  });

  test("Should filtered worker list by job", () => {
    const stateForDriver = initialState("driver");
    const filteredWorkers = selectFilteredWorkers(stateForDriver);
    expect(filteredWorkers).toHaveLength(1);
    expect(filteredWorkers[0].name).toBe("Илья Емельянфф");
  });

  test("Should filtered worker list by archive", () => {
    const stateForArchive = initialState("", "inArchive");
    const filteredWorkers = selectFilteredWorkers(stateForArchive);
    expect(filteredWorkers).toHaveLength(1);
    expect(filteredWorkers[0].name).toBe("Александр Ларионов");
  });
});
