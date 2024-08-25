import { useContext } from "react";
import ProductsContext from "../../../context/products-context";
import Slider from "../slider/Slider";
import Loader from "../../UI/Loader";
import { Navigate } from "react-router";

const getRandomKeys = (obj, numKeys) => {
  const keys = Object.keys(obj);
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
  const selectedKeys = keys.slice(0, numKeys);
  const result = [];
  selectedKeys.forEach((key) => {
    result.push(obj[key]);
  });
  return result;
};

const MightBeInterestingContent = () => {
  const context = useContext(ProductsContext);

  const elements = getRandomKeys(context.products, 6);

  if (context.isLoading || !elements || !context.products) {
    return <Loader />;
  }

  if (context.httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={context.httpErrorMessage}
        replace
      />
    );
  }

  console.log(elements);
  return <Slider slidersInfo={elements} />;
};

export default MightBeInterestingContent;
