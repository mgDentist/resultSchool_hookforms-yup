import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; // npm install @hookform/resolvers
import { useRef } from "react";
import style from "./App.module.css";

const sendFormData = (registrationData) => {
  console.log(registrationData);
};

const fieldSchema = yup.object().shape({
  login: yup
    .string()
    .required("Поле 'логин' обязательно для заполнения")
    .matches(
      /^[\w_]*$/,
      "Неверный логин. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание"
    )
    .min(3, "Неверный логин. Должно быть не меньше 3 символов")
    .max(20, "Неверный логин. Должно быть не больше 20 символов"),
  password: yup
    .string()
    .required("Поле 'пароль' обязательно для заполнения")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Неверный пароль. Допустимые символы: латинские буквы и цифры"
    )
    .min(6, "Неверный пароль. Должно быть не меньше 6 символов")
    .max(20, "Неверный пароль. Должно быть не больше 20 символов"),
  repeatPassword: yup
    .string()
    .required("Поле 'повторите пароль' обязательно для заполнения")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

function App() {
  const {
    register, // функция регистрации инпутов в реакт хук форм
    handleSubmit, // функция для обработки данных формы
    formState: { errors }, // объект с ошибками валидации
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      repeatPassword: "",
    }, // начальные значения инпутов
    resolver: yupResolver(fieldSchema), // валидация инпутов по схеме
    mode: "onChange", //отследивания изменений по вводу данных в поля
  }); // вызов хука

  const loginError = errors.login?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;

  const submitButtonRef = useRef(null);

  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <form onSubmit={handleSubmit(sendFormData)} className={style.form}>
          {loginError && <div className={style.errorLabel}>{loginError}</div>}
          {passwordError && (
            <div className={style.errorLabel}>{passwordError}</div>
          )}
          {repeatPasswordError && (
            <div className={style.errorLabel}>{repeatPasswordError}</div>
          )}
          <input
            className={style.input}
            name="login"
            type="text"
            placeholder="Введите ваш логин"
            {...register("login")}
          />

          <input
            className={style.input}
            name="password"
            type="password"
            placeholder="Введите ваш пароль"
            {...register("password")}
          />

          <input
            className={style.input}
            name="repeatPassword"
            type="password"
            placeholder="Повторите ваш пароль"
            {...register("repeatPassword")}
          />

          <button
            className={style.buttonSubmit}
            ref={submitButtonRef}
            type="submit"
            disabled={!!loginError || !!passwordError || !!repeatPasswordError}
          >
            Зарегистрироваться
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
