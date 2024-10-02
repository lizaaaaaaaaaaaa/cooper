import styles from "./RegForm.module.scss";
import Button from "./../UI/Button";

const RegForm = () => {
  return (
    <form className={styles.reg__form}>
      <div className={styles.reg__title}>Регистрация</div>
      <label htmlFor="email">
        <input type="text" id="email" name="email" placeholder="E-mail" />
      </label>
      <label htmlFor="password">
        <input type="password" id="password" name="password" placeholder="Пароль" />
      </label>
      <label htmlFor="name">
        <input type="text" id="name" name="name" placeholder="Имя" />
      </label>
      <Button type="submit" className={styles.reg__btn}>Регистрация</Button>
    </form>
  );
};

export default RegForm;
