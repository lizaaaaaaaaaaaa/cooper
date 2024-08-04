import styles from "./CatalogBtnControls.module.scss";

const BTN_FILTERS = [
  { text: "Для эфирных масел" },
  { text: "Для гидролатов" },
  { text: "Медная посуда" },
  { text: "Аксессуары из меди" },
];

const CatalogBtnControls = (props) => {
  return (
    <div className={styles.catalog__controls}>
      {BTN_FILTERS.map((btn, index) => (
        <button key={index} onClick={() => props.onGetCurrentFilter(btn.text)}>
          <span>{btn.text}</span>
        </button>
      ))}
    </div>
  );
};

export default CatalogBtnControls;
