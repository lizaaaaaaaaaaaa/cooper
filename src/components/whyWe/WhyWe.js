import styles from "./WhyWe.module.scss";
import WhyWeItem from "./WhyWeItem";
import firstImage from "../../assets/whyWe/whyWe-1.jpg";
import secondImage from "../../assets/whyWe/whyWe-2.jpg";
import thirdImage from "../../assets/whyWe/whyWe-3.jpg";
import fourthImage from "../../assets/whyWe/whyWe-4.jpg";
import fifthImage from "../../assets/whyWe/whyWe-5.jpg";
import sixthImage from "../../assets/whyWe/whyWe-6.jpg";
import seventhImage from "../../assets/whyWe/whyWe-7.jpg";
import eighthImage from "../../assets/whyWe/whyWe-8.jpg";

const WHYWE_LIST = [
  {
    image: firstImage,
    title: "Аутентичность",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum non, odit repudiandae exercitationem provident modi ducimus voluptate labore vero possimus corporis amet ab consequatur, veniam quidem eveniet tempora pariatur inventore.",
  },
  {
    image: secondImage,
    title: "Изысканность",
    text: "Eveniet corporis nisi veritatis, adipisci possimus ducimus, explicabo.",
  },
  {
    image: thirdImage,
    title: "Честная оплата",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem unde eius, necessitatibus cum aut animi minus.",
  },
  {
    image: fourthImage,
    title: "Большой ассортимент",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur excepturi, laboriosam cumque nemo fugiat esse ipsa corrupti quia voluptates dicta?",
  },
  {
    image: fifthImage,
    title: "Доставка по всему миру",
    text: "Aspernatur excepturi, laboriosam cumque nemo fugiat esse ipsa corrupti quia voluptates dicta? Eveniet corporis nisi veritatis, adipisci possimus ducimus, excepturi, explicabo.",
  },
  {
    image: sixthImage,
    title: "Гарантия качества",
    text: "Sit amet consectetur adipisicing elit. Asperiores aut voluptatum alias quos quis, minima explicabo! Lorem ipsum dolor.",
  },
  {
    image: seventhImage,
    title: "Удобство в использовании",
    text: "Aspernatur excepturi, laboriosam cumque nemo fugiat esse ipsa corrupti quia voluptates dicta? Asperiores aut voluptatum alias quos quis, minima explicabo! Lorem ipsum dolor.",
  },
  {
    image: eighthImage,
    title: "Забота об окружающей среде",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit amet consectetur adipisicing elit. Asperiores aut voluptatum alias quos quis, minima explicabo! Lorem ipsum dolor.",
  },
];

const WhyWe = () => {
  return (
    <section className={`section ${styles["why-we"]}`}>
      <div className="container">
        <div className="title">Почему выбирают нас</div>
        <ul className={styles["why-we__list"]}>
          {WHYWE_LIST.map((item, index) => (
            <WhyWeItem
              key={index}
              title={item.title}
              text={item.text}
              image={item.image}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyWe;
