const SlicePrice = (props) => {
    
  const slicePriceHandler = (number) => {
    switch (number.length) {
      case 4:
        return `${number.slice(0, 1)} ${number.slice(1, 4)}`;

      case 5:
        return `${number.slice(0, 2)} ${number.slice(2, 5)}`;

      case 6: {
        return `${number.slice(0, 3)} ${number.slice(3, 6)}`;
      }
      default:
        return number;
    }
  };

  return slicePriceHandler(props.priceToSlice);
};

export default SlicePrice;
