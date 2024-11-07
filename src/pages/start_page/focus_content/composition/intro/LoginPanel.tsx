import { FC, useContext, MouseEvent, CSSProperties } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import styles from './LoginPanel.module.css'
import { startPage } from '../../../../../localizationData'
import { EventAB } from '../../../../../utils/animatedBacground'
import { Context } from '../../../../..'
import generateFunctionTransfer from '../../../../../utils/animatedBacground'


interface ILoginPanel{
    authLink: (event: EventAB) => void;
    selectColor: string;
    stateTopMenuValue: boolean;   
}

const LoginPanel: FC<ILoginPanel> = ({
    authLink,
    selectColor,
    stateTopMenuValue
}) => {
    
    const hideLoginImgStyle = {
        width: 0,
        opacity: 0,
        border: '0px solid',
    }

    const {store} = useContext(Context);
    const history: NavigateFunction = useNavigate();
    const [paLink]: ((event: MouseEvent<HTMLButtonElement>) => void)[] = generateFunctionTransfer(history, ["/personal_account"]);
    const loginText = store.isAuth? store.user.name: startPage.login[store.isEng]
    const fontSize = `${loginText.length <= 6 ? 2 : (-0.2 * loginText.length + 3.2) < 0.8 ? 0.8 : (-0.2 * loginText.length + 3.2)}vw`

    return (
        <div className={styles.wrapepr}>
            <img
                src="img/start_page/unknow_profile.png" alt="unknow_profile"
                className={styles.avatart}
                style={ stateTopMenuValue?hideLoginImgStyle:{border: `2px solid ${selectColor}` }}
            />
            <span
                className={styles.enter_link}
                onClick={store.isAuth? paLink :authLink}
                style={stateTopMenuValue ? { marginLeft: '-20px', fontSize} 
                                         : {fontSize} as CSSProperties} 
            >
                {loginText}
            </span>
        </div>
    )
}

export default LoginPanel