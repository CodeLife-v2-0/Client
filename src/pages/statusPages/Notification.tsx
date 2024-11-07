import { FC, MouseEvent, useContext } from 'react'
import styles from './UnAuthorization.module.css'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import generateFunctionTransfer from '../../utils/animatedBacground';
import { statusPage } from '../../localizationData';
import { Context } from '../..';


const Notification: FC = () => {
    const {store} = useContext(Context);
    const history: NavigateFunction = useNavigate();
    const [goMain, goAuth]: ((event: MouseEvent<HTMLButtonElement>) => void)[] = generateFunctionTransfer(history, ["/", "/authorization/"]);
    return (
        <div className={styles.wrapper}>
            <span className={styles.title_start}> {statusPage.noLc[store.isEng]} </span>
            <span className={styles.title_end}>{statusPage.noRec[store.isEng]} </span>
            <span className={styles.message}> {statusPage.newAc[store.isEng]} </span>
            <div className={styles.buttons_block}>
                <button onClick={goMain}>{statusPage.goMain[store.isEng]}</button>
                <button onClick={goAuth}>{statusPage.goAuth[store.isEng]}</button>
            </div>
        </div>
    )
}

export default Notification