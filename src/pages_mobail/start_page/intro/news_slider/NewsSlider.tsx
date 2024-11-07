import { FC, useState, TouchEventHandler } from 'react'
import styles from './NewsSlider.module.css'
import SlideContent from './SlideContent';
import Pagination from './Pagination';
import slidersData from './SliderData';
import { motion } from 'framer-motion';

export enum AppearCode {
    Initial = 0,
    SwipeLeft = 1,
    SwipeRight = 2,
}

const NewsSlider: FC = () => {
    const halfWidth = window.innerWidth / 5;
    const [activeSlideID, setActiveSlideID] = useState(1);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);
    const amountComposition = Object.keys(slidersData).length;
    const [deltaX, setDeltaX] = useState(0);
    const [slideEvent, setSlideEvent] = useState(false);
    const [initAnimate, setInitAnimate] = useState(AppearCode.Initial);

    const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
        const touch = event.touches[0];
        setStartX(touch.clientX);
        setSlideEvent(false);
        setDeltaX(0);
    };
    const handleTouchMove: TouchEventHandler<HTMLElement> = (event) => {
        const touch = event.touches[0];
        setEndX(touch.clientX);
        if(Math.abs(endX - startX) < halfWidth)
        setDeltaX(endX - startX)
    };

    const handleTouchEnd = () => {
        if (Math.abs(startX - endX) > halfWidth) {
            if ((startX - endX > halfWidth) && startX && endX) {
                setSlideEvent(true);
                setInitAnimate(AppearCode.SwipeLeft);
                setActiveSlideID(amountComposition === activeSlideID ? 1 : activeSlideID + 1);
            } else if (endX - startX > halfWidth) {
                setSlideEvent(true);
                setInitAnimate(AppearCode.SwipeRight);
                setActiveSlideID(activeSlideID === 1 ? amountComposition : activeSlideID - 1);
            }
        } else {
            setInitAnimate(AppearCode.Initial);
            setSlideEvent(false);
        }
        setStartX(0);
        setEndX(0);
        setDeltaX(0);
    };
    return (
        <motion.section
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={styles.wrapper}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.75, delay: 0.75}}
            >
            <SlideContent
                key={`mobail-into-slide-${activeSlideID}`}
                data={slidersData[activeSlideID]}
                slideEvent={slideEvent}
                deltaX={deltaX}
                unionStyles={deltaX || slideEvent ? 'none' : styles.transitionMargin}
                initAnimateCode={initAnimate}
            />
            <Pagination
                amountComposition={amountComposition}
                activeCompositionID={activeSlideID}
                setCompositionID={setActiveSlideID}
                setInitAnimate={setInitAnimate}
            />
        </motion.section>
    )
}

export default NewsSlider