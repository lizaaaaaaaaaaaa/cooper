import styles from "./Intro.module.scss";
import Slider from "./Slider";
import ItemInfo from "./itemInfo/ItemInfo";
import { useState } from "react";

const Intro = () => {
  const [info, setInfo] = useState(null);
  const [receivingNav1, setReceivingNav1] = useState(null);
  const [receivingNav2, setReceivingNav2] = useState(null);
  const [receivingLength, setReceivingLength] = useState(null);
  const takeDataHandler = (data) => {
    setInfo(data);
  };

  const takeNav1Handler = (nav1) => {
    setReceivingNav1(nav1);
  };

  const takeNav2Handler = (nav2) => {
    setReceivingNav2(nav2);
  };

  const takeDistillersCountHandler = (count) => {
    setReceivingLength(count);
  };

  return (
    <div className={styles.intro}>
      <div className={`container ${styles["intro__inner"]}`}>
        <div className={styles["intro__content"]}>
          <h1 className={styles["intro__title"]}>Хит продаж</h1>
          <ItemInfo
            name={info?.name}
            price={info?.price}
            nav1={receivingNav1}
            onTakeNav2={takeNav2Handler}
            distillersCount={receivingLength}
          />
        </div>
        <Slider
          onData={takeDataHandler}
          onTakeNav1={takeNav1Handler}
          nav2={receivingNav2}
          onTakeDistillersCount={takeDistillersCountHandler}
        />
      </div>

      <h1 className={styles["intro__label"]}>COPPER PRO</h1>
    </div>
  );
};

export default Intro;
