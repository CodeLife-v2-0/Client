import { FC, useState, Dispatch, SetStateAction } from 'react'
import MainDivision from './MainDivision/MainDivision';
import TimetableDivision from './TimetableDivision/TimetableDivision';
import MyCoursesDivision from './MyCoursesDivision/MyCoursesDivision';
import SettingsDivision from './SettingsDivision/SettingsDivision';
import CourseCatalogDivision from './CourseCatalogDivision/CourseCatalogDivision';
import ProjectsDivision from './ProjectsDivision/ProjectsDivision';
import CodeReviewDivision from './CodeReviewDivision/CodeReviewDivision';
import LessonRecordingsDivision from './LessonRecordingsDivision/LessonRecordingsDivision';
import MessengerDivision from './MessengerDivision/MessengerDivision';
import BonusesDivision from './BonusesDivision/BonusesDivision';
import CertificatesDivision from './CertificatesDivision/CertificatesDivision';
import Activities from './Admin/Activities/Activities';



interface IMainContent {
    activeContentCategory: number;
    setActiveContentCategory: Dispatch<SetStateAction<number>>
}

const MainContent: FC<IMainContent> = ({
    activeContentCategory,
    setActiveContentCategory
}) => {
    const activeChatIdMsgBlock = useState<string>('');
    const allContent = [
        <MainDivision setActiveContentCategory = {setActiveContentCategory} setActiveChatIdMsgBlock = {activeChatIdMsgBlock[1]}/>,
        <TimetableDivision />,
        <MyCoursesDivision />,
        <ProjectsDivision />,
        <CodeReviewDivision />,
        <LessonRecordingsDivision />,
        <MessengerDivision activeChatIdState = {activeChatIdMsgBlock}/>,
        <CourseCatalogDivision />,
        <BonusesDivision />,
        <CertificatesDivision />,
        <SettingsDivision />,
        <Activities/>
    ]
    return (
        <div style={{ width: '86vw' }}>
            {allContent[activeContentCategory]}
        </div>
    )
}

export default MainContent