import { FC, useContext, Dispatch, SetStateAction, useMemo, useEffect, useState } from 'react';
import styles from './TimetableFrameDay.module.css';
import { timeTablelocalization } from '../../../localizationData';
import { Context } from '../../..';
import OneLessonOpenDay from './OneLessonOpenDay';
import { TimeTableDataDay, TimeTableDataLesson } from '../../../models/TimeTableData';
import { observer } from 'mobx-react-lite';

interface ITimetableFrameDay {
    selectDay: number;
    selectMonth: number;
    selectYear: number;
    lessonsDay: TimeTableDataDay;
    indexOpenCard: number,
    setIndexOpenCard: Dispatch<SetStateAction<number>>
}

const logo: string[] = [
    `img/for_timeTable/individ_lesson.png`,
    `img/for_timeTable/group_lesson.png`
];


const TimetableFrameDay: FC<ITimetableFrameDay> = ({
    selectDay,
    selectMonth,
    selectYear,
    lessonsDay,
    indexOpenCard,
    setIndexOpenCard }
) => {
    const [courseName, setCourseName] = useState<{ [oneLesson: string]: string }>({})
    const { store } = useContext(Context);
    useEffect(() => {
        const fetchCourseName = async () => {
            for (let hour in lessonsDay) {
                const responseData = await store.getCourse(lessonsDay[hour].subject)
                setCourseName({
                     ...courseName,
                      [hour]: responseData.name?.split(';')[store.isEng] || '' 
                    });
            }
        }
        fetchCourseName()
    }, [store.isEng])
    const today = new Date(selectYear, selectMonth, selectDay);
    // Пример закрытой карточки урока.
    const lessonCardClose = (indexOpenCard: number) => {

        let lessons = [];
        for (let oneLesson in lessonsDay) {
            lessons.push(
                <div
                    className={styles.lessonCardClose}
                    style={{
                        'top': `${((Number(oneLesson) - 8) * 2 + lessonsDay[oneLesson].startMinute / 30) * 10 / 3}%`,
                        'height': `${(lessonsDay[oneLesson].duration / 15 * 2)}%`,
                        'zIndex': indexOpenCard == Number(oneLesson) ? '10' : '0',
                        'opacity': indexOpenCard == Number(oneLesson) ? '1' : '0.5'
                    }}
                    onClick={() => setIndexOpenCard(Number(oneLesson))}>
                    <div className={styles.lessonCardCloseInfo}>
                        <div className={styles.lessonCardCloseImg}>
                            <img src={logo[lessonsDay[oneLesson].type - 1]} />
                        </div>
                        <div className={styles.lessonCardCloseText}>
                            {courseName[oneLesson]}
                        </div>
                    </div>

                </div>
            );
        }
        return lessons

    }

    const renderFrame = () => {
        const daySet = [];
        const dayName = [];
        const dayNameToday = today.getDay() === 0 ? 7 : today.getDay();
        dayName.push(<div className={styles.timeTitle}>Time</div>);
        dayName.push(<div className={styles.dayNameTitle}>
            {timeTablelocalization.titleColumnData[store.isEng][dayNameToday - 1]}
        </div>)
        for (let col = 0; col < 2; col++) {
            if (col == 0) {
                const timeTable = [];
                let startTime = 8;
                for (let time = 0; time < 30; time++) {
                    timeTable.push(
                        <div className={styles.timeCell} key={`${col}-${time}`}>
                            {time % 2 == 0 ? startTime++ + ':00' : ''}
                        </div>
                    );
                }
                daySet.push(
                    <div className={styles.timeCellWrapper}>
                        {timeTable}
                    </div>
                );
            } else {
                daySet.push(
                    <div className={styles.lessonsCardClose}>
                        {lessonCardClose(indexOpenCard)}
                    </div>
                )
                // Тут карточки уроков
            }
        }
        return <div className={styles.timeWrapper}>
            <div className={styles.titleCardRow}>
                {dayName}
            </div>
            <div className={styles.lessonsCardCloseWrapper}>
                {daySet}
            </div>
        </div>
    }

    const lessonCard = (index: number, lesson: TimeTableDataLesson) => {
        return (
            <div className={styles.lessonInfoWrapper}>
                {index == -1
                    ? <div className={styles.noChouseLesson}>
                        Не выбран урок. Выберите урок для просмотра дополнительно информации
                    </div>
                    : <OneLessonOpenDay lesson={lesson} startHour={index} />}
            </div>
        )
    }; // Карточка урока, который открыт.


    return (
        <div className={styles.wrapper}>
            {renderFrame()}
            {lessonsDay == undefined
                ? <div className={styles.lessonInfoWrapper}>
                    <div className={styles.noChouseLesson}>
                        В этот день у нас нет ни одного урока
                    </div>
                </div>
                : lessonCard(indexOpenCard, lessonsDay[indexOpenCard])}
        </div>
    )
}

export default observer(TimetableFrameDay)