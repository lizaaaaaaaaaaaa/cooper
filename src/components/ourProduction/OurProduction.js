import styles from "./OurProduction.module.scss";
import ProductionList from "./ProductionList";

const OurProduction = () => {
  return (
    <section className={`section ${styles.production}`}>
      <div className="container">
        <h1 className="title">Наша продукция</h1>
        <ProductionList/>
      </div>
    </section>
  );
};

export default OurProduction;
