import React from "react";
import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import ScrollToTopButton from "./../components/footer/ScrollToTopButton";
import Article from "../components/articlePage/Article";

const ArticlePage = () => {
  return (
    <div className="wrapper">
      <Header />
      <Article />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ArticlePage;
