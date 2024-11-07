import { FC, useState, Dispatch, SetStateAction } from 'react';
import styles from './MainDivision.module.css';
import Notifications from './Widgets/Notifications/Notifications';
import Lessons from './Widgets/Lessons/Lessons';
import ChatBlock from './Widgets/ChatBlock/ChatBlock';
import CertificatesBlock from './Widgets/CertificatesBlock/CertificatesBlock';

interface IMainDivision {
    setActiveContentCategory: Dispatch<SetStateAction<number>>;
    setActiveChatIdMsgBlock: Dispatch<SetStateAction<string>>;
}

const MainDivision: FC<IMainDivision> = ({setActiveContentCategory, setActiveChatIdMsgBlock}) => {

    return <section className={styles.wrapper}>
        <div className={styles.cl__Logo__background}>
            <h1>Code Life</h1>
        </div>
        <div className={styles.inner__wrapper}>
            <div className={styles.notifications__Lessons__Block}>
                <Notifications />
                <Lessons />
            </div>
            <div className={styles.certificates__Chat__Block}>
                <CertificatesBlock />
                <ChatBlock setActiveContentCategory = {setActiveContentCategory} setActiveChatIdMsgBlock = {setActiveChatIdMsgBlock}/>
            </div>
        </div>
    </section>

}

export default MainDivision