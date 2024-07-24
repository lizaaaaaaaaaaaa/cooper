import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/footer/ScrollToTopButton";
import AboutUsIntro from "../components/aboutUsIntro/AboutUsIntro";

const About = () => {
  return (
    <React.Fragment>
      <Header />
      <AboutUsIntro />
      <Footer />
      <ScrollToTopButton />
    </React.Fragment>
  );
};

export default About;
