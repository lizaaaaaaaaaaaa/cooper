import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SuccessOrderPageContent from "../components/successOrderPage/SuccessOrderPageContent";

const SuccessOrderPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <SuccessOrderPageContent />
      <Footer />
    </div>
  );
};

export default SuccessOrderPage;
