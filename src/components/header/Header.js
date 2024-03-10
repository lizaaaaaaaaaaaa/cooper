import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 580) {
      setIsMenuActive(false);
    }
  }, []);

  const changeMenuActivity = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    if (isMenuActive) {
      document.body.classList.add(styles.lock);
    } else document.body.classList.remove(styles.lock);
  }, [isMenuActive]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles["header__inner"]}`}>
        <a href="" className={styles.logo}>
          <img src={logo} alt="logo" />
        </a>
        <nav>
          <Nav activeMenu={isMenuActive} />
        </nav>
        <HeaderInfo activeMenu={isMenuActive} />
        <button
          className={
            !isMenuActive ? `${styles.menu}` : `${styles.menu} ${styles.active}`
          }
          onClick={changeMenuActivity}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
