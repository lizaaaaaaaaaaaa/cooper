import styles from "./OrderPromocode.module.scss";
import Button from "../../../UI/Button";
import { db } from "../../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Loader from "./../../../UI/Loader";

const OrderPromocode = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");
  const [promocodeMessage, setPromocodeMessage] = useState(null);

  useEffect(() => {
    props.onGetLoadingStatus(isLoading);
  }, [isLoading]);

  const promocodeSubmit = (event) => {
    event.preventDefault();
    setPromocodeMessage(null);

    const promocode = event.target[0].value;

    if (!promocode) {
      setPromocodeMessage("Вы ввели не валидный промокод!");
      return;
    }

    const fetchData = async (promo) => {
      setIsLoading(true);
      try {
        const docRef = dbRef(db, "promocodes");
        const getDatafromDatabase = await get(docRef);

        if (getDatafromDatabase) {
          const data = getDatafromDatabase.val();
          console.log(data);
          for (const promocode of data) {
            if (promocode.name === promo) {
              props.onGetPromocodeData(promocode);
            } else props.onGetPromocodeData(null);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          httpErrorMessage(
            "Что-то пошло не так и у нас нету активных промокодов. Попробуйте немного позже!"
          );
        }
      } catch (error) {
        setIsLoading(false);
        setHttpErrorMessage(error.message);
      }
    };

    fetchData(promocode);
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <div className={styles.order__promoContainer}>
      {isLoading ? <Loader className={styles.loader} /> : ""}
      <form className={styles.order__promo} onSubmit={promocodeSubmit}>
        <label htmlFor="promocode">
          <input
            type="text"
            id="promocode"
            placeholder="Введите промокод"
            name="promocode"
            disabled={isLoading}
          />
          {promocodeMessage ? (
            <p className={styles.order__message}>{promocodeMessage}</p>
          ) : (
            ""
          )}
        </label>
        <Button
          type="submit"
          className={styles.order__promoBtn}
          disabled={isLoading}
        >
          Применить
        </Button>
      </form>
    </div>
  );
};

export default OrderPromocode;
