import styles from "./ArticleContent.module.scss";

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
const ArticleContent = () => {
  return (
    <div className={`content ${styles.article}`}>
      <div className="container">контент</div>
    </div>
  );
};

export default ArticleContent;
