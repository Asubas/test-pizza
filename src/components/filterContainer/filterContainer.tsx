import { memo } from "react";

const FilterContainer = memo(
  ({
    filterByJob,
    filterByArchive,
  }: {
    filterByJob: (job: string) => void;
    filterByArchive: (inArchive: string) => void;
  }) => {
    const handleSortByJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
      filterByJob(event.target.value);
    };
    const handleSortByArchive = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      filterByArchive(event.target.value);
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
        <select name="city" id="archive" onChange={handleSortByArchive}>
          <option value="">-- Сортировтаь по архиву --</option>
          <option value="inArchive">В архиве</option>
          <option value="noArchive">Не в архиве</option>
        </select>
      </div>
    );
  }
);

export { FilterContainer };
