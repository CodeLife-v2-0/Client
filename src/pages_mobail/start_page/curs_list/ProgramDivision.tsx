import { FC } from 'react'
import styles from './Accordion.module.css'
import ProgramRow from './ProgramRow';

type programStructure = {
    [str: string]: string[];
};


const ProgramDivision: FC<{ programPoint: programStructure }> = ({ programPoint }) => {
    const content = [];
    for (let title in programPoint) {
        const subPoints = []
        for (let numberSubpoints of programPoint[title]) {
            subPoints.push(
                <div className={styles.subPoint} key={`point-${title}-subpont-${subPoints.length}`}>
                    {numberSubpoints}
                </div>
            )
        }
        content.push(
            <ProgramRow counter={content.length + 1} title={title} subPoints={subPoints}  key={`subpoint-${title}`}/>
        )
    }
    return <div className={styles.programSection}>
        {content}
    </div>
}

export default ProgramDivision