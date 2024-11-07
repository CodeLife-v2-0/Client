import React, { FC, Dispatch, SetStateAction, useContext, useState, ChangeEvent } from 'react';
import styles from './SelectTimeLoop.module.css';
import { timeTablelocalization } from './../../../../localizationData';
import { Context } from '../../../..';

const buttonsName = [
    'Неделю',
    'Месяц',
    'Нельсолько недель',
    'Несколько дней',
]

interface ISelectTimeLoop {
    setActivePoint: Dispatch<SetStateAction<number>>,
    chousenDates: string[],
    setAddMountAtLoop: Dispatch<SetStateAction<number>>,
    addMountAtLoop: number,
}

const SelectTimeLoop: FC<ISelectTimeLoop> = ({ setActivePoint, chousenDates, setAddMountAtLoop, addMountAtLoop }) => {

    const { store } = useContext(Context);
    const [inputValue, setInputValue] = useState<string>('');

    const getNiceDateName = (dateStr: string) => {
        const dateArr = dateStr.split('.').reverse();
        const date = new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2]));
        const monthNamesRod = store.isEng == 0
            ? timeTablelocalization.mouthName[store.isEng].map(item => {
                item == 'март' || item == 'август'
                    ? item = item + 'a'
                    : item = item.slice(0, item.length - 1) + 'я';
                return item
            })
            : timeTablelocalization.mouthName[store.isEng];
        const dayName = date.getDay() == 0
            ? timeTablelocalization.titleColumnData[store.isEng][6]
            : timeTablelocalization.titleColumnData[store.isEng][date.getDay() - 1]
        return ' ' + date.getDate() + ' ' + monthNamesRod[date.getMonth()]
            + ' (' + dayName + ') ';
    }

    chousenDates.sort((dateA, dateB) => {
        return new Date(Number(dateA.split('.')[2]), Number(dateA.split('.')[1]), Number(dateA.split('.')[0])).getTime() -
            new Date(Number(dateB.split('.')[2]), Number(dateB.split('.')[1]), Number(dateB.split('.')[0])).getTime()
    });

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <div className={styles.SelectTimeLoopWrapper}>
            <div className={styles.SelectTimeLoopText}>
                Уроки по Props.lesson, первые занятия по которым пройдут
                {getNiceDateName(chousenDates[0])} {chousenDates.length > 1 ? `и ${getNiceDateName(chousenDates[1])}` : ''} будут проходить каждую(-ые):
            </div>
            <div className={styles.SelectTimeLoopButtons}>
                <div className={styles.SelectTimeLoopButtonsRow}>
                    <div className={styles.SelectTimeLoopButtonsCell}
                        onClick={() => { setAddMountAtLoop(7); setActivePoint(3) }}>Неделю</div>
                    <div className={styles.SelectTimeLoopButtonsCell}
                        onClick={() => { setAddMountAtLoop(28); setActivePoint(3) }}>Месяц</div>
                </div>
                <div className={styles.SelectTimeLoopButtonsRow}>
                    {(addMountAtLoop == 0 || addMountAtLoop == -2) && <div className={styles.SelectTimeLoopButtonsCell}
                        onClick={() => { setAddMountAtLoop(-1) }}>Несколько недель</div>}
                    {addMountAtLoop == -1 &&
                        <div className={styles.SelectTimeLoopButtonsCellInput}>
                            <div className={styles.SelectTimeLoopButtonsCellInputText}>Введите количество недель</div>
                            <div className={styles.SelectTimeLoopButtonsCellInputContent}>
                                <input type='number' className={styles.SelectTimeLoopButtonsCellInputValue}
                                    value={inputValue} onChange={inputChange}></input>
                                <div className={styles.SelectTimeLoopButtonsCellInputContentButton}
                                    onClick={() => {setActivePoint(3); setAddMountAtLoop(Number(inputValue) * 7)}}>OK</div>
                            </div>
                        </div>}
                    {(addMountAtLoop == 0 || addMountAtLoop == -1) && <div className={styles.SelectTimeLoopButtonsCell}
                        onClick={() => { setAddMountAtLoop(-2) }}>Несколько дней</div>}
                    {addMountAtLoop == -2 &&
                        <div className={styles.SelectTimeLoopButtonsCellInput}>
                            <div className={styles.SelectTimeLoopButtonsCellInputText}>Введите количество дней</div>
                            <div className={styles.SelectTimeLoopButtonsCellInputContent}>
                                <input type='number' className={styles.SelectTimeLoopButtonsCellInputValue}
                                    value={inputValue} onChange={inputChange}></input>
                                <div className={styles.SelectTimeLoopButtonsCellInputContentButton}
                                    onClick={() => {setActivePoint(3); setAddMountAtLoop(Number(inputValue))}}>OK</div>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default SelectTimeLoop