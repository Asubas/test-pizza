import "./workerForm.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addWorker, editWorker } from "../../app/workesListSlice";
import { INewWorker, IWorker } from "../../types/workerInterface";
import { useDispatch } from "react-redux";

function WorkerForm({
  edit = false,
  lastWorkerNumber = 0,
  worker,
}: {
  edit?: boolean;
  lastWorkerNumber?: number;
  worker?: IWorker;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewWorker | IWorker>();

  const handleFormSubmit = async (data: INewWorker | IWorker) => {
    try {
      if (!edit) {
        data.id = lastWorkerNumber;
        dispatch(addWorker(data));
      } else if (edit) {
        data.id = worker?.id;
        dispatch(editWorker({ id: worker?.id, editWorker: { ...data } }));
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="newWorker-form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <label htmlFor="name">Введите имя сотрудника</label>
        <input
          {...register("name", {
            pattern: {
              value: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9-_. ]*$/,
              message:
                "Имя пользователя должно начинаться с буквы и быть минимум 2 символа",
            },
          })}
          type="text"
          placeholder="Введите имя"
          defaultValue={worker ? worker.name : ""}
          required
        />
        {errors.name && <span>{errors.name.message}</span>}
        <label htmlFor="birthday">Введите дату рождения</label>
        <input
          {...register("birthday", {
            validate: (value) => {
              if (value < "1960-01-01") {
                return "Выберите дату после 1960-01-01";
              }
              if (value > "2020-12-31") {
                return "Выберите дату до 2020-12-31";
              }
              return true;
            },
          })}
          type="date"
          placeholder="Введите дату рождения"
          defaultValue={
            worker ? worker.birthday.split(".").reverse().join("-") : ""
          }
          required
        />
        {errors.birthday && <span>{errors.birthday.message}</span>}
        <label htmlFor="phone">Введите номер телефона</label>
        <input
          {...register("phone", {
            pattern: {
              value: /^((8|\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{7,10}$/,
              message: "Введите номер телефона в формате +7 или начиная с 8",
            },
          })}
          type="tel"
          placeholder="Введите номер телефона"
          defaultValue={worker ? worker.phone : ""}
          required
        />
        {errors.phone && <span>{errors.phone.message}</span>}
        <select
          {...register("role")}
          defaultValue={worker ? worker.role : ""}
          required
        >
          <option value="">-- Выберите должность --</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
        <label>
          <input
            {...register("isArchive")}
            type="checkbox"
            defaultChecked={worker ? worker.isArchive : false}
          />
          Добавить в архив?
        </label>
        <button type="submit">
          {edit ? "Изменить данные" : "Добавить сотрудника"}
        </button>
        <Link to={"/"}>На главную</Link>
      </form>
    </>
  );
}

export { WorkerForm };
