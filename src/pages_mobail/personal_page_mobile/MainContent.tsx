import { FC, useState } from "react";
import MainDivision from "./MainDivision/MainDivision";


interface IMainContent {
    activeContentCategory: number;
}

const MainContent: FC<IMainContent> = ({
    activeContentCategory
}) => {
    const redreshAccessTimer = useState(0);
    const allContent = [
        <MainDivision />,
        /*<TimetableDivision />,
        <MyCoursesDivision />,
        <ProjectsDivision />,
        <CodeReviewDivision />,
        <LessonRecordingsDivision />,
        <MessengerDivision />,
        <CourseCatalogDivision />,
        <BonusesDivision />,
        <CertificatesDivision />,
        <SettingsDivision />,
        <Activities redreshAccessTimer={redreshAccessTimer}/>*/
    ]
    return (
        <div style={{ width: '100vw' }}>
            {allContent[activeContentCategory]}
        </div>
    )
}

export default MainContent