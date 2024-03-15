import React from "react";
import Intro from "../components/intro/Intro";
import OurProduction from "../components/ourProduction/OurProduction";
import BestSellers from "../components/mainSliders/bestsellers/BestSellers";
import NewItems from "./../components/mainSliders/newItems/NewItems";
import Benefit from "../components/benefit/Benefit";

const Main = () => {
  return (
    <React.Fragment>
      <Intro />
      <OurProduction />
      <BestSellers />
      <NewItems />
      <Benefit />
    </React.Fragment>
  );
};

export default Main;
