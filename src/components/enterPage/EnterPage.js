import React from "react";
import { NavLink } from "react-router-dom";
import EnterForm from "./EnterForm";
import styles from "./EnterPage.module.scss";
import Footer from "./../footer/Footer";
import Header from "./../header/Header";

const EnterPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className={` content ${styles.enter__container}`}>
        <div className="container">
          <NavLink to="/main" replace>
            <button className={styles.enter__link}>На главную</button>
          </NavLink>
          <div className={styles.enter__content}>
            <EnterForm />
            <div className={styles.enter__button}>
              <span>Нету аккаунта?</span>
              <NavLink
                className={styles["enter__button-nav"]}
                to="/cooper/registration"
                replace
              >
                Регистрация
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnterPage;
