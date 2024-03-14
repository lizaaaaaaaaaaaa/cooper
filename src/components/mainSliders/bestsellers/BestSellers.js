import styles from "./BestSellers.module.scss";
import BestSellersContent from "./BestSellersContent";

const BestSellers = () => {
  return (
    <section className={`section ${styles.bestsellers}`}>
      <div className="container">
        <h1 className="title">Лучшие продажи</h1>
        <BestSellersContent />
      </div>
    </section>
  );
};

export default BestSellers;
