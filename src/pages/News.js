import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import NewsContent from "../components/newsPage/NewsContent";

const News = () => {
  return (
    <div className="wrapper">
      <Header />
      <NewsContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default News;
