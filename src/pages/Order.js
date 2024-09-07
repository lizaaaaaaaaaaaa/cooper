import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderContent from "../components/orderPage/OrderContent";

const Order = () => {
  return (
    <div className="wrapper">
      <Header />
      <OrderContent />
      <Footer />
    </div>
  );
};

export default Order;
