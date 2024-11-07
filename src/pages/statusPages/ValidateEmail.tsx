import { FC, MouseEvent, useContext, useState, useEffect } from 'react'
import styles from './UnAuthorization.module.css'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import generateFunctionTransfer from '../../utils/animatedBacground';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { statusPage } from '../../localizationData';



const ValidateEmail: FC<{ mail: string }> = ({ mail }) => {
  const { store } = useContext(Context);
  const history: NavigateFunction = useNavigate();
  const [timeBeforeResend, setTimeBeforeResond] = useState(60);
  const [goAuth]: ((event: MouseEvent<HTMLButtonElement>) => void)[] = generateFunctionTransfer(history, ["/authorization/"]);
  
  useEffect(() => {
    if (timeBeforeResend) {
      const countdownTimer = setInterval(() => {
        setTimeBeforeResond((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(countdownTimer);
      };
    }
  }, [timeBeforeResend]);

  const reSend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    store.reValidateMail();
    setTimeBeforeResond(60);
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.title_start}> {statusPage.confirmMail[store.isEng]} </span>
      <span className={styles.title_end}> {statusPage.sendMes[store.isEng]} <div className={styles.mail}> {mail}</div></span>
      <span className={styles.mail_message}> {statusPage.sendRep[store.isEng]} </span>
      <div className={styles.buttons_block}>
        <button onClick={goAuth}> {statusPage.uncorMail[store.isEng]} </button>
        {timeBeforeResend
          ? <button disabled className={styles.disabledButton}> {statusPage.repVia[store.isEng]} {timeBeforeResend}c</button>
          : <button onClick={reSend}> {statusPage.repMail[store.isEng]} </button>
        }
      </div>
    </div>
  )
}

export default observer(ValidateEmail)