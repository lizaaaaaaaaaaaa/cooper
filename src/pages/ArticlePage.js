import React from "react";
import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import ScrollToTopButton from "./../components/footer/ScrollToTopButton";
import ArticleContent from "../components/articlePage/ArticleContent";

const ArticlePage = () => {
  return (
    <div className="wrapper">
      <Header />
      <ArticleContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ArticlePage;
