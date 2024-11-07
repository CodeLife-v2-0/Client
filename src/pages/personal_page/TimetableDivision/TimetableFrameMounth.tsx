import { FC, useEffect, useState, useContext, Dispatch, SetStateAction } from 'react'
import styles from './TimetableFrameMounth.module.css'
import { Context } from '../../..';
import { timeTablelocalization } from '../../../localizationData';
import { getAmountWeeksInMonth } from '../../../utils/getDate';
import { TimeTableData, TimeTableDataLesson } from '../../../models/TimeTableData';

const messageHidenLessons = (hidenLessons: number, lang: number) => {
    if (hidenLessons === 1)
        return `${[`И ещё + ${hidenLessons} занятие`, `And ${hidenLessons} more lesson`][lang]}`;
    if (hidenLessons >= 2 && hidenLessons <= 4)
        return `${[`И ещё ${hidenLessons} занятия`, `And ${hidenLessons} more lessons`][lang]}`;
    return `${[`И ещё ${hidenLessons} занятий`, `And ${hidenLessons} more lessons`][lang]}`;

}

const { titleColumnData } = timeTablelocalization;

const titleColumnDays = (lang: number) => {
    return <div className={styles.titleCardRow}>
        {titleColumnData[lang].map(
            (dayOfWeek, index) => <div
                key={`title-column-${lang == 0 ? 'ru': 'en'}-${titleColumnData[1][index]}`}
                className={styles.titleCard}>
                {dayOfWeek}
            </div>
        )}
    </div>
}

interface IOpenLessonCard {
    lesson: TimeTableDataLesson;
    closeCard: Dispatch<SetStateAction<boolean>>;
    time: string
}

const OpenLessonCard: FC<IOpenLessonCard> = ({ lesson, closeCard, time }) => {
    const { subject, numberInCourse, lecturer } = lesson;
    const { store } = useContext(Context);
    const subjectNames = ['React', 'Python', 'C++', 'C', 'JavaScript', 'Roblox', 'Web'] //временное решение
    const subjectName = lesson.subject;
    return (
        <div className={styles.OpenLessonCard__wrapper}>
            <div className={styles.OpenLessonCard__wrapper_inner}>
                <div className={styles.OpenLessonCard__header}>
                    <div>
                        <div className={styles.OpenLessonCard__title}>
                            {subjectName}, {numberInCourse} {['занятие', 'lesson'][store.isEng]}
                        </div>
                        <div className={styles.OpenLessonCard__time}>
                            {time}
                        </div>
                    </div>
                    <div>
                        <div className={styles.OpenLessonCard__lecturer}>
                            {['Ведущий', 'Leader'][store.isEng]} {lecturer}
                        </div>
                        <div className={styles.OpenLessonCard__close} onClick={(e) => { e.stopPropagation(); closeCard(false) }}>
                            x
                        </div>
                    </div>
                </div>
                <div className={styles.OpenLessonCard__underlink}></div>
                <div className={styles.OpenLessonCard__body}>
                    <div className={styles.OpenLessonCard__lessonTheme}>
                        {['Тема занятия', 'Lesson theme'][store.isEng]}: “Милфы как оружие 21 века”
                    </div>
                    <div className={styles.OpenLessonCard__description}>
                        <b>{['Описание', 'Description'][store.isEng]}</b>: На данном уроке вы обучитесь объяснять неграм, что независимо от цвета фигур, они ходят вторые.
                    </div>
                    <div className={styles.OpenLessonCard__mainContent}>
                        <div className={styles.OpenLessonCard__leftSide}>
                            <div><b>{['На уроке понадобится', 'On lesson you need'][store.isEng]}: </b></div>
                            <div>* Visual Studio Code</div>
                            <div>* Огонь святой инквизиции</div>
                            <div>* Шахматы</div>
                        </div>
                        <div className={styles.OpenLessonCard__verticalLine} />
                        <div className={styles.OpenLessonCard__rightSide}>
                            <div><b>{['Задание к уроку', 'Task for lesson'][store.isEng]}: </b></div>
                            <div className={styles.OpenLessonCard__underText}><b><i>Найти негра</i></b></div>
                            <div><b>{['Заметки преподавателя', "Tector's marks"][store.isEng]}</b></div>
                            <div className={styles.OpenLessonCard__underText}><b><i>Не приходи</i></b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ILessonCardMounth {
    lesson: TimeTableDataLesson;
    startTime: number;
}

const LessonCardMounth: FC<ILessonCardMounth> = ({ lesson, startTime }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { type, subject, startMinute, duration } = lesson;
    const logoNameSet = ['group', 'individ', 'group', 'group', 'group', 'group'] //доделать лого
    
    const logo = `img/for_timeTable/${logoNameSet[type]}_lesson.png`;
    const subjectName = lesson.subject;
    const endHour = startTime + Math.floor((duration + startMinute) / 60);
    const endMinute = (duration + startMinute) % 60;
    const timeLesson = `${startTime}:${startMinute < 10 ? '0' : ''}${startMinute} - ${endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`
    return (
        <div
            className={styles.card_lesson}
            onClick={
                () => { setIsOpen(true) }
            }
        >
            <img src={logo} alt="logo-card-lesson" />
            <span className={styles.card_lesson__subject_title}>{subjectName}</span>
            <span className={styles.card_lesson__timeframe}>
                {timeLesson}
            </span>
            {isOpen && <OpenLessonCard
                lesson={lesson}
                closeCard={setIsOpen}
                time={timeLesson}
            />}
        </div>
    )
}

interface ITimetableFrameMounth {
    selectMounth: number;
    selectYear: number;
    //lessons: MonthLessons     (КОММЕНТ ДЛЯ ТЕСТОВ УРОКОВ УБРАТЬ)
}

const TimetableFrameMounth: FC<ITimetableFrameMounth> = ({
    selectMounth,
    selectYear,
    //lessons    (КОММЕНТ ДЛЯ ТЕСТОВ УРОКОВ УБРАТЬ)
}) => {
    //const [currentDate, setCurrentDate] = useState<null | Date>(null);   Не знаю, почему ты сделать так, Саня. Расскажешь?
    const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Вот мой вариант, и еще можно от UseEffect избавиться.
    const startDay = new Date(selectYear, selectMounth, 1).getDay() == 0 ? 7 : new Date(selectYear, selectMounth, 1).getDay(); // Исправил воскресенье на 7 вместо 0. Надо проверить, нигде ли ничего не ломается.
    const amountDay = new Date(selectYear, selectMounth + 1, 0).getDate();
    const prevLastDay = new Date(selectYear, selectMounth, 0).getDate();
    const amountWeeksInMonth = getAmountWeeksInMonth(selectYear, selectMounth); // добавил функцию, которая считает кол-во недель в месяце. Вроде работает правильно. Но надо тестить.
    const { store } = useContext(Context);

    useEffect(() => {
        setCurrentDate(new Date())
    }, [])

    const renderTimeFrame = () => {
        const weekSet = [];
        for (let week = 0; week < amountWeeksInMonth; ++week) {
            const daySet = [];
            for (let day = 0; day < 7; ++day) {
                const dayNumber = week * 7 + day - startDay + 1;
                const dayNumberWihoutOvervlow = (week * 7 + day - startDay + 1) % amountDay + 1;
                const realDay = dayNumberWihoutOvervlow < 1 ? prevLastDay + dayNumberWihoutOvervlow : dayNumberWihoutOvervlow;
                const dayFromAnotherMounth = dayNumber < 0 || dayNumber >= amountDay;
                const currentDay = currentDate?.getFullYear() === selectYear && currentDate?.getMonth() === selectMounth && currentDate?.getDate() === dayNumber + 1;
                daySet.push(
                    <div
                        className={styles.cardDay}
                        style={{
                            opacity: dayFromAnotherMounth ? '0.5' : '1',
                            backgroundColor: currentDay ? 'rgba(0, 95, 107, 0.2)' : '',
                        }}
                        key={`day-#${weekSet.length * 7 + daySet.length}`}
                    >
                        <div className={styles.dayNumber} >
                            {realDay}
                        </div>
                        {/* {lessonsList && lessonsListContent}    (КОММЕНТ ДЛЯ ТЕСТОВ УРОКОВ УБРАТЬ)*/}
                    </div>
                );
            }
            weekSet.push(
                <div className={styles.cardRow} key={`week-#${weekSet.length + 1}`}>
                    {daySet}
                </div>
            );
        }

        return weekSet;
    }
    return (
        <div className={styles.wrapper}>
            {titleColumnDays(store.isEng)}
            {renderTimeFrame()}
        </div>
    )
}

export default TimetableFrameMounth