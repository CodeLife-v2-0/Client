import { FC } from 'react'
import styles from './UserRow.module.css'
import { shortInfo } from '../../../pages/personal_page/Admin/Activities/Activities'
import PrivateImage from '../../PA/PrivateImage/PrivateImage'

interface IUserRow {
    recipients: shortInfo,
    imgWidth?: number
}

const UserRow: FC<IUserRow> = ({ recipients, imgWidth = 20 }) => {
    const { name, email, avatar } = recipients;
    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarBlock} style={{ width: `${imgWidth}%` }}>
                <PrivateImage imageName={avatar} />
            </div>
            <div className={styles.infoBlock} style={{ width: `${80 - imgWidth}%` }}>
                <div className={styles.nameBlock}>{name}</div>
                <div>{email || 'Укажите почту'}</div>
            </div>
            <div className={styles.letterButton}>
                <div className={styles.letterGround}>
                    <object type="image/svg+xml" data="/svg/logo/letter.svg">
                        -
                    </object>
                </div>
            </div>
        </div>
    )
}

export default UserRow