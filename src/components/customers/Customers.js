import React, { useState, useEffect, useRef } from "react";
import styles from "./Customers.module.scss";

const Customers = () => {
  const [currentNumber, setCurrentNumber] = useState(10000);
  const counterRef = useRef(null);
  const finishNumber = 12342;

  const changeCurrentNumberHandler = () => {
    const time = 1;

    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        if (prevNumber < finishNumber) {
          return prevNumber + 22;
        } else {
          clearInterval(interval);
          return prevNumber;
        }
      });
    }, time);
  };

  useEffect(() => {
    const currentCounterRef = counterRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          changeCurrentNumberHandler();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentCounterRef) {
      observer.observe(currentCounterRef);
    }

    return () => {
      if (currentCounterRef) {
        observer.unobserve(currentCounterRef);
      }
    };
  }, []);

  return (
    <section className={styles.customers} ref={counterRef}>
      <div className={`container ${styles.customers__inner}`}>
        <div className={styles.customers__content}>
          <h3 className="title">Наши клиенты</h3>
          <p>
            Мы требовательны к себе, чтобы каждый день становится лучше для
            наших клиентов и находить лучшие решения для каждого из них
          </p>
        </div>
        <div className={styles.customers__counter}>
          <h6>Счетчик клиентов</h6>
          <h3>{currentNumber}</h3>
        </div>
      </div>
    </section>
  );
};

export default Customers;
