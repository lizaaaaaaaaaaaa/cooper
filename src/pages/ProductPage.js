import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import ProductContent from "../components/productDetailsPage/ProductContent";

const ProductPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <ProductContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductPage;