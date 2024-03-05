import styles from "./Intro.module.scss";
import Slider from "./Slider";
import ItemInfo from "./itemInfo/ItemInfo";
import { useState } from "react";

const Intro = () => {
  const [info, setInfo] = useState(null);
  const takeData = (data) => {
    setInfo(data);
  };
  return (
    <div className={styles.intro}>
      <div className={`container ${styles["intro__inner"]}`}>
        <div className={styles["intro__content"]}>
          <h1 className={styles["intro__title"]}>Хит продаж</h1>
          <ItemInfo name={info?.name} price={info?.price} />
        </div>
        <Slider onData={takeData} />
      </div>

      <h1 className={styles["intro__label"]}>COPPER PRO</h1>
    </div>
  );
};

export default Intro;
