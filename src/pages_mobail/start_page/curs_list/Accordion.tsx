import { FC, RefObject } from 'react'
import { ICourse } from './CourseCard'
import styles from './Accordion.module.css'
import { motion } from 'framer-motion';
import AccordionPoint from './AccordionPoint';
import StatsBlock from './StatsBlock';
import { ddata } from './CursData';
import ProgramDivision from './ProgramDivision';
import ResultDivision from './ResultDivision';


interface IAccordion {
    data: ICourse,
    modalRef: RefObject<HTMLDivElement>
}


const makeSkillDivision = (
    dataSkill: {
        title: string;
        body: string;
    },
    index: number
) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: '0%' }}
            transition={{ delay: 0.3 * index, duration: 0.6 }}
            className={styles.skillSection}
            key={`skill-${dataSkill.title}`}
        >
            <div className={styles.skillTitleRow}>
                <div className={styles.skillNumber}>
                    {index + 1}
                </div>
                <div className={styles.skillTitle}>
                    {dataSkill.title}
                </div>
            </div>
            <div className={styles.skillBody}>
                {dataSkill.body}
            </div>
        </motion.div>
    )
}

const makeCandidateDivision = (
    candidate: {
        title: string;
        body: string;
        logo: string;
    },
    index: number
) => {
    return (
        <div className={styles.candidateRow} key={`candidate-${candidate.title}`}>
            <motion.img
                src={`img/courses_data/${candidate.logo}.png`}
                alt={`candidate-${candidate.logo}`}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 * index }}
            />
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 * index }}
            >
                <div>
                    {candidate.title}
                </div>
                <div>
                    {candidate.body}
                </div>
            </motion.div>
        </div>
    )
}


const Accordion: FC<IAccordion> = ({ data, modalRef }) => {

    const skillDivision = ddata.newSkills.map(
        (dataSkill, index) => makeSkillDivision(dataSkill, index))

    const candidateContent = ddata.candidateData.map(
        (candidate, index) => makeCandidateDivision(candidate, index)
    )
    const generalDivision = <div className={styles.general}>
        {ddata.generalInformation}
    </div>

    const candidatDivision = <div className={styles.skillSection}>
        {candidateContent}
    </div>

    const prospectsDivision = <StatsBlock data={ddata.prospects} />

    const programDivision = <ProgramDivision programPoint={ddata.programDara} />

    const resultDivision = <ResultDivision data={ddata.resultData}/>

    const dataContent = [
        {
            title: 'Общая информация',
            content: generalDivision,
        },
        {
            title: 'Кому подойдет курс',
            content: candidatDivision,
        },
        {
            title: 'Перспективы обучения',
            content: prospectsDivision,
        },
        {
            title: 'Чему вы научитесь',
            content: skillDivision,
        },
        {
            title: 'Программа курса',
            content: programDivision,
        }, 
        {
            title: 'Итог обучения',
            content: resultDivision,
        },
    ]

    const AccordionContent = dataContent.map((division, index) =>
        <AccordionPoint
            title={division.title}
            modalRef={modalRef}
            key={`accordion-point-${index}`}
        >
            {division.content}
        </AccordionPoint>
    )

    return (
        <div className={styles.wrapper} >

            {AccordionContent}

            <button className={styles.change_life}>
                Начать обучение
            </button>
        </div>
    )
}

export default Accordion