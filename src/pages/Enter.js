import React from "react";
import EnterPage from "../components/enterPage/EnterPage";
import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";

const Enter = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">
        <div className="content">
          <EnterPage />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Enter;
