import { FC, Dispatch, SetStateAction, useContext } from 'react'
import styles from './Slide1.module.css'
import InfoPanel from '../InfoPanel/InfoPanel'
import BottomSwitcher from '../BottomSwitcher/BottomSwitcher'
import { startPage } from '../../../../../../localizationData'
import AnimatedText from '../../../../../../components/Decorations/AnimatedText/AnimatedText'
import { Context } from '../../../../../..'

interface ISlide1 {
    setFocusSlide: Dispatch<SetStateAction<number>>;
    firstTime: boolean
}

const Slide1: FC<ISlide1> = ({ setFocusSlide, firstTime }) => {
    const { store } = useContext(Context);
    const dataContent = [
        startPage.fast_growing[store.isEng],
        startPage.international_organization[store.isEng],
        startPage.multidisciplinary_school[store.isEng],
        startPage.your_future[store.isEng],
    ]
    return (
        <div className={styles.wrapper}>
            {firstTime
                ?
                <>
                    <span className={styles.title}><AnimatedText text={startPage.we[store.isEng]} delay={1} colorCursor={'#009aad'} /></span>
                    <InfoPanel data={dataContent} SpecialPos={3} firstTime={firstTime}/>
                    <BottomSwitcher CountPos={3} ActivePos={1} setFocusSlide={setFocusSlide} firstTime={firstTime}/>
                </>
                :
                <>
                    <span className={styles.title}>{startPage.we[store.isEng]}</span>
                    <InfoPanel data={dataContent} SpecialPos={3} firstTime={firstTime}/>
                    <BottomSwitcher CountPos={3} ActivePos={1} setFocusSlide={setFocusSlide} firstTime={firstTime}/>
                </>

            }
        </div>
    )
}

export default Slide1