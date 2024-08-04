import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import CatalogContent from "../components/catalogPage/CatalogContent";

const Catalog = () => {
  return (
    <div className="wrapper">
      <Header />
      <CatalogContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Catalog;
