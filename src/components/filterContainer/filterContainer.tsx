import "./filterContainer.scss";
import { memo, useCallback } from "react";

const FilterContainer = memo(
  ({
    filterByJob,
    filterByArchive,
  }: {
    filterByJob: (job: string) => void;
    filterByArchive: (inArchive: string) => void;
  }) => {
    const handleSortByJob = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        filterByJob(event.target.value);
      },
      [filterByJob]
    );
    const handleSortByArchive = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        filterByArchive(event.target.value);
      },
      [filterByArchive]
    );

    return (
      <div className="sort-section-select">
        <label htmlFor="job">Должность</label>
        <select name="city" id="job" onChange={handleSortByJob}>
          <option value="">-- Отфильтровать по должности --</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        <label htmlFor="archive">Архив</label>
        <select name="archive" id="archive" onChange={handleSortByArchive}>
          <option value="">-- Отфильтровать по архиву --</option>
          <option value="inArchive">В архиве</option>
          <option value="noArchive">Не в архиве</option>
        </select>
      </div>
    );
  }
);

export { FilterContainer };
