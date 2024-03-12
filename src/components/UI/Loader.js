import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <section className={styles["loader-container"]}>
      <div className={styles.loader}></div>
    </section>
  );
};

export default Loader;
