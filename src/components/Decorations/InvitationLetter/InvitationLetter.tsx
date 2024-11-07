import { FC } from 'react'
import styles from './InvitationLetter.module.css'

interface IInvitationLetter {
    date: string,
    recipient: string,
    subjectName: string,
    letterText: string;
}

const InvitationLetter: FC<IInvitationLetter> = ({ date, recipient, subjectName, letterText }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.coLogo}>Code Life</p>
                <p className={styles.rDescription}>personal invitation change your life</p>
            </div>
            <div className={styles.body}>
                <p>
                    Дорогой друг,<br />
                    &emsp;{letterText}
                </p>
                <img
                    src={`img/courses_logo/${subjectName}.png`}
                    alt="subject-logo"
                />
            </div>
            <div className={styles.footer}>
                <p className={styles.startTime}>start: {date}</p>
                <p className={styles.recipient}>for: {recipient}</p>
            </div>
        </div>
    )
}

export default InvitationLetter