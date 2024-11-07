import { FC, MouseEvent, useState, Dispatch, SetStateAction } from 'react';
import styles from './SendForm.module.css';
import SendModal from './SendModal';

const SendForm: FC = () => {

    const [modal, setModal] = useState(false);

    const openModal = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setModal(true);

    }
    return (
        <div className={styles.send__form__wrapper}>
            {modal && <SendModal setModal={setModal}/>}
            <div className={styles.form__for__send}>
                <div className={styles.form__for__send__title}>
                    Связаться с нами
                </div>
                <div className={styles.form__for__send__body}>
                    <div className={styles.form__for__send__body__name}>
                        Как вас зовут?
                        <input type='text' className={styles.form__for__send__input}/>
                    </div>
                    <div className={styles.form__for__send__body__number}>
                        Номер для связи
                        <input type='text' inputMode='numeric' className={styles.form__for__send__input}/>
                    </div>
                    <div className={styles.form__for__send__body__date}>
                        Выберите удобное время для связи с вами
                        <div className={styles.form__for__send__body__date__input}>
                            <div className={styles.form__for__send__body__date__input__img}>
                                <img src='img/start_page/calendar.png'
                                alt='calendar'
                                className={styles.form__for__send__body__date__input__img__current}/>
                            </div>
                            <input type='text' className={styles.form__for__send__input}/>
                        </div>
                        <div className={styles.form__for__send__body__date__input}>
                            <div className={styles.form__for__send__body__date__input__img}>
                                <img src='img/start_page/timer.png'
                                alt = 'timer'
                                className={styles.form__for__send__body__date__input__img__current}/>
                            </div>
                            <input type='text' className={styles.form__for__send__input}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.send__form__button} onClick={openModal}>
                Отправить
            </div>
            <div className={styles.send__form__footer}>
                <div className={styles.send__form__footer__adress}>
                    <div className={styles.send__form__footer__text}>
                        Адрес
                    </div>
                    <div className={styles.send__form__footer__value}>
                        Какой-то наш ардес
                    </div>
                </div>
                <div className={styles.send__form__footer__number}>
                    <div className={styles.send__form__footer__text}>
                        Телефон
                    </div>
                    <div className={styles.send__form__footer__value}>
                        +995 599 06 51 79
                    </div>
                </div>
                <div className={styles.send__form__footer__mail}>
                    <div className={styles.send__form__footer__text}>
                        Почта
                    </div>
                    <div className={styles.send__form__footer__value}>
                        CodeLifeHello@google.com
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendForm;