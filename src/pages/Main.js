import React from "react";
import Intro from "../components/intro/Intro";
import OurProduction from "../components/ourProduction/OurProduction";
import BestSellers from "../components/mainSliders/bestsellers/BestSellers";

const Main = () => {
  return (
    <React.Fragment>
      <Intro />
      <OurProduction />
      <BestSellers />
    </React.Fragment>
  );
};

export default Main;
