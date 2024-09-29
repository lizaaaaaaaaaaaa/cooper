import styles from "./UserOrderProductsShort.module.scss";

const UserOrderProductsShort = (props) => {
  const imagesCountToShow =
    props.products.length > 3 ? 2 : props.products.length;
  return (
    <div className={styles.user__orderProducts}>
      {props.products.slice(0, imagesCountToShow + 1).map((element, index) => (
        <img
          key={index + 1}
          src={element.image}
          className={styles.user__orderImage}
          alt={element.name}
        />
      ))}
    </div>
  );
};

export default UserOrderProductsShort;
