import styles from "./NewsItem.module.scss"

const NewsItem = (props) => {
   
   return (
       <li>
           <h1>{props.title}</h1>
       </li>
   )
};

export default NewsItem;
