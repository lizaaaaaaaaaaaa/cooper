import styles from "./NewsItem.module.scss";
import { Link, useLocation } from "react-router-dom";

const NewsItem = (props) => {
    const location = useLocation()

  const promoText =
    props.content.find((item) => item.type === "paragraph").text ||
    "Пользу эфирных масел трудно переоценить. Они, безусловно, полезны для человека, но если говорить о домашних животных, то здесь возникают некоторые нюансы. Необходимо строго придерживаться определенных правил.";
  const maxPromoTextLength = 207;

  return (
    <li className={styles.news__item}>
      <div
        className={styles.news__promo}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <span>{props.date}</span>
        <h3>{props.title}</h3>
      </div>
      <p>
        {promoText.length < maxPromoTextLength
          ? promoText
          : `${promoText.slice(0, maxPromoTextLength)}...`}
      </p>
      <Link to={`${location.pathname}/${props.id}`} className={styles.news__link}>
        Читать больше <span>&#10095;</span>
      </Link>
    </li>
  );
};

export default NewsItem;
