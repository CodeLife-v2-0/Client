import {FC, Dispatch, SetStateAction, MouseEvent} from 'react';
import styles from './MainDivision.module.css'

interface IProgressBlockNotActive{
    setProgressActive: Dispatch<SetStateAction<boolean>>;
}

const ProgressBlockNotActive: FC<IProgressBlockNotActive> = ({setProgressActive}) => {

    const openProgress = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setProgressActive(true);
    }
    return (
        <div className={styles.progress__block__not__active__wrapper}>
            <img
                style = {{objectFit: 'none'}}
                className={`${styles.widdget__img} ${styles.progress__not__active__wrapper}`}
                alt='prgogress-block-background'
                src='img/widdget_forms/progress.png'
            />
            <div className={styles.progress__block__not__active__title}>
                Прогресс за месяц
            </div>
            <div className={styles.progress__block__not__active__button} onClick={openProgress}>
                <div className={styles.progress__block__not__active__button__arrow}/>
                <div className={styles.progress__block__not__active__button__text}>Посмотреть</div>
                <div className={styles.progress__block__not__active__button__arrow}/>
            </div>
        </div>
    )
}

export default ProgressBlockNotActive;