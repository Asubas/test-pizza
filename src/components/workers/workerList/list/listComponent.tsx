import { useCallback, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToArchive } from "../../../../app/workersListSlice";
import { selectFilteredWorkers } from "../../../../utils/createSelector";
import { CheckBoxComponent } from "../checkBox/checkBoxComponent";
import { MemoizedLink } from "../memoizedLink";

const ListComponent = () => {
  const dispatch = useDispatch();
  const filteredWorkers = useSelector(selectFilteredWorkers);

  const handleClickArchive = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(addToArchive(Number(event.target.id)));
    },
    [dispatch]
  );
  return (
    <>
      {filteredWorkers && filteredWorkers.length > 0 ? (
        <ul className="worker-list">
          {filteredWorkers.map((element) => (
            <li key={element.id}>
              <MemoizedLink
                className={"worker-name"}
                to={`/worker/${element.id}`}
              >
                {element.name}
              </MemoizedLink>
              <label className="worker-archived" htmlFor={`${element.id}`}>
                архив
                <CheckBoxComponent
                  id={`${element.id}`}
                  onChange={handleClickArchive}
                  isArchive={element.isArchive}
                />
              </label>
              <span className="worker-role">{element.role}</span>
              <span className="worker-tel">{element.phone}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Список сотрудников пустой!</div>
      )}
    </>
  );
};

export { ListComponent };
