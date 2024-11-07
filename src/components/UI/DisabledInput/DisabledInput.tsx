import { FC, Dispatch, SetStateAction, useEffect, useContext } from 'react'
import styles from './DisabledInput.module.css'
import { ActivitiesData } from '../../../localizationData'
import { FieldDR } from '../../../pages/personal_page/Admin/Activities/Activities';
import { Context } from '../../..';

const { dialogWindowContent, correctInput } = ActivitiesData;

const activeWrapperStyle = {
    cursor: 'text',
    borderColor: '#009aad',
}

interface IDisabledInput {
    isActive: boolean,
    inputState: [string, Dispatch<SetStateAction<string>>],
    checkState: Dispatch<SetStateAction<boolean>>,
    setHint: Dispatch<SetStateAction<string>>,
    setTitle: Dispatch<SetStateAction<string>>
}

const DisabledInput: FC<IDisabledInput> = ({
    isActive,
    inputState,
    checkState,
    setHint,
    setTitle
}) => {
    const title = dialogWindowContent[FieldDR.groupName].title;
    const examples = dialogWindowContent[FieldDR.groupName].example;

    const { store } = useContext(Context);
    const [enteredText, setEnteredText] = inputState;
    useEffect(() => {
        checkState(!isActive || enteredText.length > 0);
        setHint(enteredText ? correctInput[store.isEng] : examples[store.isEng]);
        setTitle(title[store.isEng]);
    }, [isActive, enteredText])
    return (
        <input
            type="text"
            className={styles.wrapper}
            style={isActive ? activeWrapperStyle : {}}
            value={isActive ? enteredText : ''}
            disabled={!isActive}
            placeholder='Наименование группы'
            onClick={() => {
                setHint(examples[store.isEng]);
                setTitle(title[store.isEng]);
            }}
            onChange={(e) => {
                if (isActive) setEnteredText(e.target.value)
            }}
        />
    )
}

export default DisabledInput