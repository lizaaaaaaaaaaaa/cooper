import styles from "../Intro.module.scss";
import Button from "../../UI/Button";
import DotsSliderItem from "./DotsSliderItem";

const ItemInfo = ({ distillersCount, name, price, activeSlide, onDotClick }) => {
    
  const handleDotClick = (index) => {
    onDotClick(index);
  };

  const sliderItems = Array.from({ length: distillersCount }).map(
    (_, index) => (
      <DotsSliderItem
        key={index}
        isSlideActive={index === activeSlide}
        onClick={() => handleDotClick(index)} // Оновлено
      />
    )
  );

  return (
    <div className={styles["intro__info"]}>
      <h2 className={styles["intro__name"]}>{name}</h2>
      <div className={styles["intro__price"]}>
        Цена: <span>{price} грн</span>
      </div>
      <Button className={styles["intro__button"]}>Купить</Button>
      <div className={styles.intro__dots}>{sliderItems}</div>
    </div>
  );
};

export default ItemInfo;
