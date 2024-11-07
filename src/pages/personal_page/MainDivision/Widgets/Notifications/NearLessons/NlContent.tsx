import { FC, useContext, useEffect, useState } from 'react'
import styles from './NlContent.module.css'
import { Context } from '../../../../../..';
import { lessonConvertNearLesson, dateToStringHM } from '../../../../../../utils/getDate';
import { ILecruter } from '../../../../../../models/Lecturer';
import { ICourseR } from '../../../../../../models/Course';

interface INearLesson {
    date: Date;
    subject: ICourseR;
    lecturer: ILecruter;
}

const NlContent: FC = () => {
    const [lessons, setLessons] = useState<INearLesson[]>([]);
    const { store } = useContext(Context)
    useEffect(() => {
        const dbLessonsResponse = store.getLessons();
        dbLessonsResponse.then(
            lessonsData => {
                const newData = lessonConvertNearLesson(lessonsData);
                Promise.all(newData.map(lesson => {
                    const { date } = lesson;
                    const coursePromise = store.getCourse(lesson.subject);
                    const lecturerPromise = store.getLecturer(lesson.lecturer);
                    return Promise.all([coursePromise, lecturerPromise])
                        .then(([subject, lecturer]) => ({
                            date,
                            subject,
                            lecturer,
                        }));
                })).then(formatData => { setLessons(formatData) })
            }
        )
    }, [])
    if (!lessons.length) return (<div className={styles.nl__NoLessons}>Уроки не найдены.</div>)
    const content = lessons.map((nl, index) => <div className={styles.nl} key={`Near__Lessons__${index}__main__Division`}>
        <img
            src={`/svg/nearLessonsIcons/${nl.subject.name?.split(';')[1]}.svg`}
            alt=''
            className={styles.nl__Image__Block}
        />
        <div className={styles.nl__txt__Block}>
            <h1 className={styles.nl__txt__Title}>{nl.subject.name?.split(';')[1]}</h1>
            <h2 className={styles.nl__txt__Time__Tutor}>{dateToStringHM(nl.date)}, {nl.lecturer.name} {nl.lecturer.surName}</h2>
            <p className={styles.nl__txt__Description}>{'desc'}</p>
        </div>
    </div>)
    return (
        <section className={styles.main__nl}>{content}</section>
    )
}


export default NlContent