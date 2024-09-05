import React, { useState, useEffect, useContext } from "react";
import ProductsContext from "./products-context";

const CartContext = React.createContext({
  products: [],
  totalProducts: 0,
  totalPrice: 0,
  addProduct: (id, userAmount) => {},
  removeProduct: (id) => {},
});

export const CartProvider = (props) => {
  const context = useContext(ProductsContext);
  const startProducts = JSON.parse(localStorage.getItem("cart"));

  const [products, setProducts] = useState(startProducts ? startProducts : []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const newTotalPrice = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.amount;
    }, 0);

    setTotalPrice(newTotalPrice);

    const newTotalProducts = products.reduce((accumulator, product) => {
      return accumulator + product.amount;
    }, 0);

    setTotalProducts(newTotalProducts);
  }, [products]);

  const addProductHandler = (id, userAmount) => {
    const product = context.products.find((product) => product.id === id);
    const cartProductsHasProductIndex = products.findIndex(
      (product) => id === product.id
    );

    let updatedProducts;
    if (cartProductsHasProductIndex !== -1) {
      const updatedProduct = {
        ...products[cartProductsHasProductIndex],
        amount: userAmount + products[cartProductsHasProductIndex].amount,
      };

      const newProductsForUpdate = [...products];
      newProductsForUpdate[cartProductsHasProductIndex] = updatedProduct;

      updatedProducts = newProductsForUpdate;
    } else {
      updatedProducts = [{ ...product, amount: userAmount }, ...products];
    }

    const productPrice = product.isSale ? product.salePrice : product.price;
    let newTotalPrice = totalPrice + productPrice * userAmount;

    setProducts(updatedProducts);
    setTotalPrice(newTotalPrice);

    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const removeProductHandler = (id) => {
    const productIndex = products.findIndex((product) => id === product.id);
    const newProducts = products.filter((product) => id !== product.id);
    const newPrice =
      totalPrice - products[productIndex].price * products[productIndex].amount;

    setProducts(newProducts);
    setTotalPrice(newPrice);

    localStorage.setItem("cart", JSON.stringify(newProducts));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalProducts,
        totalPrice,
        addProduct: addProductHandler,
        removeProduct: removeProductHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
