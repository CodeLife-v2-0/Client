import { FC, useContext, useEffect, useState } from 'react'
import styles from './MainDivision.module.css'
import { mainDivisionData } from '../../../localizationData'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import { getLocaleVariant } from '../../../utils/stringFunc'
import { formatDate } from '../../../utils/getDate'
import { TimeTableDataLesson } from '../../../models/TimeTableData'

const LessonsBlock: FC = () => {

    const { store } = useContext(Context);

    const [lessonsData, setLessonsData] = useState<TimeTableDataLesson[][]>([]);

    useEffect( () => {
        let lessonsRow = [];
        const array100024 = [];
        for (let lesson of mainDivisionData.lesFordb){
            lessonsRow.push(lesson);
            if (!(lessonsRow.length % 2)){
                array100024.push([...lessonsRow])
                lessonsRow = [];
            }
        }
        // setLessonsData(array100024);
    }, [store.isEng, mainDivisionData.lesFordb])

    const lessonsContent = (lessonsData.length !== 0) && lessonsData.map(
        lessonsRow => <div className={styles.les__row}>
            {lessonsRow.map(
                lesson => <div className={styles.les}>
                    {/* {getLocaleVariant(lesson.subject, store.isEng)}<br/>
                    {formatDate(new Date(lesson.date), store.isEng)}<br/>
                    {'lesson time'} */}
                </div>
            )}
        </div>
    )

    return (
        <>{lessonsContent}</>
    )
}

export default observer(LessonsBlock)