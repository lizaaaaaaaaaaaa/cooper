import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(true);
  //   const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY <= 200) {
  //         setIsHeaderTransparent(true);
  //       } else {
  //         setIsHeaderTransparent(false);
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const isRegOrEnterPage =
    location.pathname === "/registration" || location.pathname === "/enter";
  let headerClassName;
  if (isMainPage) {
    headerClassName = `${styles.header}  ${styles["header-main"]}`;
  } else if (isRegOrEnterPage) {
    headerClassName = `${styles.header}  ${styles["header-auth"]}`;
  } else {
    headerClassName = styles.header;
  }

  useEffect(() => {
    if (
      window.innerWidth < 580 ||
      (window.innerHeight <= 600 &&
        window.innerWidth >= 630 &&
        window.innerWidth <= 1000)
    ) {
      setIsMenuActive(!isMenuActive);
    }
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
  }, []);

  const changeMenuActivity = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className={headerClassName}>
      <div className={`container ${styles["header__inner"]}`}>
        <NavLink to="/main" className={styles.logo}>
          <img src={logo} alt="logo" />
        </NavLink>
        {!isRegOrEnterPage && (
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
