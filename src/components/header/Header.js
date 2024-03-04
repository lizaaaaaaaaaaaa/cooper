import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles["header__inner"]}`}>
        <a href="">
          <img src={logo} alt="logo" />
        </a>
        <nav>
          <Nav />
        </nav>
        <HeaderInfo />
      </div>
    </header>
  );
};

export default Header;
