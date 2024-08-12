import { useEffect, useState, useContext } from "react";
import styles from "./NewsList.module.scss";
import Loader from "../../UI/Loader";
import { Navigate } from "react-router";
import NewsItem from "./NewsItem";
import NewsPagination from "./NewsPagination";
import NewsContext from "../../../context/news-context";

const NewsList = () => {
  const context = useContext(NewsContext);

  const getNewsPerPage = () => {
    if (window.innerWidth > 768) {
      return 6;
    } else {
      return 5;
    }
  };
  const [newsPerPage, setNewsPerPage] = useState(getNewsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setNewsPerPage(getNewsPerPage());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentNews = context.news.slice(
    (currentPage - 1) * newsPerPage,
    newsPerPage * currentPage
  );

  if (context.isLoading) {
    return <Loader />;
  }

  if (context.httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={context.httpErrorMessage} replace />;
  }

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className={styles.news__main}>
      <ul className={styles.news__list}>
        {currentNews.map((newsItem) => (
          <NewsItem
            key={newsItem.id}
            id={newsItem.id}
            title={newsItem.title}
            date={newsItem.date}
            image={newsItem.image}
            content={newsItem.content}
          />
        ))}
      </ul>
      <NewsPagination
        pages={newsPerPage}
        newsLength={context.news.length}
        currentPage={currentPage}
        onPageChange={pageChangeHandler}
      />
    </section>
  );
};

export default NewsList;
