import { useEffect, useState } from "react";
import styles from "./NewsList.module.scss";
import { db } from "../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import Loader from "../../UI/Loader";
import { Navigate } from "react-router";
import NewsItem from "./NewsItem";

const NewsList = () => {
  const getNewsPerPage = () => {
    if (window.innerWidth > 768) {
      return 6;
    } else {
      return 5;
    }
  };

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const [newsPerPage, setNewsPerPage] = useState(getNewsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setNewsPerPage(getNewsPerPage());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userDocRef = dbRef(db, "news");
        const getDataFromDatabase = await get(userDocRef);

        const loadedNews = [];

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
          console.log(data);

          for (const key in data) {
            loadedNews.push({
              id: key,
              title: data[key].title,
              image: data[key].image,
              date: data[key].date,
              content: data[key].content,
            });
          }

          setNews(loadedNews);
        } else {
          setNews([]);
        }
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(news);

  if (isLoading) {
    return <Loader />;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return <section className={styles.news__main}>
    <ul className={styles.news__list}>
        {news.map((newsItem)=><NewsItem key={newsItem.id} id={newsItem.id} title={newsItem.title} date={newsItem.date} image={newsItem.image} content={newsItem.content} />)}
    </ul>
  </section>;
};

export default NewsList;
