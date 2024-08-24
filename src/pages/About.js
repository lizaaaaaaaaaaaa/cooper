import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import AboutUsIntro from "../components/aboutUsIntro/AboutUsIntro";
import Customers from "../components/customers/Customers";
import OurStory from "../components/ourStory/OurStory";
import OurValues from "../components/ourValues/OurValues";
import WhyWe from "./../components/whyWe/WhyWe";
import OurGeography from './../components/ourGeography/OurGeography';

const About = () => {
  return (
    <React.Fragment>
      <Header />
      <AboutUsIntro />
      <Customers />
      <OurStory />
      <OurGeography />
      <OurValues />
      <WhyWe />
      <Footer />
      <ScrollToTopButton />
    </React.Fragment>
  );
};

export default About;
