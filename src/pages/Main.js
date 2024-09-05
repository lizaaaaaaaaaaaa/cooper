import React from "react";
import Intro from "../components/intro/Intro";
import OurProduction from "../components/ourProduction/OurProduction";
import BestSellers from "../components/mainSliders/bestsellers/BestSellers";
import NewItems from "./../components/mainSliders/newItems/NewItems";
import Benefit from "../components/benefit/Benefit";
import WeRecomended from "./../components/mainSliders/weRecommend/WeReccomend";
import Sales from "../components/mainSliders/sales/Sales";
import WhyWe from "./../components/whyWe/WhyWe";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Intro />
      <OurProduction />
      <BestSellers />
      <NewItems />
      <Benefit />
      <Sales />
      <WeRecomended />
      <WhyWe />
      <Footer />
      <ScrollToTopButton />
    </React.Fragment>
  );
};

export default Main;
