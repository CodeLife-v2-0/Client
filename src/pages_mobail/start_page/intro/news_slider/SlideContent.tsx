import { FC, useContext } from 'react';
import styles from './SlideContent.module.css';
import { AppearCode } from './NewsSlider';
import FooterIntro from './FooterIntro';
import { motion } from "framer-motion";
import { ISlide } from './SliderData';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';

interface ISlideContent {
    data: ISlide;
    deltaX: number;
    unionStyles?: string;
    initAnimateCode: AppearCode ;
    slideEvent: boolean;
}

const SlideContent: FC<ISlideContent> = ({ data, unionStyles, deltaX, initAnimateCode }) => {
    const {store} = useContext(Context);
    const animateVariants = {
        [AppearCode.Initial]: { opacity: 0 },
        [AppearCode.SwipeRight]: { opacity: 0, x: -100 },
        [AppearCode.SwipeLeft]: { opacity: 0, x: 100 },
    };

    
    return (
        <motion.div
            className={`${styles.wrapper} ${unionStyles}`}
            style={{ marginLeft: deltaX + 'px'}}
            initial={animateVariants[initAnimateCode]}
            transition={{ duration: 1, delay:0.1 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <div className={styles.title}>{data.title[store.isEng]}</div>
            <div className={styles.body}>{data.body[store.isEng]}</div>
            {data.isInto && <FooterIntro />}
        </motion.div>
    )
}

export default observer(SlideContent)