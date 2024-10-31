import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import {
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../app/workersListSlice";

const SortContainer = memo(() => {
  const dispatch = useDispatch();

  const handleSortByName = useCallback(
    () => dispatch(sortWorkerByName()),
    [dispatch]
  );
  const handleSortByBirthday = useCallback(
    () => dispatch(sortWorkerByBirthday()),
    [dispatch]
  );

  return (
    <>
      <button type="button" onClick={handleSortByName}>
        Сортировать по имени
      </button>
      <button type="button" onClick={handleSortByBirthday}>
        Сортировать по дате рождения
      </button>
    </>
  );
});

export { SortContainer };
