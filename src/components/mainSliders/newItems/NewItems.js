import styles from "./NewItems.module.scss"
import NewItemsContent from './NewItemsContent';

const NewItems = () => {
   
   return <section className={`section ${styles.new}`}>
    <div className="container">
        <h1 className="title">Новинки</h1>
        <NewItemsContent/>
    </div>
   </section>
};

export default NewItems;