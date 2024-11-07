import React, { FC, useContext, useState, Dispatch, SetStateAction } from 'react'
import styles from './Calendar.module.css'
import { timeTablelocalization } from './../../../../localizationData'
import { getAmountWeeksInMonth } from './../../../../utils/getDate'
import { Context } from '../../../..'
import { capitalize } from '../../../../utils/stringFunc'

interface ICalendar {
    activeMonth: number,
    activeYear: number,
    chousenDates: string[],
    chousePastDate: boolean,
    addMountAtLoop: number,
    activePoint: number,
    countLoop: string,
    setActiveMonth: Dispatch<SetStateAction<number>>,
    setActiveYear: Dispatch<SetStateAction<number>>,
    setChousenDates: Dispatch<SetStateAction<string[]>>,
    setChousePastDate: Dispatch<SetStateAction<boolean>>,
}

const Calendar: FC<ICalendar> = (
    { activeMonth,
        activeYear,
        chousenDates,
        chousePastDate,
        addMountAtLoop,
        activePoint,
        countLoop,
        setActiveMonth,
        setActiveYear,
        setChousenDates,
        setChousePastDate
    }) => {

    const { store } = useContext(Context);
    const [chouseMonth, setChouseMonth] = useState<boolean>(false);
    const [chouseYear, setChouseYear] = useState<boolean>(false);

    const changeChousenDate = (e: React.MouseEvent<HTMLDivElement>) => {
        setChousePastDate(false);
        const day = Number(e.currentTarget.childNodes[0].textContent);
        const month = Number(e.currentTarget.dataset.month);
        const year = Number(e.currentTarget.dataset.year);
        const now = new Date();
        if (new Date(year, month, day).getTime() - now.getTime() > -86400000 && activePoint != 3) {
            const datestr = day + '.' + month + '.' + year;
            const index = chousenDates.findIndex(item => item === datestr);
            if (index != -1) {
                e.currentTarget.style.backgroundColor = '';
                chousenDates.splice(index, 1);
            } else {
                e.currentTarget.style.backgroundColor = 'rgba(11, 145, 255, 0.5)';
                chousenDates.push(datestr);
            }
            console.log(chousenDates);
            setChousenDates([...chousenDates]);
        }else{
            setChousePastDate(true);
        }
    }

    const getBackgroundColor = (day: number, month: number, year: number) => {
        const datestr = day + '.' + month + '.' + year;
        const index = chousenDates.findIndex(item => item === datestr);
        if (index != -1) {
            return 'rgba(11, 145, 255, 0.5)'
        }
        return '';
    }

    const selectMonth = (e: React.MouseEvent<HTMLDivElement>) => {
        const nameOfMonth = String(e.currentTarget.childNodes[0].textContent);
        const indexOfMonth = timeTablelocalization.mouthName[store.isEng].findIndex(item => capitalize(item) == nameOfMonth);
        setActiveMonth(indexOfMonth);
        setChouseMonth(false);
    }
    const selectYear = (e: React.MouseEvent<HTMLDivElement>) => {
        const numberOfYear = Number(e.currentTarget.childNodes[0].textContent);
        setActiveYear(numberOfYear);
        setChouseYear(false);
    }
    const getCalendar = (year: number, month: number) => {
        const amountOfWeeks = getAmountWeeksInMonth(year, month);
        const startMonth = new Date(year, month, 1)
        const monthDate = [];
        const dateHeader = [];
        let startDay = startMonth.getDay() == 1
            ? 1 : startMonth.getDay() == 0 ? -5 : (startMonth.getDay() - 2) * -1;
        let startDate = new Date(year, month, startDay);
        for (let i = 1; i < 8; i++) {
            dateHeader.push(
                <div className={styles.calendarDayHeader}>
                    {timeTablelocalization.DayNameCutback[store.isEng][i == 7 ? 0 : i]}
                </div>)
        }
        for (let week = 0; week < amountOfWeeks; week++) {
            const weekDate = [];
            for (let day = 0; day < 7; day++) {
                const cellMonth = startDay <= 0
                    ? activeMonth == 0 ? 11 : activeMonth - 1
                    : startDay > new Date(activeYear, activeMonth + 1, 0).getDate()
                        ? activeMonth + 1 : activeMonth;
                const cellYear = activeMonth == 0 && startDay <= 0 ? activeYear - 1
                    : activeMonth == 11 && startDay > new Date(activeYear, activeMonth + 1, 0).getDate()
                        ? activeYear + 1 : activeYear
                weekDate.push(<div className={`${activePoint == 3 ? styles.calendarDayCellPoint3 : styles.calendarDayCell}`} 
                    data-month={cellMonth}
                    data-year={cellYear}
                    style={{
                        color: `${startDay > 0
                            && startDay <= new Date(year, month + 1, 0).getDate()
                            ? 'white' : 'rgba(177, 177, 177, 1)'}`,
                        backgroundColor: getBackgroundColor(startDate.getDate(), cellMonth, cellYear)
                    }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => changeChousenDate(e)}>
                    {startDate.getDate()}
                </div>);
                startDay++
                startDate = new Date(year, month, startDay);
            }
            monthDate.push(<div className={styles.calendarDayRow} style={{ height: `${100 / amountOfWeeks}%` }}>{weekDate}</div>);
        }
        return <>
            <div className={styles.calendarDaysHeader}>
                {dateHeader}
            </div>
            <div className={styles.calendarDaysNumbers}>
                {monthDate}
            </div>
        </>
    }
    const chousenTime = (range: string) => {
        let m = range === 'month' ? 0 : range === 'year' ? new Date().getFullYear() : 0;
        const monthsTable = [];
        for (let i = 0; i < 4; i++) {
            const monthsRow = [];
            for (let j = 0; j < 3; j++) {
                monthsRow.push(
                    <div className={styles.calendarChouseTimeCell}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => { range === 'month' ? selectMonth(e) : selectYear(e) }}>
                        {range === 'month'
                            ? capitalize(timeTablelocalization.mouthName[store.isEng][m++])
                            : range === 'year' ? m++ : 0}
                    </div>)
            }
            monthsTable.push(
                <div className={styles.calendarChouseTimeRow}>
                    {monthsRow}
                </div>)
        }
        return monthsTable
    }

    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.calendarMohtnAndYearHeader}>
                <div className={styles.calendarMohtn} onClick={() => { setChouseMonth(true) }}>
                    {capitalize(timeTablelocalization.mouthName[store.isEng][activeMonth])}
                </div>
                <div className={styles.calendarYear} onClick={() => { setChouseYear(true) }}>
                    {activeYear}
                </div>
            </div>
            {getCalendar(activeYear, activeMonth)}
            {chouseMonth && <div className={styles.calendarChouseTime}>
                {chousenTime('month')}
            </div>}
            {chouseYear && <div className={styles.calendarChouseTime}>
                {chousenTime('year')}
            </div>}
        </div>
    )
}

export default Calendar