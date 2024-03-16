import styles from "../Intro.module.scss"

const DotsSliderItem = ({isSlideActive, onClick}) => {
   
   return <button onClick={onClick} className={isSlideActive ? styles['intro__dot-active'] : styles.intro__dot}></button>
};

export default DotsSliderItem;
