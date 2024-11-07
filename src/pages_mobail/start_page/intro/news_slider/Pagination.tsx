import { FC, Dispatch, SetStateAction } from 'react'
import styles from './Pagination.module.css'
import { AppearCode } from './NewsSlider';

interface IPagination {
    amountComposition: number;
    activeCompositionID: number;
    setCompositionID: Dispatch<SetStateAction<number>>;
    setInitAnimate: Dispatch<SetStateAction<number>>
}

const Pagination: FC<IPagination> = ({ amountComposition, activeCompositionID, setCompositionID,  setInitAnimate }) => {
    const buttons = [];
    for (let i = 1; i <= amountComposition; i++) {
        buttons.push(
            <button
                key={`mb-intro-pagination-button-${i}`}
                onClick={
                    activeCompositionID
                        ? (e) => {
                            setInitAnimate(AppearCode.Initial);
                            e.preventDefault();
                            setCompositionID(i);
                        } : () => null
                }
                style={{
                    width: 95 / amountComposition + '%',
                    backgroundColor: i === activeCompositionID ? '#C6E2FF' : '#A5A5A5'
                }} />
        );
    }

    return (
        <div className={styles.wrapper}>
            {buttons}
        </div>
    )
}

export default Pagination