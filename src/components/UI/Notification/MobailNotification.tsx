import { FC, Dispatch, SetStateAction, MouseEvent } from 'react'
import styles from './MobailNotification.module.css'


const MobailNotification: FC<{ message: [string, Dispatch<SetStateAction<string>>] }> = ({ message }) => {

    const closeNtf = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        message[1]('');
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.inner_wrapper}>
                <div className={styles.title}>
                    Уведомление
                </div>
                <div className={styles.msg}>
                    {message[0]}
                </div>
                <button onClick={closeNtf}>
                    Продолжить так
                </button>
            </div>
        </section >
    )
}

export default MobailNotification