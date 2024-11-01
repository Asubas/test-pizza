import { useDispatch } from "react-redux";
import { memo } from "react";
import {
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../app/workersListSlice";

const SortContainer = memo(() => {
  const dispatch = useDispatch();

  const handleSortByName = () => dispatch(sortWorkerByName());
  const handleSortByBirthday = () => dispatch(sortWorkerByBirthday());
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
