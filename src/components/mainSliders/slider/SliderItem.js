import "./Slider.scss";

const SliderItem = (props) => {
  return (
    <div className="slider__item">
      {props.isSale && <span className="slider__badge">Sale</span>}
      <img src={props.image} className="slider__image" alt="product" />
      <div className="slider__content">
        <h5 className="slider__name">{props.name}</h5>
        {!props.isSale && (
          <span className="slider__price">{props.price} грн</span>
        )}
        {props.isSale && (
          <div className="slider__sale">
            <span className="slider__sale-old">{props.price} грн</span>
            <span className="slider__sale-new">{props.salePrice} грн</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderItem;
