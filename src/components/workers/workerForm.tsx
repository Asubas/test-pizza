import "./workerForm.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addWorker, editWorker } from "../../app/workersListSlice";
import { INewWorker, IWorker } from "../../types/workerInterface";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { successWorker, errorSubmitForm } from "../../utils/toastOption";

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
        toast.success("Данные сотрудника успешно добавлены!", successWorker);
      } else if (edit) {
        data.id = worker?.id;
        dispatch(editWorker({ id: worker?.id, editWorker: { ...data } }));
        toast.success("Данные сотрудника успешно изменены!", successWorker);
      }
      navigate("/");
    } catch (error) {
      toast.error(
        "Ошибка отправки формы!Что то пошло не так!",
        errorSubmitForm
      );
      console.error("Ошибка", error);
    }
  };

  return (
    <form className="workerForm-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Введите имя сотрудника</label>
      <input
        {...register("name", {
          pattern: {
            value: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9-_. ]*$/,
            message:
              "Имя пользователя должно начинаться с буквы и быть минимум 2 символа",
          },
        })}
        id="name"
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
        id="birthday"
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
            value: /^(8|\+7)[ -]?(\(?\d{3}\)?[ -]?)[\d -]{7,10}$/,
            message: "Введите номер телефона в формате +7 или начиная с 8",
          },
        })}
        id="phone"
        type="tel"
        placeholder="+7 (999) 999 9999"
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
      <label className="workerForm-checkbox">
        <input
          {...register("isArchive")}
          type="checkbox"
          defaultChecked={worker ? worker.isArchive : false}
        />
        Архив
      </label>
      <button type="submit">
        {edit ? "Изменить данные" : "Добавить сотрудника"}
      </button>
      <Link to={"/"}>На главную</Link>
    </form>
  );
}

export { WorkerForm };
