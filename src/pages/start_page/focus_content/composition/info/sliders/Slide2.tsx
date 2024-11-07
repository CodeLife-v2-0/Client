import { FC, Dispatch, SetStateAction, useContext } from 'react'
import InfoPanel from '../InfoPanel/InfoPanel'
import BottomSwitcher from '../BottomSwitcher/BottomSwitcher'
import styles from './Slide2.module.css'
import { startPage } from '../../../../../../localizationData'
import AnimatedText from '../../../../../../components/Decorations/AnimatedText/AnimatedText'
import { Context } from '../../../../../..'

interface ISlide2 {
    setFocusSlide: Dispatch<SetStateAction<number>>;
    firstTime: boolean
}

const Slide2: FC<ISlide2> = ({
    setFocusSlide,
    firstTime,
}) => {

    const { store } = useContext(Context);
    const dataContent = [
        startPage.teaching_any_age[store.isEng],
        startPage.getting_skills[store.isEng],
        startPage.development_any_level[store.isEng],
        startPage.cool_projects_portfolio[store.isEng],
        startPage.certified_certificate[store.isEng],
    ]
    return (
        <div className={styles.wrapper}>
            {firstTime
                ?
                <>
                    <span className={styles.title}><AnimatedText text={startPage.offer[store.isEng]} delay={1} colorCursor={'#009aad'} /></span>
                    <InfoPanel data={dataContent} firstTime={firstTime} />
                    <BottomSwitcher CountPos={3} ActivePos={2} setFocusSlide={setFocusSlide} firstTime={firstTime} />
                </>
                :
                <>
                    <span className={styles.title}>{startPage.offer[store.isEng]}</span>
                    <InfoPanel data={dataContent} firstTime={firstTime} />
                    <BottomSwitcher CountPos={3} ActivePos={2} setFocusSlide={setFocusSlide} firstTime={firstTime} />
                </>
            }
        </div>
    )
}

export default Slide2