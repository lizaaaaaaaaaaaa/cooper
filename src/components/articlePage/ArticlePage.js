import React from 'react';

// Компонент для відображення параграфів
const Paragraph = ({ text }) => <p>{text}</p>;

// Компонент для відображення списків
const List = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Основний компонент для відображення контенту
const ContentRenderer = ({ content }) => {

  console.log(content);

  return (
    <div>
      {content.map((item, index) => {
        switch (item.type) {
          case 'paragraph':
            return <Paragraph key={index} text={item.text} />;
          case 'list':
            return <List key={index} items={item.items} />;
          case 'section':
            return (
              <section key={index}>
                <h2>{item.title}</h2>
                <ContentRenderer content={item.content} />
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;
