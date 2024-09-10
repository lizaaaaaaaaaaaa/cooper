import { useContext } from "react";
import styles from "./OrderProducts.module.scss";
import CartContext from "../../../../context/cart-context";
import OrderProductItem from "./OrderProductItem";

const OrderProducts = () => {
  const { products } = useContext(CartContext);

  const orderListProducts = products.map((product) => (
    <OrderProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      image={product.image}
      amount={product.amount}
      isSale={product.isSale}
      price={product.price}
      salePrice={product.salePrice}
    />
  ));
  return (
    <section className={styles.order__productsContainer}>
      <ul
        className={`${styles.order__products} ${
          products.length > 1 ? styles["order__products-scroll"] : ""
        }`}
      >
        {orderListProducts}
      </ul>
    </section>
  );
};

export default OrderProducts;
