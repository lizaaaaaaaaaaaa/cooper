import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";

const NewsContext = React.createContext({
  news: [],
  isLoading: false,
  httpErrorMessage: "",
});

export const NewsProvider = (props) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docRef = dbRef(db, "news");
        const getDataFromDatabase = await get(docRef);

        const loadedNews = [];

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
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

  return (
    <NewsContext.Provider
      value={{
        news,
        isLoading,
        httpErrorMessage,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
