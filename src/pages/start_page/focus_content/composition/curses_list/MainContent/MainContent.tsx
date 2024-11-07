import { useState, FC, Dispatch, SetStateAction } from 'react'
import styles from './MainContent.module.css'
import Course from './Course'
import Navigation from './Navigation'

export interface ICourseDataItem{
    title: string[];
    description: string[];
    logo: string;
    discount: number;
    queryField: string;
    popularity: number;
    date: number;
    entity: string;
}

interface IMainContent {
    data: ICourseDataItem[];
    firstTime: [boolean, Dispatch<SetStateAction<boolean>>],
}

const MainContent: FC<IMainContent> = ({
    data,
    firstTime,
}) => {

    const [namberCursesList, setNamberCursesList] = useState(1);

    const additionalStyleWrapper = {
        justifyContent: 'left',
    }

    const additionalStyleCourse = {
        marginBottom: '5vh',
    }

    const contentSlise = data.length > 4 ? data.slice((namberCursesList - 1) * 4, namberCursesList * 4) : data


    const content = contentSlise.map((course, index) => {
        return <Course
            key={`course-item-${index}`}
            data={course}
            additionalStyle={contentSlise.length < 4 ? additionalStyleCourse : {}}
            firstTime={firstTime}
        />
    })


    return (
        <div className={styles.wrapper} style={contentSlise.length < 4 ? additionalStyleWrapper : {}}>
            {content}
            {data.length > 4 && <Navigation
                totalPages={Math.ceil(data.length / 4)}
                activePage={namberCursesList}
                setNewNamber={setNamberCursesList}
            />}
        </div>
    )
}

export default MainContent