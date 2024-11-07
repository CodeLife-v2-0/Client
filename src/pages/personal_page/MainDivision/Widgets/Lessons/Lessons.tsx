import { FC, useState, CSSProperties } from 'react';
import styles from './Lessons.module.css';


const countOfLettersForTritleDot = 100;

const lessonsData = [
    {
        url: "https://www.youtube.com/watch?v=0rzB_-fTy5A",
        img_url: "//img.youtube.com/vi/0rzB_-fTy5A/hqdefault.jpg",
        object: "C++",
        numberOfLesson: 19,
        lessonTime: "14:25",
        theather: "Андрей НеДобренко",
        description: "Описание урока: test note confirmed test note confirmed test note confirmed test note confirmed test note confirmed test note confirmed test"
    },
    {
        url: "https://www.youtube.com/watch?v=C20VqEFnKCM",
        img_url: "//img.youtube.com/vi/C20VqEFnKCM/hqdefault.jpg",
        object: "JavaSrcipt",
        numberOfLesson: 10,
        lessonTime: "16:00",
        theather: "Александр Морозильник",
        description: "Описание урока: test note confirmed test note confirmed test note confirmed "
    },
];

const isActiveTitle: CSSProperties = {
    '--extend__width': '60%',
    backgroundColor: 'rgba(0,0,0,0.01)',
    cursor: 'default',
} as CSSProperties;
const isInActiveTitle: CSSProperties = {
    '--opacity': 0,
    borderBottom: '0.09259vh solid #009AAD',
    backgroundColor: 'rgba(0, 154, 173,0.28)',
    cursor: 'pointer',
} as CSSProperties;

const generateVideoLessons = () => {
    const content = lessonsData.map((lesson, index) => {
        let longDescription: boolean = false;
        let newDescription = ""
        if (lesson.description.length >= countOfLettersForTritleDot) {
            longDescription = true;
            for (let i = 0; i != countOfLettersForTritleDot; ++i) {
                newDescription += lesson.description[i];
            }
            newDescription += " ...";
        }
        return <div className={styles.main__Content__Block__One__Lesson}
            key={`Lessons__Content__${index}__main__Division`}
            onClick={() => {window.open(lesson.url, "_blank")}}>
            <div className={styles.main__Content__Block__One__Lesson__Img}>
                <img src={lesson.img_url}/>
                <div className={styles.main__Content__Block__One__Lesson__Img__Play}>
                    <img src='/svg/lessonsIcons/play_button.svg'/>
                </div>
                
            </div>
            <div className={styles.main__Content__Block__One__Lesson__Text}>
                <div className={styles.main__Content__Block__One__Lesson__Text__Header}>
                    <span>{lesson.object}: Урок {lesson.numberOfLesson}</span>
                </div>
                <div className={styles.main__Content__Block__One__Lesson__Text__PreHeader}>
                    {lesson.lessonTime}, {lesson.theather}
                </div>
                <div className={styles.main__Content__Block__One__Lesson__Text__Description}>
                    {longDescription ? newDescription : lesson.description}
                </div>
            </div>
        </div>
    })
    return content;
}

const Lessons: FC = () => {

    const [isActiveNtf, setActiveNtf] = useState<number>(0);

    return (
        <section className={styles.main__Lessons}>
            <div className={styles.main__Header__Block__Lessons}>
                <div
                    style={
                        isActiveNtf === 0 ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => { if (isActiveNtf !== 0) setActiveNtf(0) }
                    }
                    className={styles.lsnMtPrjCr__Title}>
                    Занятия
                </div>
                <div
                    style={
                        isActiveNtf === 1 ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => { if (isActiveNtf !== 1) setActiveNtf(1) }
                    }
                    className={styles.lsnMtPrjCr__Title}>
                    Доп. материалы
                </div>
                <div
                    style={
                        isActiveNtf === 2 ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => { if (isActiveNtf !== 2) setActiveNtf(2) }
                    }
                    className={styles.lsnMtPrjCr__Title}>
                    Ваши проекты
                </div>
                <div
                    style={
                        isActiveNtf === 3 ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => { if (isActiveNtf !== 3) setActiveNtf(3) }
                    }
                    className={styles.lsnMtPrjCr__Title}>
                    Кодревью
                </div>
            </div>
            <div className={styles.main__Content__Block__Lessons}>
                {isActiveNtf === 0 && <div className={styles.main__Content__Block__Lesson__Wrapper}>
                    {generateVideoLessons()}
                </div>}
            </div>
        </section>
    )
}

export default Lessons