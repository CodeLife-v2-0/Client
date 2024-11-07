import { FC, useState, MouseEvent, useRef } from 'react'
import styles from './Comments_mobile.module.css';
import CommentsMobileOpenFilter from './CommentsMobileOpenFilter';

type MobileComments = {
    name: string;
    surName: string;
    course: string;
    avatar: string;
    courseFinish: number;
    meanMark: number;
    text: string;
    date: string;

}

const commentsMobileData: MobileComments[] = [
    {
        name: 'Андрей',
        surName: 'Добренко',
        course: 'React-разработчик',
        avatar: 'img/avatars/alex.jpg',
        courseFinish: 3,
        meanMark: 47,
        text: 'Такой крепкой ебли в жопу мне не устраивали с армии. А ведь именно там я потерял девственность. Сам процесс ёбки проходил максимально плавно, я бы даже сказал как по маслу. По трудоустройству... Мне нихуя не помогли, но зато дали  кличку - “платно смазан”.',
        date: '30 февраля 2012 года',
    },
    {
        name: 'Андрей',
        surName: 'НеДобренко',
        course: 'Плитка клак на сайт',
        avatar: 'img/avatars/liza.jpg',
        courseFinish: -3,
        meanMark: 7,
        text: 'Я хз нахуй я вообще на это подписался, то до крестиков доебётся, видите ли картинки ему нужны. То блять очередную залупу предумает. А я всего-то хотел испеть пассивный доход и шлюх.  Ебливые сука квадраты на редакторе аватарок...',
        date: '30 февраля год ебал',
    },
]


const Comments_mobile: FC = () => {

    const [filterActive, setFilterActive] = useState(false);
    const [niceClose, setNiceClose] = useState(true);
    const count = 1;
    const allPages = 12;
    const openFilterTreangle = useRef<HTMLDivElement | null>(null);

    const openFilter = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setNiceClose(!niceClose);
        if (filterActive && openFilterTreangle.current) {
            openFilterTreangle.current.style.top = '20%';
            openFilterTreangle.current.style.left = '0%';
            openFilterTreangle.current.style.rotate = '0deg';
        } else if (openFilterTreangle.current) {
            openFilterTreangle.current.style.top = '40%';
            openFilterTreangle.current.style.left = '20%';
            openFilterTreangle.current.style.rotate = '-90deg';
        }
        if (filterActive)
            setTimeout(() => setFilterActive(!filterActive), 500);
        else
            setFilterActive(!filterActive);


    }

    const commentsMobileContent = commentsMobileData.map((commentData) => {
        return (
            <div className={styles.one__comment__mobile__wrapper}>
                <div className={styles.one__comment__mobile__course}>
                    {commentData.course}
                </div>
                <div className={styles.one__comment__mobile__avatar}>
                    <img
                        className={styles.one__comment__mobile__img}
                        src={commentData.avatar}
                        alt={commentData.name}
                    />
                </div>
                <div className={styles.one__comment__mobile__main__body}>
                    <div className={styles.one__comment__mobile__name}>
                        {commentData.name} {commentData.surName}
                    </div>
                    <div className={styles.one__comment__mobile__underlink} />
                    <div className={styles.one__comment__mobile__numbers__data}>
                        <div className={styles.one__comment__mobile__course__finish}>
                            Пройдено курсов: {commentData.courseFinish}
                        </div>
                        <div className={styles.one__comment__mobile__mean__mark}>
                            Средний бал: {commentData.meanMark}
                        </div>
                    </div>
                    <div className={styles.one__comment__mobile__text}>
                        &emsp;&emsp;{commentData.text}
                    </div>
                    <div className={styles.one__comment__mobile__date}>
                        {commentData.date}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.comments__mobile__wrapper}>
            <div className={styles.comments__mobile__header}>
                <div className={styles.comments__mobile__header__title}>
                    Отзывы студентов
                </div>
                <div className={styles.comments__mobile__header__body}>
                    завершивших обучение
                </div>
            </div>
            <div className={styles.comments__mobile__filter__wrapper}>
                <div className={styles.comments__mobile__filter} onClick={openFilter}>
                    <div className={styles.comments__mobile__filter__text}>Параметры фильтрации</div>
                    <div className={styles.comments__mobile__filter__button}>
                        <div className={styles.comments__mobile__filter__button__triangle} ref={openFilterTreangle} />
                    </div>
                </div>
                {!filterActive
                    ? <div className={styles.comments__mobile__filter__underline} />
                    : <CommentsMobileOpenFilter niceClose={niceClose} />
                }
            </div>
            <div className={styles.comments__mobile__body}>
                {commentsMobileContent}
                <div className={styles.comments__mobile__body__switcher}>
                    <div className={styles.comments__mobile__body__switcher__count}>
                        {count}/{allPages}
                    </div>
                    <div className={styles.comments__mobile__body__switcher__text}>
                        Для просмотра новых отзывов, сделайте свайп секции.
                    </div>
                    <div className={styles.comments__mobile__footer__underline} />
                </div>
            </div>
            <div className={styles.comments__mobile__footer}>
                <div className={styles.comments__mobile__footer__header}>
                    Будем рады новым отзывам!
                </div>
                <div className={styles.comments__mobile__footer__text}>
                    &emsp;&emsp;Если вы студент, успешно завершивший своё обучение, вы можете оставить отзыв о курсе через свой личный кабинет.
                </div>
                <div className={styles.comments__mobile__footer__underline} />
            </div>
        </div>
    )
}

export default Comments_mobile;