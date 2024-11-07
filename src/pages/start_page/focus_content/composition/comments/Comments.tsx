import { FC, useEffect, useRef, MouseEvent, Dispatch, SetStateAction } from 'react'
import styles from './Comments.module.css'
import StarRaiting from '../../../../../components/Decorations/StarRaiting/StarRaiting';

type commentData = {
    name: string;
    surName: string;
    course: string;
    avatar: string;
    body: string;
    rate: number;
}

const comments: commentData[][] = [[
    {
        name: "Алексей",
        surName: "Усович",
        course: "С++",
        avatar: "/img/avatars/alex.jpg",
        body: "Фундаментальные знания языка, низкоуровневое программирование, как же это было круто! Память бы стирать себе не стал, чтобы заново проходить, но это определённо того стоило. Раньше язык С++ вызывал у меня страх и не понимание, теперь чувство низкоуровневой мощности.",
        rate: 3
    },
    {
        name: "Лиза",
        surName: "Ефимова",
        course: "Python",
        avatar: "/img/avatars/liza.jpg",
        body: "Я очень благодарна вашей онлайн-школе за помощь в смене профессии! Курсы Python-разработчика действительно были сложными, но благодаря квалифицированным наставникам и ревьюерам я смогла успешно завершить обучение и получить диплом. Теперь я работаю в IT-сфере и получаю невероятное удовольствие от работы.",
        rate: 4
    },
    {
        name: "Кирилл",
        surName: "Севастьянов",
        course: "JavaScript",
        avatar: "/img/avatars/kirill.jpg",
        body: "Я благодарен ikigai-creative за помощь в изучении веб-разработки! Курсы были сложными, но благодаря наставникам и ревьюерам я успешно завершил обучение и получил диплом. Теперь я работаю в IT-сфере и получаю удовольствие от работы.",
        rate: 5
    }],
[
    {
        name: "Лиза",
        surName: "Ефимова",
        course: "Python",
        avatar: "/img/avatars/liza.jpg",
        body: "Я очень благодарна вашей онлайн-школе за помощь в смене профессии! Курсы Python-разработчика действительно были сложными, но благодаря квалифицированным наставникам и ревьюерам я смогла успешно завершить обучение и получить диплом. Теперь я работаю в IT-сфере и получаю невероятное удовольствие от работы.",
        rate: 4
    },
    {
        name: "Алексей",
        surName: "Усович",
        course: "С++",
        avatar: "/img/avatars/alex.jpg",
        body: "Фундаментальные знания языка, низкоуровневое программирование, как же это было круто! Память бы стирать себе не стал, чтобы заново проходить, но это определённо того стоило. Раньше язык С++ вызывал у меня страх и не понимание, теперь чувство низкоуровневой мощности.",
        rate: 3
    },
    {
        name: "Кирилл",
        surName: "Севастьянов",
        course: "JavaScript",
        avatar: "/img/avatars/kirill.jpg",
        body: "Я благодарен ikigai-creative за помощь в изучении веб-разработки! Курсы были сложными, но благодаря наставникам и ревьюерам я успешно завершил обучение и получил диплом. Теперь я работаю в IT-сфере и получаю удовольствие от работы.",
        rate: 5
    }
],
[
    {
        name: "Кирилл",
        surName: "Севастьянов",
        course: "JavaScript",
        avatar: "/img/avatars/kirill.jpg",
        body: "Я благодарен ikigai-creative за помощь в изучении веб-разработки! Курсы были сложными, но благодаря наставникам и ревьюерам я успешно завершил обучение и получил диплом. Теперь я работаю в IT-сфере и получаю удовольствие от работы.",
        rate: 5
    },
    {
        name: "Алексей",
        surName: "Усович",
        course: "С++",
        avatar: "/img/avatars/alex.jpg",
        body: "Фундаментальные знания языка, низкоуровневое программирование, как же это было круто! Память бы стирать себе не стал, чтобы заново проходить, но это определённо того стоило. Раньше язык С++ вызывал у меня страх и не понимание, теперь чувство низкоуровневой мощности.",
        rate: 3
    },
    {
        name: "Лиза",
        surName: "Ефимова",
        course: "Python",
        avatar: "/img/avatars/liza.jpg",
        body: "Я очень благодарна вашей онлайн-школе за помощь в смене профессии! Курсы Python-разработчика действительно были сложными, но благодаря квалифицированным наставникам и ревьюерам я смогла успешно завершить обучение и получить диплом. Теперь я работаю в IT-сфере и получаю невероятное удовольствие от работы.",
        rate: 4
    }
],
];

interface IComments {
    setOpenComments: Dispatch<SetStateAction<boolean>>
}

const Comments: FC<IComments> = ({ setOpenComments }) => {

    const bgRef = useRef<HTMLDivElement | null>(null);

    const changeComment = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

    }

    useEffect(() => {
        setTimeout(() => {
            if (bgRef.current) {
                bgRef.current.style.opacity = '1';
            }
        }, 10);
        const handleScroll = () => {

            if (window.scrollY < window.innerHeight * 3.6) {
                if (bgRef.current) {
                    bgRef.current.style.opacity = '0';
                }
                setTimeout(() => setOpenComments(false), 500);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const commentOfCourse = (course: number) => {
        return <div className={styles.comments__of__course}>
            {comments[course].map((comment, index) => {
                return (
                    <div className={styles[`one__comment__wrapper__${index + 1}`]}>
                        <div className={styles.one__comment__header}>
                            <div className={styles.one__comment__img}>
                                <img
                                    src={comment.avatar}
                                    alt={comment.avatar}
                                    className={styles.one__comment__avatar}
                                />
                            </div>
                            <div className={styles.one__comment__header__text}>
                                <div className={styles.one__comment__header__surname}>
                                    {comment.surName}
                                </div>
                                <div className={styles.one__comment__header__name}>
                                    {comment.name}
                                </div>
                                <div className={styles.one__comment__header__course}>
                                    {comment.course}
                                </div>
                            </div>
                        </div>
                        <div className={styles.one__comment__body}>
                            <div className={styles.one__comment__body__text}>
                                {comment.body}
                            </div>
                            <div className={styles.one__comment__body__arrow} onClick={changeComment}>
                                <div className={styles.arrowCta} />
                                Далее
                            </div>
                            <div className={styles.one__comment__body__rate}
                                style={{ color: `${comment.rate == 5 ? 'green' : comment.rate == 4 ? '#a4d013' : comment.rate == 3 ? '#fa8613' : 'red'}` }}>
                                {comment.rate}
                                <StarRaiting rate={comment.rate} />
                            </div>
                        </div>
                    </div>)
            })
            }</div>
    }


    return (
        <div className={styles.comments__wrapper} ref={bgRef}>
            <div className={styles.comments__wrapper__relative}>
                <div className={styles.comments__title}>
                    <div className={styles.comments__title__text}>
                        Что говорят выпускники
                    </div>
                    <div className={styles.comments__title__filter}>
                        <div className={styles.comments__title__filter__text}>
                            Отзывы
                        </div>
                        <div style={{ textDecoration: 'underline' }}>
                            все
                        </div>
                    </div>
                </div>
                <div className={styles.comments__background3}>
                    {commentOfCourse(0)}
                    {commentOfCourse(1)}
                    {commentOfCourse(2)}
                </div>
            </div>
        </div>
    );
}

export default Comments;