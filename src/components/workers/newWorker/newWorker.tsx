import "./newWorker.scss";
import { useForm } from "react-hook-form";
import { INewWorker } from "../../../types/workerInterface";
import { useDispatch } from "react-redux";
import { addWorker } from "../../../app/workesListSlice";
import { useNavigate } from "react-router-dom";

function NewWorker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewWorker>();

  const handleFormSubmit = async (data: INewWorker) => {
    try {
      dispatch(addWorker(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="newWorker-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Введите ваше имя</label>
      <input
        {...register("name", {
          pattern: {
            value: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9-]+$/,
            message:
              "Имя пользователя должно начинаться с буквы и быть минимум 2 символа",
          },
        })}
        type="text"
        placeholder="Введите имя"
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
        required
      />
      {errors.birthday && <span>{errors.birthday.message}</span>}
      <label htmlFor="phone">Введите номер телефона</label>
      <input
        {...register("phone", {
          pattern: {
            value: /^\+7\s(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/,
            message:
              "Введите номер в формате: +7 999-999-99-99 или +79999999999",
          },
        })}
        type="tel"
        placeholder="Введите номер телефона"
        required
      />
      {errors.phone && <span>{errors.phone.message}</span>}
      <select {...register("role")} required>
        <option value="">-- Выберите должность --</option>
        <option value="cook">Повар</option>
        <option value="waiter">Официант</option>
        <option value="driver">Водитель</option>
      </select>
      {errors.role && <span>{errors.role.message}</span>}
      <label>
        <input {...register("isArchive")} type="checkbox" />
        Добавить в архив?
      </label>
      <button type="submit">Добавить работника</button>
    </form>
  );
}

export { NewWorker };
