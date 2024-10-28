import { useDispatch } from "react-redux";
import {
  sortWorkerByBirthday,
  sortWorkerByName,
} from "../../slices/workesListSlice";

function SortContainer() {
  const dispatch = useDispatch();

  const handleSortByName = () => dispatch(sortWorkerByName());
  const handleSortByBirthday = () => dispatch(sortWorkerByBirthday());

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
}

export { SortContainer };
