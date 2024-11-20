import reducer, {
  addToArchive,
  addWorker,
  editWorker,
  setWorkers,
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../app/workersListSlice";

describe("Test reducers", () => {
  const initialState = {
    workerList: [],
    selectedJob: "string",
    showArchived: "",
    sortByNameAsc: false,
    sortByBirthdayAsc: false,
  };

  test("Should set a worker", () => {
    const action = setWorkers([
      { id: 1, name: "Леха" },
      { id: 2, name: "Девелопер" },
    ]);
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(2);
    expect(state.workerList[0].name).toEqual("Леха");
  });

  test("Should added a new worker", () => {
    const action = addWorker({ id: 3, name: "Женя" });
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(1);
    expect(state.workerList[0].name).toEqual("Женя");
  });

  test("Should edit a current worker", () => {
    const initialState = {
      workerList: [
        {
          id: 1,
          name: "Илья Емельянфф",
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
    };
    const action = editWorker({
      id: 1,
      editWorker: {
        name: "Женя",
        isArchive: false,
        role: "driver",
        phone: "+7 (883) 508-3269",
        birthday: "12.02.1982",
      },
    });
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(1);
    expect(state.workerList[0].name).toEqual("Женя");
  });

  test("Should sort workers list by name", () => {
    const initialState = {
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
      sortByNameAsc: false,
      sortByBirthdayAsc: true,
      selectedJob: "",
      showArchived: "",
    };
    const action = sortWorkerByName();
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(2);
    expect(state.workerList[0].name).toEqual("Александр Ларионов");
  });

  test("Should sort workers list by birthday date", () => {
    const initialState = {
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
      sortByNameAsc: true,
      sortByBirthdayAsc: false,
      selectedJob: "",
      showArchived: "",
    };
    const action = sortWorkerByBirthday();
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(2);
    expect(state.workerList[0].name).toEqual("Илья Емельянфф");
  });

  test("Should add to archive worker", () => {
    const initialState = {
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
      sortByNameAsc: true,
      sortByBirthdayAsc: true,
      selectedJob: "",
      showArchived: "",
    };
    const action = addToArchive(1);
    const state = reducer(initialState, action);
    expect(state.workerList).toHaveLength(2);
    expect(state.workerList[0].isArchive).toEqual(true);
  });
});
