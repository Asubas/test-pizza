import { useDispatch } from "react-redux";
import { filterWorkerByRole } from "../../slices/workesListSlice";

function FilterContainer() {
  const dispatch = useDispatch();
  const handleSortByJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    dispatch(filterWorkerByRole(selectedRole));
  };

  return (
    <div>
      <label htmlFor="job">Должность</label>
      <select name="city" id="job" onChange={handleSortByJob}>
        <option value="">-- Сортировтаь по должности --</option>
        <option value="cook">Повар</option>
        <option value="waiter">Официант</option>
        <option value="driver">Водитель</option>
      </select>
    </div>
  );
}

export { FilterContainer };
