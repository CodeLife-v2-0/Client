import { FC, useContext } from 'react'
import styles from './MainDivision.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const recordsData = [
    {
        videoImg: "img/records_form/video1.png",
        videoAlt: "video1",
        videoTitle: ["C++ урок 16", "C++ lesson 16"],
        videoDescription: ["Разбор логических операторов в схемах", "Analysis of logical operators in circuits"],
        videoDate: "28.03.2023",
    },
    {
        videoImg: "img/records_form/video2.png",
        videoAlt: "video2",
        videoTitle: ["Python урок 21", "Python lesson 21"],
        videoDescription: ["Изучение модулей numpy и tkinter и их использование.", "Study of numpy and tkinter modules and their use."],
        videoDate: "28.03.2023",
    },
]

const RecordsBlock: FC = () => {

    const { store } = useContext(Context);

    const recordsContent = recordsData.map(
        record =>
            <div className={styles.records__item} key={`video-${record.videoAlt}`}>
                <div className={styles.record__img__wrapper}>
                <iframe width="100%" height="100%"
                src="https://www.youtube.com/embed/20PYqJ4mkmc?fs=1" title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen />
                </div>
                <div className={styles.video__description}>
                    <div className={styles.video__content}>
                        {record.videoTitle[store.isEng]}.
                        {record.videoDescription[store.isEng]}
                    </div>
                    <div className={styles.video__date}>
                        {record.videoDate}
                    </div>
                </div>
            </div>
    )
    return (
        <>{recordsContent}</>

    )
}

export default observer(RecordsBlock)