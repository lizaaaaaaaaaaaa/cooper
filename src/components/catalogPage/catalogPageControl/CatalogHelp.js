import { useState } from "react";
import styles from "./CatalogHelp.module.scss";

const CatalogHelp = () => {
  const [isSortListVisible, setIsSortListVisible] = useState(false);
  const [sortName, setSortName] = useState("По цене");

  const sortByPriceHandler = () => {
    setSortName("По цене");
    setIsSortListVisible(false);
  };

  const sortByNameHandler = () => {
    setSortName("За названием");
    setIsSortListVisible(false);
  };

  console.log(sortName);

  return (
    <div className={styles.catalog__help}>
      <div className={styles.catalog__search}>
        <input type="text" id="search" placeholder="Поиск" />
        <label htmlFor="search">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_59_16143)">
              <path
                d="M6.03703 12.0704C7.37775 12.0704 8.68012 11.6231 9.73785 10.7992L13.7283 14.7897C14.0264 15.0776 14.5014 15.0693 14.7893 14.7712C15.0702 14.4804 15.0702 14.0194 14.7893 13.7287L10.7989 9.7382C12.8432 7.10662 12.3671 3.31605 9.73555 1.27174C7.10396 -0.772579 3.31343 -0.296529 1.26911 2.33506C-0.775204 4.96665 -0.299154 8.75721 2.33243 10.8015C3.39189 11.6246 4.69543 12.071 6.03703 12.0704ZM2.83072 2.83103C4.60153 1.06018 7.47259 1.06015 9.24344 2.83097C11.0143 4.60178 11.0143 7.47284 9.24351 9.24369C7.47269 11.0145 4.60163 11.0146 2.83078 9.24376C2.83075 9.24372 2.83075 9.24372 2.83072 9.24369C1.0599 7.48578 1.04947 4.62519 2.80738 2.85437C2.81515 2.84657 2.82292 2.8388 2.83072 2.83103Z"
                fill="#031412"
              />
            </g>
            <defs>
              <clipPath id="clip0_59_16143">
                <rect width="15" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </label>
      </div>
      <div className={styles.catalog__sort}>
        <button
          className={styles.catalog__btn}
          onClick={() => setIsSortListVisible(!isSortListVisible)}
        >
          Сортировка:<span>{sortName}</span>
          <span
            className={`${styles.catalog__arrow} ${
              isSortListVisible ? styles["catalog__arrow-active"] : ""
            }`}
          >
            &#10094;
          </span>
        </button>
        <ul
          className={`${styles.catalog__list} ${
            isSortListVisible ? styles["catalog__list-active"] : ""
          }`}
        >
          <li>
            <button
              onClick={sortByPriceHandler}
              disabled={sortName === "По цене"}
            >
              По цене
            </button>
          </li>
          <li>
            <button
              onClick={sortByNameHandler}
              disabled={sortName === "За названием"}
            >
              За названием
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatalogHelp;
