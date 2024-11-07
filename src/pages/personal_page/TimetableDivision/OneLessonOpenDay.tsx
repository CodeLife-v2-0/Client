import { FC, useState, useEffect, useContext, Dispatch, SetStateAction, useRef, MouseEvent } from 'react'
import styles from './OneLessonOpenDay.module.css'
import { getFullYearsOld } from './../../../utils/getDate';
import { TimeTableDataLesson } from '../../../models/TimeTableData';
import { ILecruter } from '../../../models/Lecturer';
import { Context } from '../../..';
import PrivateImage from '../../../components/PA/PrivateImage/PrivateImage';
import { ICourseR } from '../../../models/Course';


interface IOneLessonOpenDay {
    lesson: TimeTableDataLesson,
    startHour: number,
}

const OneLessonOpenDay: FC<IOneLessonOpenDay> = ({ lesson, startHour }) => {
    const { store } = useContext(Context);
    const old = 44;//getFullYearsOld(Number(lecturer[lesson.lecturer].dateOfBirth));
    const bgRef = useRef<null | HTMLDivElement>(null);
    const necessarySubjects = <>{
        lesson.tools && lesson.tools.map((object: string, index: number) => {
            return index < 5 && <div className={styles.left__form__content__theme__table__left__object}>
                <b>&middot;</b>&ensp;{object}</div>
        })}</>

    const endTime = (startHour * 60 + lesson.startMinute + lesson.duration);
    const endHour = Math.trunc(endTime / 60);
    const endMinutes = endTime % 60;
    const [lecruter, setLecruter] = useState<ILecruter | null>(null)
    const [course, setCourse] = useState<ICourseR | null>(null)
    const workTime = (start_time: number) => {
        const today = new Date();
        const year = Math.trunc(start_time / 100);
        const month = start_time % 100;
        return (today.getFullYear() - year) - (Number(today.getMonth() >= month - 1));
    }

    const timeWork = workTime(44)//Number(lecturer[lesson.lecturer].experience));
    const teaches = String(lecruter?.subjects).split(' ').map((item) =>
        <div className={styles.right__form__content__row__right__array}>
            {item}
        </div>)

    useEffect(() => {
        setTimeout(() => {
            if (bgRef.current) {
                bgRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        }, 10);
    }, [])

    useEffect(() => {
        const fetchDataAboutLecruter = async () => {
            const responseLecruter = await store.getLecturer(lesson.lecturer);
            const responseCourse = await store.getCourse(lesson.subject);
            setCourse(responseCourse);
            setLecruter(responseLecruter)
        }
        fetchDataAboutLecruter()
    }, [])

    return <>
        <div className={styles.main__form__bg}>
            <div className={styles.main__form__bg__left}>
                <div className={styles.left__form__title}>
                    <div className={styles.left__form__title__text}>Подробная информация</div>
                    <div className={styles.left__form__title__image}>
                        <img src='/img/for_timeTable/info.png' />
                        <img src='/img/for_timeTable/note.png' />
                    </div>
                    <div className={styles.left__form__title__border} />
                </div>
                <div className={styles.left__form__content}>
                    <div className={styles.left__form__content__title}>
                        <div className={styles.left__form__content__title__text}>
                            {course?.name?.split(';')[store.isEng]}, {lesson.numberInCourse} занятие
                        </div>
                        <div className={styles.left__form__content__title__time}>
                            <img src='/img/for_timeTable/clockblack.png' />
                            <div className={styles.left__form__content__title__time__text}>
                                {startHour}:{lesson.startMinute < 10 ? '0' + lesson.startMinute : lesson.startMinute}
                                -{endHour}:{endMinutes < 10 ? '0' + endMinutes : endMinutes}
                            </div>
                        </div>
                    </div>
                    <div className={styles.left__form__content__theme}>
                        <div className={styles.left__form__content__theme__text}>Тема:</div>
                        <div className={styles.left__form__content__theme__title}>{lesson.lessonTopic}</div>
                        <div className={styles.left__form__content__theme__description}>&emsp;{lesson.description}</div>
                        <div className={styles.left__form__content__theme__table}>
                            <div className={styles.left__form__content__theme__table__left}>
                                <div className={styles.left__form__content__theme__table__left__title}>
                                    На уроке понадобится:</div>
                                {necessarySubjects}
                            </div>
                            <div className={styles.left__form__content__theme__table__border} />
                            <div className={styles.left__form__content__theme__table__right}>
                                <div className={styles.left__form__content__theme__table__right__task}>
                                    <b style={{ 'lineHeight': '2em' }}>Задание к уроку:</b><br />
                                    {lesson.assignment}
                                </div>
                                <div className={styles.left__form__content__theme__table__right__notisth}>
                                    <b style={{ 'lineHeight': '2em' }}>Заметки преподавателя:</b><br />
                                    {lesson.teacherNotes}
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
                    {/* <div className={styles.left__form__content__button__back}>
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
                    <div className={styles.left__form__content__write__notis}></div> */}
                </div>
            </div>
            <div className={styles.main__form__bg__right}>
                <div className={styles.right__form__title}>
                    <div className={styles.right__form__title__text}>Преподаватель</div>
                    <div className={styles.right__form__title__border} />
                    <div className={styles.right__form__title__borderv} />
                    <div className={styles.right__form__title__img}>
                        <img src={`/img/courses_logo/${course?.name?.split(';')[1]}.png`} />
                    </div>
                </div>
                <div className={styles.right__form__contect}>
                    <div className={styles.right__form__content__image}>
                        <PrivateImage imageName={(lecruter?.avatar || '')} />
                    </div>
                    <div className={styles.right__form__content__name}>
                        {lecruter?.name} {lecruter?.surName}
                    </div>
                    <div className={styles.right__form__content__table}>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Возраст</div>
                            <div className={styles.right__form__content__row__right}>
                                {old} {old <= 20 ? 'лет' : old % 10 == 1 ? 'год' : old % 10 <= 4 ? 'года' : 'лет'}
                            </div>
                        </div>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Образование</div>
                            <div className={styles.right__form__content__row__right}>
                                {lecruter?.education}
                            </div>
                        </div>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Стаж</div>
                            <div className={styles.right__form__content__row__right}>
                                {timeWork} {timeWork <= 20 ? 'лет' : timeWork % 10 == 1 ? 'год' : timeWork % 10 <= 4 ? 'года' : 'лет'}
                            </div>
                        </div>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Средняя оценка</div>
                            <div className={styles.right__form__content__row__right}>
                                {(Number(lecruter?.sumScore) / Number(lecruter?.totalScore)).toFixed(2)}
                            </div>
                        </div>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Выпущено учеников</div>
                            <div className={styles.right__form__content__row__right}>
                                {lecruter?.releasedStudents || 0}
                            </div>
                        </div>
                        <div className={styles.right__form__content__row__1}>
                            <div className={styles.right__form__content__row__left}>Обучает</div>
                            <div className={styles.right__form__content__row__right}>
                                {teaches}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OneLessonOpenDay