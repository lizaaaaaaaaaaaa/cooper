import styles from "./ArticleText.module.scss";

const renderArticleText = (item, index, level = 1) => {
  const HeadingTag = level === 1 ? "h3" : "h5";

  switch (item.type) {
    case "paragraph":
      return <p key={index}>{item.text}</p>;
    case "list":
      return (
        <ul className={styles.article__list} key={index}>
          {item.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "section":
      return (
        <section key={index}>
          {item.title && <HeadingTag>{item.title}</HeadingTag>}
          {item.content &&
            item.content.map((nestedItem, nestedIndex) =>
                renderArticleText(nestedItem, nestedIndex, level + 1) // чим більше разів викликається знову компонент, тим більшим стає вложеність, якщо рівень вложеності не перший, то наступні title завжди будуть мати вложеність h5
            )}
        </section>
      );
    default:
      return null;
  }
};

const ArticleText = (props) => {
  return (
    <div className={styles.article__content}>
      {props.textContent.map((item, index) => renderArticleText(item, index))}
    </div>
  );
};

export default ArticleText;
