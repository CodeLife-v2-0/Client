import { FC, Dispatch, SetStateAction, useState, useContext } from 'react'
import styles from './Welcome.module.css'
import AnimatedText from '../../components/Decorations/AnimatedText/AnimatedText';
import { startPage } from '../../localizationData';
import { Context } from '../..';

interface IWelcome {
    completeControl: Dispatch<SetStateAction<boolean>>;
}

const Welcome: FC<IWelcome> = ({ completeControl }) => {
    const {store} = useContext(Context);
    const [grettingsPrinted, setGrettingsPrinted] = useState(false);
    const [titlePrinted, setTitlePrinted] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(false);
    if (titlePrinted) setTimeout(() => setOpacityBackground(true), 1000)
    if (opacityBackground) setTimeout(() => completeControl(true), 1000)

    return (
        <section className={styles.outer_wrapper}>
            <section className={styles.inner_wrapper} style={{ opacity: opacityBackground ? '0' : '1' }}>
                <span className={styles.grettings}>
                    <AnimatedText text={startPage.welcome[store.isEng]} setIsCompleted={setGrettingsPrinted} />
                </span>
                <span className={styles.title}>
                    {grettingsPrinted && <AnimatedText text={startPage.toCL[store.isEng]} setIsCompleted={setTitlePrinted} />}
                </span>
            </section>
        </section>
    )
}

export default Welcome