import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const menuActivity = () => {
    if (
      window.innerWidth < 580 ||
      (window.innerHeight <= 600 &&
        window.innerWidth >= 630 &&
        window.innerWidth <= 1000)
    ) {
      return false;
    } else {
      return true;
    }
  };
  const [isMenuActive, setIsMenuActive] = useState(menuActivity());

  useEffect(() => {
    const handleResize = () => {
      setIsMenuActive(menuActivity());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      isMenuActive &&
      (window.innerWidth < 580 ||
        (window.innerHeight <= 600 &&
          window.innerWidth >= 630 &&
          window.innerWidth <= 1000))
    ) {
      document.body.classList.add(styles.lock);
    } else document.body.classList.remove(styles.lock);
  }, [isMenuActive]);

  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const isRegOrEnterOrOrderorSuccessfulPage =
    location.pathname === "/registration" ||
    location.pathname === "/enter" ||
    location.pathname === "/order" ||
    location.pathname === "/successful";
  let headerClassName;
  if (isMainPage) {
    headerClassName = `${styles.header}  ${styles["header-main"]}`;
  } else if (isRegOrEnterOrOrderorSuccessfulPage) {
    headerClassName = `${styles.header}  ${styles["header-auth"]}`;
  } else {
    headerClassName = styles.header;
  }

  const changeMenuActivity = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className={headerClassName}>
      <div className={`container ${styles["header__inner"]}`}>
        <NavLink to="/main" className={styles.logo}>
          <img src={logo} alt="logo" />
        </NavLink>
        {!isRegOrEnterOrOrderorSuccessfulPage && (
          <React.Fragment>
            <nav>
              <Nav activeMenu={isMenuActive} />
            </nav>
            <HeaderInfo activeMenu={isMenuActive} />
            <button
              className={
                !isMenuActive
                  ? `${styles.menu}`
                  : `${styles.menu} ${styles.active}`
              }
              onClick={changeMenuActivity}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
