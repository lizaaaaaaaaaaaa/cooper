import styles from "../Intro.module.scss";

const ItemInfo = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.price}</div>
      <button>Купить</button>
    </div>
  );
};

export default ItemInfo;
