import { FC, useState, useContext, MouseEvent } from 'react'
import styles from './CompanyDiscription.module.css'
import AnimatedText from '../../../components/Decorations/AnimatedText/AnimatedText'
import { startPage } from '../../../localizationData'
import { Context } from '../../..'
import { ComponentContextType, StartPageContext } from '../StartPageMobile'



const CompanyDiscription: FC = () => {
  const { stateContext } = useContext(StartPageContext) as ComponentContextType;


  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    window.scrollTo({
      top: stateContext.startShop - window.innerHeight * 0.087,
      behavior: 'smooth',
    });
  };

  const [skipAll, setSkipAll] = useState(false);
  const [weAreprinted, setWeArePrinted] = useState(false);
  const [isPrintedBlock1, setPrintedBlock1] = useState(false);
  const [isPrintedTextFuthure, setPrintedTextFuthure] = useState(false);
  const [isPrinteOffer, setPrintedOffer] = useState(false);
  const [isPrintedBlock2, setPrintedBlock2] = useState(false);
  const { store } = useContext(Context);
  const [isPrintedUnderline, setPrintedUnderline] = useState(false);

  const printDelay = skipAll ? 0 : 1;

  return (
    <div className={styles.wrapper} onClick={() => { if (!isPrintedBlock2) setSkipAll(true) }}>
      <div className={styles.we_are}>
        <AnimatedText text={startPage.we[store.isEng]} setIsCompleted={setWeArePrinted} />
      </div>
      <div className={styles.stats}>
        {(weAreprinted || skipAll) && <>
          <AnimatedText text={startPage.fast_growing[store.isEng]} setIsCompleted={setPrintedBlock1} delay={1000 * printDelay} /> <br />
          <AnimatedText text={startPage.international_organization[store.isEng]} delay={1000 * printDelay} />   <br />
          <AnimatedText text={startPage.multidisciplinary_school[store.isEng]} delay={1000 * printDelay} />  <br />
        </>}
        {(isPrintedBlock1 || skipAll) && <AnimatedText text={startPage.your_future[store.isEng]} delay={3000 * printDelay} setIsCompleted={setPrintedTextFuthure} />} <br />
      </div>
      <div className={styles.we_offer}>
        {(isPrintedTextFuthure || skipAll) && <AnimatedText text={startPage.offer[store.isEng]} delay={1000 * printDelay} setIsCompleted={setPrintedOffer} />}
      </div>
      <div className={styles.resons}>
        {(isPrinteOffer || skipAll) && <>
          <AnimatedText text={startPage.teaching_any_age[store.isEng]} delay={1000 * printDelay} /> <br />
          <AnimatedText text={startPage.getting_skills[store.isEng]} delay={1000 * printDelay} setIsCompleted={setPrintedBlock2} /> <br />
          <AnimatedText text={startPage.development_any_level[store.isEng]} delay={1000 * printDelay} /> <br />
          <AnimatedText text={startPage.cool_projects_portfolio[store.isEng]} delay={1000 * printDelay} /> <br />
          <AnimatedText text={startPage.certified_certificate[store.isEng]} delay={1000 * printDelay} /> <br />
        </>}
      </div>
      <div className={`${styles.main_question} ${isPrintedUnderline ? styles.underlined : ''}`} onClick={handleClick}>
        {(isPrintedBlock2 || skipAll) && <AnimatedText text={startPage.slide_3[store.isEng]} delay={4000 * printDelay} setIsCompleted={setPrintedUnderline} />}
      </div>
    </div>
  )
}

export default CompanyDiscription