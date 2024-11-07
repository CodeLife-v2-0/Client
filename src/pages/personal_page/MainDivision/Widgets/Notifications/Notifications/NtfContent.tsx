import { FC } from 'react'
import styles from './NtfContent.module.css'
const dataNtf = [
    {
        titleName: 'Оплата',
        description: 'Описание блока: test note confirmed test note confirmed test note confirmed test note confirmed test',
        imageNtf: 'CreditCard'
    },
    {
        titleName: 'Новости платформы',
        description: 'Описание блока: test note confirmed test note confirmed test note confirmed test note confirmed test',
        imageNtf: 'Bricks'
    },
    {
        titleName: 'Абонемент',
        description: 'Описание блока: test note confirmed test note confirmed test note confirmed test note confirmed test',
        imageNtf: 'Clock'
    },
    {
        titleName: 'Вознаграждение за активность',
        description: 'Описание блока: test note confirmed test note confirmed test note confirmed test note confirmed test',
        imageNtf: 'ClCoins'
    },
]
const NtfContent: FC = () => {
    const content = dataNtf.map((ntf,index) => <div className={styles.ntf} key={`Notifications__Content__${index}__main__Division`}>
        <img
            src={`/svg/notificationsIcons/${ntf.imageNtf}.svg`}
            alt=''
            className={styles.ntf__Image__Block}
        />
        <div className={styles.ntf__txt__Block}>
            <h1 className={styles.ntf__txt__Title}>{ntf.titleName}</h1>
            <p className={styles.ntf__txt__Description}>{ntf.description}</p>
        </div>
    </div>)
    return (
        <section className={styles.main__ntf}>{content}</section>
    )
}

export default NtfContent