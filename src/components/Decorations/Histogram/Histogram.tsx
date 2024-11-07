import { FC, HTMLAttributes } from 'react'
import styles from './Histogram.module.css'
import { motion } from 'framer-motion'


interface IHistogram extends HTMLAttributes<HTMLDivElement> {
    data: {
        nameScale: string,
        valueScale: number
    }[];
    title: string;
    addStyles: string;
    unitsOfMeasurement: string;
    animateDelay: number;
}

const Histogram: FC<IHistogram> = ({ data, title, addStyles, unitsOfMeasurement, animateDelay }) => {

    const valuesBar: string[] = [];
    const maxScrollValue: number = Math.max(...(data.map(element => element.valueScale)));
    const divisionScroll: number = Math.round(maxScrollValue / 5);

    for (let i = 0; i < 5; ++i) {
        valuesBar.push(`${divisionScroll * (5 - i)}${unitsOfMeasurement}`);
    }

    return (
        <div className={`${styles.wrapper} ${addStyles}`}  >
            <div className={styles.scale_block}>
                {valuesBar.map(
                    (value, i) => <motion.div
                    key={`graph-number-${i}`}
                    initial={{ opacity: 0, textShadow: '0px 0px 4px rgba(255, 255, 255, 0)' }}
                    animate={{ opacity: 1, textShadow: `0px 0px 4px rgba(255, 255, 255, ${1 - 0.17 * i})` }}
                    transition={{ delay: 0.5 + 0.1 * (5 - i) + animateDelay, duration: 0.3 * (5 - i) }}
                >
                    {value}
                    <div />
                </motion.div>)}
            </div>
            <div className={styles.main_panel}>
                <div className={styles.histogramm}>
                    {data.map(
                        (skalleData) => <motion.div
                        key={`skalle-data-${skalleData.nameScale}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${skalleData.valueScale / (maxScrollValue * 1.2) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + animateDelay }}
                            className={styles.skale}
                        >
                            <div>
                                {skalleData.nameScale}
                            </div>
                        </motion.div>)}
                </div>

                <div className={styles.statsSignature}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default Histogram