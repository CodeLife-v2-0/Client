import { FC, useContext } from 'react'
import styles from './MainDivision.module.css'
import { mainDivisionData } from '../../../localizationData'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const NotificationBlock: FC = () => {
    const { store } = useContext(Context)
    const notificationContent = mainDivisionData.notesFromdb[store.isEng].map(
        (notification, index) => <div
            className={styles.notification__message}
            key={`notification-${index}`}
        >
            · {notification}.
        </div>
    )
    return (
        <>{notificationContent}</>
    )
}

export default observer(NotificationBlock)