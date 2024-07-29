import styles from "./OurStory.module.scss";

const OurStory = () => {
  return (
    <section className={styles.story}>
      <h2 className="title">Наша история</h2>
      <div className={`container ${styles.story__inner}`}>
        <div>
          <p>
            Сумка-мессенджер мужская тесьма, жилет нейтра 8 бит. Chartreuse
            Disrupt посадил птицу на лебеду jianbing. Хэштег для позднего
            завтрака с питьевым уксусом, скейтборд с тильдой холодного отжима.
          </p>
          <p>
            Крафтовый пивной шалфей занимает кардиган из ретро-фарма и стол, а
            также фланель из кейтара для гастропабов.
          </p>

          <p>
            Unicorn jean шорты quinoa подлинный cronut tilde twee YOLO, потроха
            эстетичный yuccie iPhone truffaut seitan.
          </p>

          <p>
            Создавайте пивные путники, лесорубы, суккуленты своими руками,
            Helvetica Vexillologist, следующий уровень разбудили толстовку с
            капюшоном keffiyeh tumblr schlitz chambray пишущую машинку.
          </p>

          <p>Плитка метро шестиугольника keffiyeh.</p>
        </div>
        <div>
          <p>
            Синтетический этический биодизельный путин. Горькая борода шалфей
            лоу-фай. Пало Санто буквально пледы лампочки Эдисона, вилы пить
            уксус аутентичный пабст уличное искусство метро плитка крафтовое
            пиво одно происхождение кофе шаман ловец снов.
          </p>
          <p>
            Williamsburg sriracha portland, ассиметричная свиная грудинка для
            микродозирования la croix 3 wolf moon umami.
          </p>
          <p>
            Четырехдолларовые тосты, модный топор трюффо, ломо-клетчатый мех PBR
            & B Scester Остин Палео Thundercats семейная реликвия Knausgaard от
            фермы до стола.
          </p>
        </div>
      </div>
      <h4 className={styles.story__label}>COPPER PRO</h4>
    </section>
  );
};

export default OurStory;
