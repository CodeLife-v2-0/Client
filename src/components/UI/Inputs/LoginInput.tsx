import { useState, FC, CSSProperties, Dispatch, SetStateAction, useEffect, memo, useContext, HTMLAttributes } from 'react'
import styles from './LoginInput.module.css'
import InputPlaceholder from './InputPlaceholder'
import { authorizationPage } from '../../../localizationData' 
import { Context } from '../../..';

interface ILoginInput {
    inputType: string;
    wrapperStyle?: CSSProperties;
    logoBlockStyle?: CSSProperties;
    imgStyle?: CSSProperties;
    displayValue: number;
    contentState?: [string, Dispatch<SetStateAction<string>>]
    placeholderError?: string;
    
}

interface IDataInputItem {
    type: string;
    logoSrc: string;
    placeholder: string;
    inputMode: HTMLAttributes<HTMLInputElement>['inputMode'];
}

interface ILoginData {
    [key: string]: IDataInputItem;
    login: IDataInputItem;
    password: IDataInputItem;
    repeat_password: IDataInputItem;
    email: IDataInputItem;
    name: IDataInputItem;
    surname: IDataInputItem;
}

const LoginInput: FC<ILoginInput> = memo(({ inputType, wrapperStyle, logoBlockStyle, imgStyle, contentState, displayValue, placeholderError }) => {
    const timeCase = useState('');

    const [placeholderText, setPlaceholder] = useState( '')
    const [isBlurred, setIsBlurred] = useState(false);
    const {store} = useContext(Context);

    const dataInput: ILoginData = {
        login:           { type: 'text',    logoSrc: 'user', inputMode: 'email', placeholder: placeholderText || authorizationPage.inMain[store.isEng] },
        password:        { type: 'password',logoSrc: 'lock', inputMode: 'text', placeholder: placeholderText || authorizationPage.inPas[store.isEng] },
        repeat_password: { type: 'password',logoSrc: 'lock', inputMode: 'text', placeholder: placeholderText || authorizationPage.inRepPas[store.isEng] },
        email:           { type: 'email',   logoSrc: 'at',   inputMode: 'email', placeholder: placeholderText || authorizationPage.inMain[store.isEng] },
        name:            { type: 'text',    logoSrc: 'user', inputMode: 'text', placeholder: placeholderText || authorizationPage.inName[store.isEng] },
        surname:         { type: 'text',    logoSrc: 'user', inputMode: 'text', placeholder: placeholderText || authorizationPage.inSurname[store.isEng] },
    }
    

    useEffect(() => {
        setIsBlurred(true);
        const timeout = setTimeout(() => {
            setIsBlurred(false);
            setPlaceholder(placeholderError!)
        }, 200);
        return () => clearTimeout(timeout);
    }, [placeholderError]);

    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <div className={styles.logo} style={logoBlockStyle}>
                <img
                    src={`/img/input_logo/${dataInput[inputType].logoSrc}.png`}
                    alt={`${inputType}_logo`}
                    className={styles.logo_img}
                    style={imgStyle}
                />
            </div>
            <div className={`${styles.content} ${isBlurred ? styles.blurred : ''}`}>
                <InputPlaceholder
                    inputMode={dataInput[inputType].inputMode}
                    wrapperStyleClass={styles.innerInput}
                    placeholderText={dataInput[inputType].placeholder}
                    fontSizePlaceholder={ displayValue < 2
                        ? inputType === "name" || inputType === "surname"
                            ? `min(min(3vh, 1.5vw)`
                            : `min(min(3vh, 1.5vw)`
                        : 'min(6vh, 3vw)'}
                    inputType={dataInput[inputType].type}
                    textState={contentState || timeCase}
                    extraPlaceholder={useState('')}
                    placeholderStyle={{top: '19%'}}
                    placeholderActiveStyle={{top:'0.15em'}}
                    onlyLetters={inputType==='name' || inputType==='surname'}
                />
            </div>
        </div>
    )
})

export default LoginInput