import styles from "./MightBeInteresting.module.scss";
import MightBeInterestingContent from "./MightBeInterestingContent";

const MightBeInteresting = () => {
  return (
    <section className={`section ${styles.interesting}`}>
      <div className="container">
        <div className="title">Вам также будет интересно...</div>
        <MightBeInterestingContent />
      </div>
    </section>
  );
};

export default MightBeInteresting;
