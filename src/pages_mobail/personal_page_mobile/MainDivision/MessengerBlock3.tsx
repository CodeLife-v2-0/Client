import { FC, useContext } from 'react'
import styles from './MainDivision.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const chatLeftData = [
    {
        userImg: "img/chat_form/anna_sivakova.png",
        userImgAlt: "Anna Sivakova",
        userStatus: "img/chat_form/online.png",
        userStatusAlt: "online",
        userName: ["Аня Сивакова", "Anna Sivakova"],
        userCourse: "Python, Web",
    },
    {
        userImg: "img/chat_form/liza_efimova.png",
        userImgAlt: "Liza Efimova",
        userStatus: "img/chat_form/mobile.png",
        userStatusAlt: "mobile",
        userName: ["Лиза Ефимова", "Liza Efimova"],
        userCourse: "C++",
    },
    {
        userImg: "img/chat_form/kate_zamotina.png",
        userImgAlt: "Kate Zamotina",
        userStatus: "img/chat_form/offline.png",
        userStatusAlt: "offline",
        userName: ["Екатерина Замотина", "Ekaterina Zamotina"],
        userCourse: "Python, Web, ...",
    },
    {
        userImg: "img/chat_form/maria_utkina.png",
        userImgAlt: "Maria Utkina",
        userStatus: "img/chat_form/offline.png",
        userStatusAlt: "offline",
        userName: ["Мария Уткина", "Maria Utkina"],
        userCourse: "JavaScript",
    },
]

const MessengerBlock: FC = () => {

    const { store } = useContext(Context);

    const chatLeftContent = chatLeftData.map(
        person =>
            <div className={styles.user__string} key={`row-msg-${person.userImgAlt}`}>
                <div className={styles.user__string__1}>
                    <img src={person.userImg}
                        alt={person.userImgAlt}
                        className={styles.person__img}
                    />
                    <img src={person.userStatus}
                        alt={person.userStatusAlt}
                        className={styles.status}
                    />
                </div>
                <div className={styles.msg__description}>
                    <div className={styles.user__string__2}>{person.userName[store.isEng]}</div>
                    <div className={styles.user__string__3}>{person.userCourse}</div>
                </div>
            </div>
    )
    return (
        <>{ chatLeftContent }</>
    )
}

export default observer(MessengerBlock)