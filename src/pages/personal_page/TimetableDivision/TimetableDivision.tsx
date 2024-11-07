import { FC, useState, useEffect, useContext, } from 'react'
import styles from './TimetableDivision.module.css'
import getCurrentDateInfo, { getNumderOfWeekAtYear, getMonthName, getWeekDateRange } from '../../../utils/getDate';
import { capitalize } from '../../../utils/stringFunc';
import TimetableFrameMounth from './TimetableFrameMounth';
import TimetableFrameWeek from './TimetableFrameWeek';
import TimetableFrameDay from './TimetableFrameDay';
import { observer } from "mobx-react-lite";
import { Context } from '../../..';
import { timeTablelocalization } from '../../../localizationData';
import { TimeTableData } from '../../../models/TimeTableData';

const { timeframes } = timeTablelocalization;

const enum Timeframes {
    mounth,
    week,
    day
}

const TimetableDivision: FC = () => {
    const { store } = useContext(Context);
    const [myLesson, setMyLesson] = useState<TimeTableData>({})
    const [activeCategories, setActiveCategories] = useState(Timeframes.mounth);
    const [activeDay, setActiveDay] = useState<null | number>(null);
    const [activeWeek, setActiveWeek] = useState<null | number>(null);
    const [activeMounth, setActiveMounth] = useState<null | number>(null);
    const [activeYear, setActiveYear] = useState<null | number>(null);
    const [stepBackFocus, setStepBackFocus] = useState<boolean>(false);
    const [stepForwardFocus, setStepForwardFocus] = useState<boolean>(false);
    const [indexOpenCardOnDay, setIndexOpenCardOnDay] = useState<number>(-1);

    useEffect(() => {
        const getLessons = async () => {
            const response = await store.getLessons()
            setMyLesson(response)
        }
        getLessons()
    }, [])
    const handleClickPointer = (increment: number) => {
        if (activeDay !== null && activeMounth !== null && activeWeek !== null && activeYear !== null) {
            if (activeCategories === Timeframes.mounth) {
                const newDate = new Date(activeYear, activeMounth + increment);
                setActiveYear(newDate.getFullYear());
                setActiveMounth(newDate.getMonth());
                setActiveDay(1);
            }
            else if (activeCategories === Timeframes.week) {
                const newDate = new Date(activeYear, activeMounth, activeDay + (increment * 7));
                setActiveYear(newDate.getFullYear());
                setActiveMounth(newDate.getMonth());
                setActiveWeek(getNumderOfWeekAtYear(newDate));
                setActiveDay(newDate.getDate());
            }
            else {
                const newDate = new Date(activeYear, activeMounth, activeDay + increment);
                setActiveYear(newDate.getFullYear());
                setActiveMounth(newDate.getMonth());
                setActiveWeek(getNumderOfWeekAtYear(newDate));
                setActiveDay(newDate.getDate());
                setIndexOpenCardOnDay(-1);
            }
        }
    }

    useEffect(() => {
        const currentData = new Date();
        const data = getCurrentDateInfo(currentData);
        setActiveMounth(data.currentMonth);
        setActiveDay(currentData.getDate());
        setActiveWeek(getNumderOfWeekAtYear());
        setActiveYear(data.currentYear);
    }, [])

    const timeframesButton = timeframes[store.isEng].map(
        (timeframe, index) => {
            const isActive = activeCategories === index;
            return <div
                style={{
                    backgroundColor: isActive ? '#009aad' : 'white',
                    color: isActive ? 'white' : 'black',
                }}
                onClick={() => {
                    setActiveCategories(index);
                    const currentDate = new Date();
                    setActiveYear(currentDate.getFullYear());
                    setActiveMounth(currentDate.getMonth());
                    setActiveWeek(getNumderOfWeekAtYear());
                    setActiveDay(currentDate.getDate());
                }}
                key={`timeframes-switcher-${timeframes[1][index]}`}
            >
                {timeframe}
            </div>
        }
    )

    const getStartTitleText = (selectCategory: number) => {
        if (selectCategory === Timeframes.day) return ['Сегодня', 'Today'][store.isEng];
        return ['Ваше расписание', 'Your timetable'][store.isEng];
    }

    const getDateTextForTitle = (selectCategory: number) => {
        if (selectCategory === Timeframes.mounth && activeMounth !== null) {
            return `${capitalize(getMonthName(activeMounth, store.isEng))}  ${activeYear}`;
        }
        if (selectCategory === Timeframes.week && activeYear !== null && activeWeek !== null) {
            return getWeekDateRange(activeYear, activeWeek, store.isEng);
        }
        if (activeMounth !== null) {
            return `${activeDay} ${capitalize(getMonthName(activeMounth, store.isEng))}  ${activeYear}`;
        }
    }

    const timeframesComponent = (selectCategories: number) => {
        if (selectCategories === Timeframes.mounth && activeMounth && activeYear) {
            return <TimetableFrameMounth
                selectMounth={activeMounth}
                selectYear={activeYear}
            //lessons={(lessons as Timetable)[activeYear][activeMounth]} (КОММЕНТ ДЛЯ ТЕСТОВ УРОКОВ УБРАТЬ)
            />;
        }
        if (selectCategories === Timeframes.week && activeDay && activeWeek && activeMounth && activeYear) {
            return <TimetableFrameWeek
                selectDay={activeDay}
                selectWeek={activeWeek}
                selectMonth={activeMounth}
                selectYear={activeYear}
            />;
        }
        if (selectCategories === Timeframes.day && activeDay && activeMounth && activeYear && (activeYear in myLesson) && (activeMounth in myLesson[activeYear]) && (activeDay in myLesson[activeYear][activeMounth])) {
            return <TimetableFrameDay
                selectDay={activeDay}
                selectMonth={activeMounth}
                selectYear={activeYear}
                lessonsDay={myLesson[activeYear][activeMounth][activeDay]}
                indexOpenCard={indexOpenCardOnDay}
                setIndexOpenCard={setIndexOpenCardOnDay}
            />
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.switches_pointer}>
                    <div onClick={() => { handleClickPointer(-1) }}
                        onMouseEnter={(e) => { e.stopPropagation(); setStepBackFocus(true); }}
                        onMouseLeave={(e) => { e.stopPropagation(); setStepBackFocus(false); }}>
                        <div style={{ backgroundColor: stepBackFocus ? 'white' : 'black' }} />
                        <div style={{ backgroundColor: stepBackFocus ? 'white' : 'black' }} />
                    </div>
                    <div onClick={() => { handleClickPointer(1) }}
                        onMouseEnter={(e) => { e.stopPropagation(); setStepForwardFocus(true); }}
                        onMouseLeave={(e) => { e.stopPropagation(); setStepForwardFocus(false); }}>
                        <div style={{ backgroundColor: stepForwardFocus ? 'white' : 'black' }} />
                        <div style={{ backgroundColor: stepForwardFocus ? 'white' : 'black' }} />
                    </div>
                </div>
                <div className={styles.main_title}>
                    <div className={styles.start_title}>
                        {getStartTitleText(activeCategories)}
                    </div>
                    <div className={styles.end_title}>
                        {getDateTextForTitle(activeCategories)}
                    </div>
                </div>
                <div className={styles.switches_timeframe}>
                    {timeframesButton}
                </div>
            </div>

            <section className={styles.timetable}>
                {timeframesComponent(activeCategories)}
            </section>

        </div>
    )
}

export default observer(TimetableDivision);