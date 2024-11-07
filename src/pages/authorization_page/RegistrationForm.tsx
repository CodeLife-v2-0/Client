import { FC, useContext, useState, Dispatch, SetStateAction, useEffect, memo } from 'react'
import styles from './style.module.css';
import DesignButton from '../../components/UI/Buttons/ButtonA/AuthButton';
import LoginInput from '../../components/UI/Inputs/LoginInput';
import { Context } from '../..';
import Notification from '../../components/UI/Notification/Notification';
import { authorizationPage } from '../../localizationData';
import { observer } from 'mobx-react-lite';

interface IRegistrationForm {
    switchFunc: () => void;
    sAuth: () => void;
    displayValue: number;
    errorItem: [string, Dispatch<SetStateAction<string>>];
}

const borderShadow = [
    '0 0 10px #b23aee',
    '0 0 10px #c84253'
]

const RegistrationForm: FC<IRegistrationForm> = ({ switchFunc, sAuth, displayValue, errorItem }) => {
    const { store } = useContext(Context);
    
    const emailState = useState('');
    const passwordState = useState('');
    const nameState = useState('');
    const surNameState = useState('');
    const repeatPasState = useState('');

    const emailError = useState(false);
    const passwordError = useState(false);
    const nameError = useState(false);
    const surNameError = useState(false);
    const repeatPasError = useState('');

    const validatePassword = (password: string) => {
        if (password.length < 5) {
            return authorizationPage.regPasErLen[store.isEng];
        }

        if (!/[a-z]/.test(password)) {
            return authorizationPage.regPasErLow[store.isEng];   
        }

        if (!/[A-Z]/.test(password)) {
            return authorizationPage.regPasErUp[store.isEng];
        }

        if (!/\d/.test(password)) {
            return authorizationPage.regPasErNum[store.isEng];
        }

        if (!/[@$!%*?&]/.test(password)) {
            return authorizationPage.regPasErSc[store.isEng];
        }

        return authorizationPage.regPasNoEr[store.isEng];
    }


    const registrationFunc = () => {
        store.registration(emailState[0], passwordState[0], nameState[0], surNameState[0], sAuth);
    }

    const data = [
        [emailState[0], emailError[1]],
        [passwordState[0], passwordError[1]],
        [nameState[0], nameError[1]],
        [surNameState[0], surNameError[1]],
        [repeatPasState[0], repeatPasError[1]]
    ] as [string, Dispatch<SetStateAction<boolean>>][];

    console.log(borderShadow[Number(passwordError)]);
    return (
        <form>
            {errorItem[0]&&<Notification
                    title={authorizationPage.regEr[store.isEng]}
                    message={errorItem[0]}
                    deltaX='-29vw'
                    deltaY='5vh'
                    setStateNtf={errorItem[1]}
                />}
            {displayValue < 2 ? <div className={styles.inputBlock}>
                <LoginInput
                    inputType={'name'}
                    wrapperStyle={{ width: '47%', boxShadow: borderShadow[Number(nameError[0])]}}
                    displayValue={displayValue}
                    logoBlockStyle={{ width: '40%' }}
                    contentState={nameState}
                    placeholderError={nameError[0] ? authorizationPage.inputName[store.isEng] : ''}
                />
                <LoginInput
                    inputType={'surname'}
                    wrapperStyle={{ width: '50%', boxShadow: borderShadow[Number(surNameError[0])]}}
                    displayValue={displayValue}
                    logoBlockStyle={{ width: '37%' }}
                    contentState={surNameState}
                    placeholderError={nameError[0] ? authorizationPage.inputSurname[store.isEng] : ''}
                />
            </div>
                : <>
                    <LoginInput
                        inputType={'name'}
                        displayValue={displayValue}
                        wrapperStyle={{ width: '100%' }}
                        logoBlockStyle={{ width: '15%' }}
                        contentState={nameState}
                    />
                    <LoginInput
                        inputType={'surname'}
                        displayValue={displayValue}
                        wrapperStyle={{ width: '100%' }}
                        logoBlockStyle={{ width: '15%' }}
                        contentState={surNameState}
                    /></>}
            <LoginInput
                inputType={'email'}
                contentState={emailState}
                displayValue={displayValue}
                wrapperStyle={{boxShadow:borderShadow[Number(emailError[0])]}}
                placeholderError={emailError[0] ? authorizationPage.regMailEr[store.isEng] : ''} />
            <LoginInput
                inputType={'password'}
                contentState={passwordState}
                displayValue={displayValue}
                wrapperStyle={{boxShadow:borderShadow[Number(passwordError[0])]}}
                placeholderError={passwordError[0] ? validatePassword(passwordState[0]) : ''} />
            <LoginInput
                inputType={'repeat_password'}
                contentState={repeatPasState}
                displayValue={displayValue}
                wrapperStyle={{boxShadow:borderShadow[Number(repeatPasError[0])]}}
                placeholderError={repeatPasError[0] ? authorizationPage.regRepPasEr[store.isEng] : ''} />
            <div className={styles.buttons_container}>
                <DesignButton switchFunc={sAuth} serverFunc={registrationFunc} checkStates={data}>
                    {authorizationPage.regCreate[store.isEng]}
                </DesignButton>
                <DesignButton switchFunc={switchFunc}>
                {authorizationPage.regAuth[store.isEng]}
                </DesignButton>
            </div>
        </form>
    )
}

export default observer(RegistrationForm);