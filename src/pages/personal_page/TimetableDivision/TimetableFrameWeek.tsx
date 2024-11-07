import { FC, useContext, memo } from 'react'
import styles from './TimetableFrameWeek.module.css'
import { timeTablelocalization } from '../../../localizationData';
import { Context } from '../../..';
import { getWeekDateRange } from '../../../utils/getDate'

const { titleColumnData } = timeTablelocalization;


const titleColumnDays = (lang: number, selectWeek: number, selectMonth: number, selectYear: number) => {
    const DaysNumbers = getWeekDateRange(selectYear, selectWeek, lang).split(' ');
    const DateWeek = DaysNumbers.length === 4
        ? new Date(selectYear, selectMonth, +DaysNumbers[0] - 1)
        : new Date(selectYear, selectMonth - 1, +DaysNumbers[0] - 1);
    return <div className={styles.titleCardRow}>
        <div className={styles.timeImage}>Time</div>
        {titleColumnData[lang].map(
            (dayOfWeek, index) => {
                DateWeek.setDate(DateWeek.getDate() + 1);
                return <div
                    key={`title-column-${lang == 0 ? 'ru' : 'en'}-${titleColumnData[1][index]}`}
                    className={styles.titleCard}>
                    <div>{DateWeek.getDate()}.{DateWeek.getMonth() + 1 >= 10 ? (DateWeek.getMonth() + 1) : '0' + (DateWeek.getMonth() + 1)}</div>
                    {dayOfWeek}
                </div>
            }
        )}
    </div>
}

interface ITimetableFrameWeek {
    selectDay: number;
    selectWeek: number;
    selectMonth: number;
    selectYear: number;
}

const TimetableFrameWeek: FC<ITimetableFrameWeek> = ({selectDay, selectWeek, selectMonth, selectYear }) => {
    const { store } = useContext(Context);
    const renderFrime = () => {
        const weekSet = [];
        for (let day = -1; day < 7; day++) {
            if (day < 0) {
                const timeTable = [];
                let startTime = 8;
                for (let time = 0; time < 30; time++) {
                    timeTable.push(
                        <div className={styles.timeCell}>
                            {time % 2 == 0 ? startTime++ + ':00' : ''}
                            <div className={styles.underLine}/>
                        </div>
                    );
                }
                weekSet.push(
                    <div className={styles.timeCellWrapper}>
                        {timeTable}
                    </div>
                );
            } else {
                const today = new Date();
                let isToday = false;
                const dayNameToday = today.getDay() === 0 ? 7 : today.getDay()
                if (today.getFullYear() === selectYear && today.getMonth() === selectMonth && today.getDate() === selectDay && dayNameToday === day + 1)
                    isToday = true;
                weekSet.push(
                    <div className={styles.dayOfWeek} style={{backgroundColor: isToday ? 'rgba(0, 95, 107, 0.2)' : ''}}>
                        {/* Место для карточек уроков */}
                    </div>
                )
            }
        }
        return <div className={styles.weekSetWrapper}>
            {weekSet}
        </div>;
    }
    return (
        <div className={styles.wrapper}>
            {titleColumnDays(store.isEng, selectWeek, selectMonth, selectYear)}
            {renderFrime()}
        </div>
    )
}

export default memo(TimetableFrameWeek)

