import { useState, useEffect } from "react";
import styles from "./CommentItem.module.scss";
import { Navigate } from "react-router";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import Loader from "../../../UI/Loader";
import noUser from "../../../../assets/userImage/noUser.jpg";

const CommentItem = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const docRef = dbRef(db, "userEnter");
        const getDataFromDatabase = await get(docRef);

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
          if (data[props.userId]) {
            setUser({
              name: data[props.userId].name
                ? data[props.userId].name
                : "Unkhown User",
              image: data[props.userId].image,
            });
          } else {
            setUser(null);
            setIsLoading(false);
          }
        } else {
          setUser(null);
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpErrorMessage(error.message);
      }
    };
    fetchData();
  }, [props.userId]);

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading || !user) {
    return <Loader />;
  }

  const userImageSrc = user.image ? user.image : noUser;

  console.log(props.text.length);

  return (
    <div className={styles.comment}>
      <img src={userImageSrc} alt={user.name} className={styles.comment__avatar} />
      <div className={styles.comment__name}>{user.name}</div>
      <p className={styles.comment__content}>{props.text}</p>
      <span className={styles.comment__date}>{props.date}</span>
    </div>
  );
};

export default CommentItem;
