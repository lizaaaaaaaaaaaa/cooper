import styles from "./Sales.module.scss"
import SalesContent from "./SalesContent";

const Sales = () => {
  return (
    <section className={`section ${styles.sales}`}>
      <div className="container">
        <h1 className="title">Скидки</h1>
        <SalesContent />
      </div>
    </section>
  );
};

export default Sales;
