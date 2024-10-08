import { useContext } from "react";
import styles from "./CartProducts.module.scss";
import CartContext from "../../../context/cart-context";
import CartProductItem from "./CartProductItem";

const CartProducts = () => {
  const { products } = useContext(CartContext);
  const tableItems = products.map((product, index) => (
    <CartProductItem
      key={index}
      id={product.id}
      image={product.image}
      name={product.name}
      amount={product.amount}
      price={product.price}
    />
  ));

  return (
    <div className={styles.cart__products}>
      <div className={styles.cart__headings}>
        <div>Товар</div>
        <div>Количество</div>
        <div>Цена</div>
      </div>
      <div className={styles.cart__body}>
        {products.length === 0 ? (
          <p className={styles.cart__empty}>Ваша корзина пуста!</p>
        ) : (
          tableItems
        )}
      </div>
    </div>
  );
};

export default CartProducts;
