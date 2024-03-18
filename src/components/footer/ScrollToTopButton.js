import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const halfPageHeight = window.innerHeight / 2;
      const currentScroll = window.scrollY;

      setIsVisible(currentScroll > halfPageHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      Вверх
    </button>
  );
};

export default ScrollToTopButton;
