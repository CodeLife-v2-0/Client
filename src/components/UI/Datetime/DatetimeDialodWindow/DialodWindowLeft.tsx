import React, { FC, Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from './DialodWindowLeft.module.css'

interface IDialodWindowLeft {
    activePoint: number,
    chousePastDate: boolean,
    chousenDates: string[],
    addMountAtLoop: number,
    countLoop: string,
    setActivePoint: Dispatch<SetStateAction<number>>,
    setChousePastDate: Dispatch<SetStateAction<boolean>>,
    setChousenDates: Dispatch<SetStateAction<string[]>>,
    setCountLoop: Dispatch<SetStateAction<string>>,
}

const DialodWindowLeft: FC<IDialodWindowLeft> = ({
    activePoint,
    chousePastDate,
    chousenDates,
    addMountAtLoop,
    countLoop,
    setActivePoint,
    setChousePastDate,
    setChousenDates,
    setCountLoop,
}) => {

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCountLoop(event.target.value);
    }

    const setLoopChousenDates = () => {
        const currentDate = chousenDates;
        const amountLesAtLoop = chousenDates.length;
        for (let oneLoop = 0; oneLoop < Number(countLoop) - 1; oneLoop++){
            for (let oneLes = 0; oneLes < amountLesAtLoop; oneLes++){
                const tempDate = new Date(Number(chousenDates[oneLes].split('.')[2]),
                Number(chousenDates[oneLes].split('.')[1]), Number(chousenDates[oneLes].split('.')[0]) + addMountAtLoop * (oneLoop + 1));
                const datestr = tempDate.getDate() + '.' + tempDate.getMonth() + '.' + tempDate.getFullYear();
                currentDate.push(datestr);
            }
        }
        console.log(currentDate);
        setChousenDates([...currentDate])
    }

    return (
        <div className={styles.DialodWindowLeftWrapper}>
            <div className={styles.DialodWindowLeftHeader}>
                <div className={styles.DialodWindowLeftNumber}>
                    <div className={styles.DialodWindowLeftNumberDigit}>2</div>
                    <div className={styles.DialodWindowLeftNumberStage}>этап</div>
                </div>
                <div className={styles.DialodWindowLeftText}>Переодическая активность</div> {/* В будующем передается пропсом */}
            </div>
            <div className={styles.DialodWindowLeftContent}>
                {chousePastDate && chousenDates.length == 0 ? <div className={styles.DialodWindowLeftContentPoint}
                    style={{ color: `${activePoint == 1 ? 'rgba(48, 50, 51, 1)' : 'rgba(128, 128, 128, 1)'}` }}>
                    Нельзя выбрать прошедший день.
                </div> : chousenDates.length > 0 ?
                    <div className={styles.DialodWindowLeftContentPoint}
                        style={{ color: `${activePoint == 1 ? 'rgba(48, 50, 51, 1)' : 'rgba(128, 128, 128, 1)'}` }}>
                        <div className={styles.DialodWindowLeftContentPointTitle}>
                            <div className={styles.DialodWindowLeftContentPointTitleText}>1. Дни выбраны</div>
                            <div className={styles.DialodWindowLeftContentPointTitleImg}>img</div>
                        </div>
                        {activePoint == 1 && <div className={styles.DialodWindowLeftContentPointTitleButtons}>
                            <div className={styles.DialodWindowLeftContentPointTitleCancel}
                                onClick={() => setChousenDates([])}>Сбросить</div>
                            <div className={styles.DialodWindowLeftContentPointTitleSave}
                                onClick={() => setActivePoint(2)}>Сохранить</div>
                        </div>}
                    </div> :
                    <div className={styles.DialodWindowLeftContentPoint}
                        style={{ color: `${activePoint == 1 ? 'rgba(48, 50, 51, 1)' : 'rgba(128, 128, 128, 1)'}` }}>
                        1. Выберите дни в первый период активности на календаре справа.
                    </div>}
                <div className={styles.DialodWindowLeftContentPoint}
                    style={{ color: `${activePoint == 2 ? 'rgba(48, 50, 51, 1)' : 'rgba(128, 128, 128, 1)'}` }}>
                    2. Укажите длительность цикличного периода.
                </div>
                <div className={styles.DialodWindowLeftContentPoint}
                    style={{ color: `${activePoint == 3 ? 'rgba(48, 50, 51, 1)' : 'rgba(128, 128, 128, 1)'}` }}>
                    3. Укажите количество цикличных периодов в обучение.
                    {activePoint == 3 && <div className={styles.DialodWindowLeftContentPoint3}>
                        <input type='number' className={styles.SelectTimeLoopButtonsCellInputValue}
                            value={countLoop} onChange={inputChange}></input>
                        <div onClick={() => {setLoopChousenDates()}}>ОК</div>
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default DialodWindowLeft