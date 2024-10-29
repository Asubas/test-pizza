import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import {
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../app/workesListSlice";

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
        По Имени
      </button>
      <button type="button" onClick={handleSortByBirthday}>
        По дате рождения
      </button>
    </>
  );
});

export { SortContainer };
