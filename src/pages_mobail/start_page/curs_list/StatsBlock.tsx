import { FC, CSSProperties } from 'react'
import styles from './StatsBlock.module.css'
import { prospectsType } from './CursData';
import Histogram from '../../../components/Decorations/Histogram/Histogram'
import { motion } from 'framer-motion';

type SalaryData = {
    data: {
        nameScale: string,
        valueScale: number
    }[];
    title: string;
};

type LabelData = {
    title: string;
    borderText: string;
    body: string;
    width: number;
}

type StatsData = {
    dataStats: LabelData[];
    marginLeft: number;
    between: number;
}

type DivisionData = {
    type: prospectsType;
    content: SalaryData | StatsData;
}

const makeLabel = (
    labelData: LabelData,
    indexColumn: number,
    indexRow: number
) => {
    return (
        <motion.div
            className={styles.label}
            style={{ width: `${labelData.width}vw` }}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: '0%' }}
            transition={{ duration: 1, delay: 1.5 + indexRow * 0.5 + indexColumn }}
            key={`label-${labelData.title}`}
        >
            <div className={styles.label_title}>
                {labelData.title}
            </div>
            <div
                className={styles.label_border}

            >
                {labelData.borderText.toUpperCase()}
            </div>
            <div className={styles.label_body}>
                {labelData.body}
            </div>
        </motion.div>
    )
}

const makeRowLabel = (
    rowData: LabelData[],
    indexColumn: number,
    options: StatsData
) => {
    return (
        <div
            key={`label-column-${indexColumn}`}
            className={styles.stats_row} style={
                {
                    '--between': `${options.between}vw`,
                    '--indent': `${options.marginLeft}vw`
                } as CSSProperties
            }>
            {rowData.map(
                (elementLabel, indexRow) => makeLabel(elementLabel, indexColumn, indexRow)
            )
            }
        </div>)
}

const makeLastLabel = (lastItem: LabelData, indexColumn: number) => {
    return (<div className={styles.solo_label}>
        {makeLabel(lastItem, 1, indexColumn)}
    </div>
    )
}

const makeContent = (sectionData: DivisionData, index: number) => {
    if (sectionData.type === prospectsType.Salary)
        return (
            <Histogram
                key={`section-${index}`}
                data={(sectionData.content as SalaryData).data}
                title={(sectionData.content as SalaryData).title as string}
                addStyles={styles.sallaryBlock}
                unitsOfMeasurement='$'
                animateDelay={0.6}
            />
        )
    if (sectionData.type === prospectsType.Stats) {

        let row = []
        const rowSetData = []
        const options = sectionData.content as StatsData
        const content = options.dataStats;
        for (let labelKey in content) {
            row.push(content[Number(labelKey)])
            if (!(row.length % 2)) {
                rowSetData.push(row.slice());
                row = [];
            }
        }
        const lastItem = row.length ? row[0] : null;
        const rowSet = rowSetData.map(
            (rowData, indexColumn) => makeRowLabel(rowData, indexColumn, options)
        )

        return <div className={styles.stats_wrapper} key={`section-${index}`}>
            {rowSet}
            {lastItem && makeLastLabel(lastItem, rowSetData.length + 1)}
        </div>
    }
}

const StatsBlock: FC<{ data: DivisionData[] }> = ({ data }) => {
    const content = data.map((section, index) => makeContent(section, index))
    return (
        <div className={styles.wrapper}>
            {content}
        </div>
    )
}

export default StatsBlock