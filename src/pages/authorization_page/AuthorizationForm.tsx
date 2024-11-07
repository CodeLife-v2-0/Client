import { FC, useContext, useState, Dispatch, SetStateAction, memo } from 'react'
import styles from './style.module.css';
import DesignButton from '../../components/UI/Buttons/ButtonA/AuthButton';
import LoginInput from '../../components/UI/Inputs/LoginInput';
import StandartedCheckbox from '../../components/UI/Checkboxes/StandartedCheckbox';
import UnderlinedLink from '../../components/UI/UnderlinedLink/UnderlinedLink';
import { Context } from '../..';
import Notification from '../../components/UI/Notification/Notification';
import { authorizationPage } from '../../localizationData';
import { observer } from 'mobx-react-lite';

interface IAuthorizationForm {
    switchFunc: () => void;
    sAuth: () => void;
    displayValue: number;
    errorItem: [string, Dispatch<SetStateAction<string>>];
}

const borderShadow = [
    '0 0 10px #b23aee',
    '0 0 10px #c84253'
]

const AuthorizationForm: FC<IAuthorizationForm> = ({ switchFunc, sAuth, displayValue, errorItem }) => {
    const { store } = useContext(Context);
    const emailState = useState('');
    const passwordState = useState('');
    const loginError = useState(false);
    const passwordError = useState(false);


    const loginFunc = () => {
        store.login(emailState[0], passwordState[0], sAuth);
    }

    const data = [
        [emailState[0], loginError[1]],
        [passwordState[0], passwordError[1]]
    ] as [string, Dispatch<SetStateAction<boolean>>][]


    return (
        <form>
            {errorItem[0]&&<Notification
                    title={authorizationPage.loginEr[store.isEng]}
                    message={errorItem[0]}
                    deltaX='-9vw'
                    deltaY='4vh'
                    setStateNtf={errorItem[1]}
                />}
            <LoginInput
                inputType={'login'}
                contentState={emailState}
                displayValue={displayValue}
                wrapperStyle={{boxShadow: borderShadow[Number(loginError[0])]}}
                placeholderError={loginError[0] ? (authorizationPage.authorizationEmailEr[store.isEng]) : ''}
            />
            <LoginInput
                inputType={'password'}
                contentState={passwordState}
                displayValue={displayValue}
                wrapperStyle={{boxShadow: borderShadow[Number(loginError[0])]}}
                placeholderError={loginError[0] ? (authorizationPage.authorizationPassEr[store.isEng]) : ''}
            />
            <div className={styles.additional_option}>
                <StandartedCheckbox className={styles.forgot_me}>
                    {authorizationPage.rememberMe[store.isEng]}
                </StandartedCheckbox>
                <UnderlinedLink lineColor={'#b23aee'}>{authorizationPage.forgotPassword[store.isEng]}</UnderlinedLink>
            </div>
            <div className={styles.buttons_container}>
                <DesignButton serverFunc={loginFunc} switchFunc={sAuth} checkStates={data}>
                    {authorizationPage.login[store.isEng]}
                </DesignButton>
                <DesignButton switchFunc={switchFunc}>
                    {authorizationPage.registration[store.isEng]}
                </DesignButton>
            </div>
        </form>
    )
}
export default observer(AuthorizationForm);