import { FC, useContext, useEffect, useState } from 'react'
import styles from './MainDivision.module.css'
import { mainDivisionData } from '../../../localizationData'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const projects = [
    { title: 'path_creater', type: 'python', },
    { title: 'matrix', type: 'js', },
    { title: 'index', type: 'html', },
    { title: 'root_finder', type: 'python', },
    { title: 'project_1', type: 'ruby', },
]

type Projects = { title: string, type: string }

const ProjectsBlock:FC = () => {

    const { store } = useContext(Context);
    const [projectsData, setProjectsData] = useState<Projects[][]>([]);

    useEffect(() => {
        let projectRow = [];
        const array100024 = [];
        for (let project of projects) {
            projectRow.push(project);
            if (!(projectRow.length % 3)) {
                array100024.push([...projectRow])
                projectRow = [];
            }
        }
        if (projectRow.length) {
            array100024.push([...projectRow]);
        }
        setProjectsData(array100024);
    }, [store.isEng, mainDivisionData.lesFordb])

    const projetcContent = (projectsData.length !== 0) && projectsData.map(
        projectRow => <div className={styles.proj__row}>
            {projectRow.map(
                project => <div className={styles.proj}>
                    <img className={styles.proj__logo}
                        src={`img/file_logo/${project.type}.png`}
                        alt={`project-file-${project.title}`}
                    />
                    <span style={{ paddingTop: "5%" }}>
                        {project.title}
                    </span>
                </div>
            )}
        </div>
    )

    return (
        <>{projetcContent}</>
    )
}

export default observer(ProjectsBlock)