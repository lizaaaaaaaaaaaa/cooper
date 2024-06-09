import styles from "./Loader.module.scss";

const Loader = (props) => {
  return (
    <section className={`${styles["loader-container"]} ${props.className}`}>
      <div className={styles.loader}></div>
    </section>
  );
};

export default Loader;
