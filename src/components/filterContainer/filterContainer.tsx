import { memo } from "react";

const FilterContainer = memo(
  ({
    filterByJob,
    filterByArchive,
  }: {
    filterByJob: (job: string) => void;
    filterByArchive: () => void;
  }) => {
    const handleSortByJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
      filterByJob(event.target.value);
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
        <button type="button" onClick={filterByArchive}>
          Сортировать по архиву
        </button>
      </div>
    );
  }
);

export { FilterContainer };
