import { useState, FC, Dispatch, SetStateAction, useContext} from 'react';
import styles from './Finder.module.css';
import InputPlaceholder from '../../../../../../components/UI/Inputs/InputPlaceholder';
import { startPage } from '../../../../../../localizationData';
import { Context } from '../../../../../..';


interface IFinder{
    requestState: [string, Dispatch<SetStateAction<string>>];
    totalResult: number;
}

const Finder: FC<IFinder> = ({ requestState, totalResult }) => {
    const [flashAnimation, setFlashAnimation] = useState(false);
    const {store} = useContext(Context);
    const [finderResult, setFinderResult] = useState('');
    const [fontPlaceholder, setFontPlaceholder] = useState(1.35);
    const handleClick = () => {
        setFlashAnimation(true);
        setTimeout(() => {
            setFlashAnimation(false);
        }, 700);
        let word_ending;
        let total_frase;
        if (!requestState[0]) {
            if (store.isEng === 0) total_frase='Вы ввели пустой запрос :(';
            else total_frase='You entered an empty query :(';
        } else if (store.isEng === 0) {
            if (totalResult % 10 === 0 || 10 < totalResult && totalResult < 20 || totalResult % 10 > 4) {
                word_ending = 'ов';
            } else if (totalResult % 10 === 1) {
                word_ending = '';
            } else {
                word_ending = 'а';
            }
            total_frase = `Запрос: «${requestState[0]}» дал ${totalResult} результат${word_ending}`
        } else {
            word_ending = (totalResult % 10 === 1 && totalResult % 100 !== 11) ? '' : 's';
            total_frase = `Query «${requestState[0]}» returned ${totalResult} result${word_ending}.`
        }
        setFinderResult(total_frase);
        setFontPlaceholder(total_frase.length <= 29 ? 1.35 : 39.15 / total_frase.length);

    };
    return (
        <div className={styles.wrapper}>
            <InputPlaceholder
                inputType="text"
                wrapperStyleClass={styles.input}
                placeholderText={startPage.searching[store.isEng]}
                textState={requestState}
                extraPlaceholder={[finderResult, setFinderResult]}
                fontSizePlaceholder={fontPlaceholder + 'vw'}
            />
            <img
                className={`${styles.searchIcon} ${flashAnimation ? styles.flashAnimation : ''}`}
                src='img/start_page/search.png'
                onClick={handleClick}
            />
        </div>
    );
};

export default Finder;
