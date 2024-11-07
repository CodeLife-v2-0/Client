import { FC, useState, useRef, useEffect } from 'react'
import styles from './OpenCourseOnMain.module.css'

const ProgramRow: FC<{
    counter: number,
    title: string,
    subPoints: JSX.Element[]
}> = ({ counter, title, subPoints }) => {
    const [detailShowed, setDetailShowed] = useState(true);
    const programPointRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (counter === 1) { setDetailShowed(false) }
    }
        , [counter])
    useEffect(() => {
        if (programPointRef.current) {
            const elementHeight = programPointRef.current.offsetHeight;
            programPointRef.current.style.marginTop = `${(elementHeight - 10) * -Number(detailShowed)}px`;
        }
    }
        , [detailShowed]);


    return (
        <div
            className={styles.programPoint}
            key={`subpoints-block-${counter}`}
        >
            <div
                className={styles.programPointHeader}
                onClick={() => { setDetailShowed(!detailShowed) }}
            >
                <div className={styles.programNumberBlock}>
                    <div className={styles.programNumber}>
                        {counter}
                    </div>
                    <div className={styles.stageWord}>
                        ЭТАП
                    </div>
                </div>
                <div className={styles.programTitle}>
                    {title}
                </div>
            </div>
            <div className={styles.programPointBody} ref={programPointRef}>
                {subPoints}
            </div>
        </div>)
}

export default ProgramRow