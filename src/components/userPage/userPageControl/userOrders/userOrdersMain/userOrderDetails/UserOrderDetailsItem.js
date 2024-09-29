import SlicePrice from "../../../../../UI/SlicePrice";
import styles from "./UserOrderDetailsItem.module.scss";
import { NavLink } from "react-router-dom";

const UserOrderDetailsItem = (props) => {
  return (
    <ul className={styles.user__detailsItem}>
      {props.products.map((item) => (
        <li>
          <NavLink
            to={`/catalog/${item.id}`}
            className={styles.user__detailsLink}
          >
            <div>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
            </div>
            <p>{item.amount} шт.</p>
            <p>
              <SlicePrice
                priceToSlice={
                  item.isSale
                    ? item.salePrice.toString()
                    : item.price.toString()
                }
              />{" "}
              грн.
            </p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default UserOrderDetailsItem;
