import { FC, CSSProperties, useContext, useEffect, useRef } from 'react'
import styles from './MainDivision.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../..'
import { mainDivisionData } from '../../../localizationData'

const stats = [94, 27, 0, 48];
const { progress_block } = mainDivisionData;

const circlesStatsBlock = [
    { title: progress_block.attendance, value: stats[0], color: '#009AAD' },
    { title: progress_block.works, value: stats[1], color: '#55BCC8' },
    { title: progress_block.deadlines, value: stats[2], color: '#AADEE3' },
    { title: progress_block.evaluations, value: stats[3], color: '#FFFFFF' },
];

const ProgressBlock: FC = () => {

    const { store } = useContext(Context);
    const progressBlockRef = useRef<HTMLDivElement | null>(null);
    const progressContent = useRef<HTMLDivElement | null>(null);
    const circlesStatsBlockContent = circlesStatsBlock.map(
        (characteristic, index) => (
            <div className={styles.circles_stats_wrapper}>
                <div
                    className={styles.circles_stats_element}
                    style={{
                        '--select-color': characteristic.color,
                    } as CSSProperties}
                    key={`progress-cirles-${characteristic.title[1]}`}
                >
                    {characteristic.value}
                    {!index && '%'}
                </div>
                <span
                    className={styles.progress__stats_signature}
                    style={{
                        '--select-color': characteristic.color,
                    } as CSSProperties}
                    key={`progress-cirles-signatures-${characteristic.title[1]}`}
                >
                    {characteristic.title[store.isEng]}
                </span>
            </div>
        )
    );

    useEffect(() => {
        setTimeout(() => {
            if (progressBlockRef.current){
                progressBlockRef.current.style.height = '120vh';
            }
        }, 10)
        setTimeout(() => {
            if (progressContent.current){
                progressContent.current.style.opacity = '1';
            }
        }, 200)
    })

    return (
        <div className={styles.progress__block} ref={progressBlockRef}>
            <img
                style = {{objectFit: 'cover'}}
                className={`${styles.widdget__img} ${styles.progress__wrapper}`}
                alt='prgogress-block-background'
                src='img/widdget_forms/progress.png'
            />
            <div className={styles.widdget__content}>
                <span className={styles.progress__block__title}>
                    {progress_block.progressBlock[0][store.isEng]}
                </span>
                <div className={styles.progress__circles_stats_block} ref={progressContent}>
                    {circlesStatsBlockContent}
                </div>
                <span className={styles.progress__result_progress}>
                    {progress_block.progressBlock[1][store.isEng]}
                </span>
            </div>
        </div>
    )
}

export default observer(ProgressBlock)