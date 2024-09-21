import React, { useContext, useEffect, useState } from "react";
import styles from "./OrderContacts.module.scss";
import AuthContext from "../../../context/auth-context";
import ContactsModal from "./orderDetails/ContactsModal";

const OrderContacts = (props) => {
  const { userDetails } = useContext(AuthContext);

  const [isContactsModalShow, setIsContactsModalShow] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || "");
      setPhone(userDetails.contacts?.phone || "");
      setEmail(userDetails.login || "");
      setCountry(userDetails.contacts?.country || "");
      setCity(userDetails.contacts?.city || "");
    }
  }, [userDetails]);

  useEffect(() => {
    props.onGetData({ name, phone, email, country, city });
  }, [name, phone, email, country, city]);

  useEffect(() => {
    let timer;
    if (!name && !phone && !email && !country && !city) {
      timer = setTimeout(() => {
        setIsContactsModalShow(true);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [name, phone, email, country, city]);

  return (
    <React.Fragment>
      {isContactsModalShow ? (
        <ContactsModal onHideModal={() => setIsContactsModalShow(false)} />
      ) : (
        ""
      )}

      <li className={styles.order__contacts}>
        <div>Личные данные</div>
        <div className={styles.order__inputs}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value.replace(/\D/g, ""))
            }
          />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Страна"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
          <input
            type="text"
            placeholder="Город"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </li>
    </React.Fragment>
  );
};

export default OrderContacts;
