import {FC, MouseEvent, useContext} from 'react'
import styles from './style.module.css'
import { authorizationPage } from '../../localizationData';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

interface IFormHeader{
    Mode: boolean;
    closeLink: (e:MouseEvent<HTMLButtonElement>)=>void;
    displayValue: number;
}

const FormHeader: FC<IFormHeader> = ({Mode, closeLink, displayValue}) => {
    const {store} = useContext(Context);
    return (
        <div className={styles.authorization_form_title}>
            {Mode ? authorizationPage.registration[store.isEng] : authorizationPage.authorization[store.isEng]}
            {displayValue < 3 ?
            <span className="clickable" onClick={closeLink} id={styles.form_close} style={{'cursor': 'pointer'}}>
                &times;
            </span> : <></>
        }
        </div>
    )
}

export default observer(FormHeader);