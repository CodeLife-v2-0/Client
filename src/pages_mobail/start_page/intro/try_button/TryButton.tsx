import { FC, MouseEvent, useContext } from 'react'
import styles from './TryButton.module.css'
import { startPage } from '../../../../localizationData';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { ComponentContextType, StartPageContext } from '../../StartPageMobile';



const TryButton: FC = () => {
  const { store } = useContext(Context);
  const { stateContext } = useContext(StartPageContext) as ComponentContextType;

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    window.scrollTo({
      top: stateContext.startShop - window.innerHeight * 0.087,
      behavior: 'smooth',
    });
  
  };

  return (
    <motion.button
      className={styles.try_button}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, delay: 1.25 }}
    >
      {startPage.tryButton[store.isEng]}
    </motion.button>
  )
}

export default observer(TryButton)