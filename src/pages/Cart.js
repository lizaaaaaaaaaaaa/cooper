import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import CartContent from "../components/cartPage/CartContent";

const Cart = () => {
  return (
    <div className="wrapper">
      <Header />
      <CartContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Cart;
