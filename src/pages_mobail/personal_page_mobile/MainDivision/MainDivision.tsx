import { FC, useState, useContext, MouseEvent } from 'react';
import styles from './MainDivision.module.css'
import ProgressBlock from './ProgressBlock';
import LessonsBlock from './LessonsBlock';
import ProjectsBlock from './ProjectsBlock';
import ProjectsBlock2 from './ProjectsBlock2';
import NotificationBlock from './NotificationBlock';
import RecordsBlock from './RecordsBlock';
import RecordsBlock2 from './RecordsBlock2';
import MessengerBlock from './MessengerBlock';
import MessengerBlock2 from './MessengerBlock2';
import MessengerBlock3 from './MessengerBlock3';
import MsgMenu from './MsgMenu';
import { mainDivisionData } from '../../../localizationData';
import { Context } from '../../..';
import ProgressBlockNotActive from './ProgressBlockNotActive';

const MainDivision: FC = () => {

    const [project, setProject] = useState(false);
    const [record, setRecord] = useState(false);
    const [messege, setMessege] = useState(0);
    const [progressActive, setProgressActive] = useState(false);
    const { store } = useContext(Context)

    const recordsBlock = [
        <RecordsBlock />,
        <RecordsBlock2 />
    ]
    const projectsBlock = [
        <ProjectsBlock />,
        <ProjectsBlock2 />
    ]
    const messengerBlock = [
        <MessengerBlock />,
        <MessengerBlock2 />,
        <MessengerBlock3 />

    ]

    const changeViewProject = (setupState: boolean, e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (setupState !== project)
            setProject(!project)
    }
    const changeViewRecords = (setupState: boolean, e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (setupState !== record)
            setRecord(!record)
    }

    return (
        <section className={styles.wrapper}>
            {progressActive
                ? <ProgressBlock />
                : <ProgressBlockNotActive setProgressActive={setProgressActive} />}
            <div className={styles.lessons__block}>
                <div className={styles.widdget__content}>
                    <div className={styles.widdget__lesons__title}>
                        {mainDivisionData.nearLes[store.isEng]}
                    </div>
                    <div className={styles.les__wrapper}>
                        <LessonsBlock />
                    </div>
                </div>
            </div>
            <div className={styles.projects__block}>
                <div className={styles.widdget__content}>
                    <div className={styles.widdget__projects__title}>
                        <div
                            className={styles.title__variant1}
                            style={{ backgroundColor: project ? 'gray' : 'black' }}
                            onClick={(e) => { changeViewProject(false, e) }}
                        >
                            {mainDivisionData.projectsTitle[0][store.isEng]}
                        </div>
                        <div
                            className={styles.title__variant2}
                            style={{ backgroundColor: project ? 'black' : 'gray' }}
                            onClick={(e) => { changeViewProject(true, e) }}
                        >
                            {mainDivisionData.projectsTitle[1][store.isEng]}
                        </div>
                    </div>
                    <div className={styles.les__wrapper}>
                        {projectsBlock[Number(project)]}
                    </div>

                </div>
            </div>
            <div className={styles.notification__block}>
                <div className={styles.widdget__content}>
                    <div className={styles.notification__title}>
                        {mainDivisionData.ntfTitle[store.isEng]}
                    </div>
                    <div className={styles.notification__body}>
                        <NotificationBlock />
                    </div>
                </div>
            </div>
            <div className={styles.records__block}>
                <div className={styles.widdget__content}>
                    <div className={styles.records__title}>
                        <div
                            className={styles.title__variant1}
                            onClick={(e) => { changeViewRecords(false, e) }}
                            style={{ backgroundColor: record ? 'gray' : 'black' }}
                        >{mainDivisionData.recordsTitle[0][store.isEng]}</div>
                        <div
                            className={styles.title__variant2}
                            onClick={(e) => { changeViewRecords(true, e) }}
                            style={{ backgroundColor: record ? 'black' : 'gray' }}
                        >{mainDivisionData.recordsTitle[1][store.isEng]}</div>
                    </div>
                    <div className={styles.records__content}>
                        {recordsBlock[Number(record)]}
                    </div>
                </div>
            </div>
            <div className={styles.messenger__block}>
                <div className={styles.widdget__content}>
                    <MsgMenu setMessege={setMessege} />
                    <div className={styles.chat__content}>
                        {messengerBlock[messege]}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainDivision;