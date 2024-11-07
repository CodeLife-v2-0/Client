import { FC } from 'react'
import styles from './DialogWindowCheckAll.module.css'
import InvitationLetter from '../../../../components/Decorations/InvitationLetter/InvitationLetter';
import { convertDateInEngFormatString } from '../../../../utils/getDate';

interface IDialogWindowCheckAll {
    participants: string[];
    date: string;
    course: string;
    letterText: string;
}

const DialogWindowCheckAll: FC<IDialogWindowCheckAll> = ({ participants, date, course, letterText }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.leftInnerWrapper}>
                    <p>На основе ранее введенных вами данных был создан пригласительный билет.</p>
                    <p>Проверьте пожалуйста его корректность. Он будет отправлен всем участникам активности по почте.</p>
                    <p>Получатели:<br />
                        <ul>
                            {participants.map(el => <li>{el}</li>)}
                        </ul>
                    </p>
                </div>
                <div className={styles.rightInnerWrapper}>
                    <InvitationLetter
                        date={convertDateInEngFormatString(date)}
                        recipient={participants[0]}
                        subjectName={course}
                        letterText={letterText}
                    />
                </div>
            </div>
        </div>
    )
}

export default DialogWindowCheckAll