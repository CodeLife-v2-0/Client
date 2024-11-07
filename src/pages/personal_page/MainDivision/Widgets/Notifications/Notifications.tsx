import { FC, useState, CSSProperties } from 'react'
import styles from './Notificationts.module.css'
import NtfContent from './Notifications/NtfContent'
import NlContent from './NearLessons/NlContent'

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

const Notifications: FC = () => {

    const [isActiveNtf, setActiveNtf] = useState<boolean>(true);

    return (
        <section className={styles.main__Notifications}>
            <div className={styles.main__Header__Block__Notifications}>
                <div
                    style={
                        isActiveNtf ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => {if (!isActiveNtf) setActiveNtf(true)}
                    }
                    className={styles.NtfLsn__Title}
                >
                    Уведомления
                </div>
                <div
                    style={
                        !isActiveNtf ? isActiveTitle : isInActiveTitle
                    }
                    onClick={
                        () => {if (isActiveNtf) setActiveNtf(false)}
                    }
                    className={styles.NtfLsn__Title}
                >
                    Ближайшие уроки
                </div>
            </div>
            <div className={styles.main__Content__Block__Notifications}>
                {isActiveNtf ? <NtfContent/> : <NlContent/>}
            </div>
        </section>
    )
}

export default Notifications