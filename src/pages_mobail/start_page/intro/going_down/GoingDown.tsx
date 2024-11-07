import { FC, MouseEvent, useContext } from 'react';
import styles from './GoingDown.module.css';
import { startPage } from '../../../../localizationData';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { ComponentContextType, StartPageContext } from '../../StartPageMobile';




const GoingDown: FC = () => {
  const { stateContext } = useContext(StartPageContext) as ComponentContextType;
  const { store } = useContext(Context);

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    window.scrollTo({
      top: stateContext.startInfo - window.innerHeight *0.085,
      behavior: 'smooth',
    });
  
  };

  return (
    <motion.div
      className={styles.wrapper}
      onClick={handleClick}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%'}}
      transition={{ duration: 0.75, delay: 1.55 }}
    >
      <div className={styles.question}>
        {startPage.meet[store.isEng]}
      </div>
      <div className={styles.arrow}>
        <div className={`${styles.line} ${styles.line_one}`}></div>
        <div className={`${styles.line} ${styles.line_two}`}></div>
      </div>
    </motion.div>
  );
};

export default observer(GoingDown);
