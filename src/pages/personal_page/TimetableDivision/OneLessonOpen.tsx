import { FC, useState, useEffect, useContext, Dispatch, SetStateAction, useRef, MouseEvent } from 'react'
import styles from './OneLessonOpen.module.css'

// Значения этих переменных должны приходить из базы данных
const UsedObjects = [
    'Visual Studio Code',
    'Огонь святой инквизиции',
    'Шахматы',
]

// Конец блока базы данных

interface IOneLessonOpen {
    setOpenLesson: Dispatch<SetStateAction<boolean>>;
}

const OneLessonOpen: FC<IOneLessonOpen> = ({ setOpenLesson }) => {
    const bgRef = useRef<null | HTMLDivElement>(null);
    const necessarySubjects = <>{
        UsedObjects.map((object, index) => {
            return index < 5 && <div className={styles.left__form__content__theme__table__left__object}>
                <b>&middot;</b>&ensp;{object}</div>
        })}</>
    useEffect(() => {
        setTimeout(() => {
            if (bgRef.current) {
                bgRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        }, 10);
    }, [])

    const closeMenuPalen = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (bgRef.current) {
            bgRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        }
        setTimeout(() => setOpenLesson(false), 500);
    }
    return <>
        <div className={styles.one__lesson__open__bg} ref={bgRef} onClick={closeMenuPalen}>
            <div className={styles.main__form__bg} onClick={(e) => { e.stopPropagation() }}>
                <div className={styles.main__form__bg__left}>
                    <div className={styles.left__form__title}>
                        <div className={styles.left__form__title__text}>Подробная информация</div>
                        <div className={styles.left__form__title__image}>
                            <img src='/img/for_timeTable/info.png' />
                            <img src='/img/for_timeTable/note.png' />
                        </div>
                        <div className={styles.left__form__title__border}></div>
                    </div>
                    <div className={styles.left__form__content}>
                        <div className={styles.left__form__content__title}>
                            <div className={styles.left__form__content__title__text}>Python, 13 занятие</div>
                            <div className={styles.left__form__content__title__time}>
                                <img src='/img/for_timeTable/clockblack.png' />
                                <div className={styles.left__form__content__title__time__text}>15:30-17:00</div>
                            </div>
                        </div>
                        <div className={styles.left__form__content__theme}>
                            <div className={styles.left__form__content__theme__text}>Тема:</div>
                            <div className={styles.left__form__content__theme__title}>“Милфы как оружие 21 века”</div>
                            <div className={styles.left__form__content__theme__description}>&emsp;На данном уроке вы
                                обучитесь объяснять неграм, что независимо от цвета фигур, они ходят вторые.
                                В ходе занятия мы разберем популярные колонии рабства, а так же масти негров.</div>
                            <div className={styles.left__form__content__theme__table}>
                                <div className={styles.left__form__content__theme__table__left}>
                                    <div className={styles.left__form__content__theme__table__left__title}>
                                        На уроке понадобится:</div>
                                    {necessarySubjects}
                                </div>
                                <div className={styles.left__form__content__theme__table__border} />
                                <div className={styles.left__form__content__theme__table__right}>
                                    <div className={styles.left__form__content__theme__table__right__task}>
                                        Задание к уроку:
                                        Найти негра
                                    </div>
                                    <div className={styles.left__form__content__theme__table__right__notisth}>
                                        Заметки преподавателя:
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.left__form__content__button__next}>
                            <img src='/img/for_timeTable/notis.png' />
                            <div className={styles.left__form__content__button__next__text}>
                                <div style={{ textDecoration: 'underline' }}>Далее</div>
                                <img />
                            </div>
                            <img src='/img/for_timeTable/question.png' />
                        </div>
                        <div className={styles.left__form__content__button__back}>
                            <img src='/img/for_timeTable/info.png' />
                            <div className={styles.left__form__content__button__back__text}>
                                <div></div>
                                <img />
                            </div>
                            <img src='/img/for_timeTable/note.png' />
                        </div>
                        <div className={styles.left__form__content__chat__and__notis}>
                            <div className={styles.left__form__content__notis}></div>
                            <div className={styles.left__rorm__content__chat}></div>
                        </div>
                        <div className={styles.left__form__content__write__notis}></div>
                    </div>
                </div>
                <div className={styles.main__form__bg__right}>
                    <div className={styles.right__form__title}>
                        <div className={styles.right__form__title__text}></div>
                        <div className={styles.right__form__title__border}></div>
                        <img src='/img/for_timeTable/python.png' />
                    </div>
                    <div className={styles.right__form__contect}>
                        <div className={styles.right__form__content__image}></div>
                        <div className={styles.right__form__content__name}></div>
                        <div className={styles.right__form__content__table}>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                            <div className={styles.right__form__content__row__1}>
                                <div className={styles.right__form__content__row__left}></div>
                                <div className={styles.right__form__content__row__right}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OneLessonOpen