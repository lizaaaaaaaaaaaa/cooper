import styles from "./Article.module.scss";
import Path from "../UI/Path";
import ArticleContent from "./articleContent/ArticleContent";

// // Компонент для відображення параграфів
// const Paragraph = ({ text }) => <p>{text}</p>;

// // Компонент для відображення списків
// const List = ({ items }) => (
//   <ul>
//     {items.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// );

// Основний компонент для відображення контенту
const Article = () => {
  return (
    <div className={`content ${styles.article}`}>
      <div className="container">
        <Path />
        <ArticleContent />
      </div>
    </div>
  );
};

export default Article;
