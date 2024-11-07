import { useState, FC } from 'react';
import styles from './InfoContent.module.css';
import Slide1 from './sliders/Slide1';
import { motion } from "framer-motion";
import Slide2 from './sliders/Slide2';
import Slide3 from './sliders/Slide3';

interface IInfoContent {
    activeValue: boolean;
    isIntfoVisable: boolean;
    firstTime: boolean;
}


const InfoContent: FC<IInfoContent> = ({
    activeValue,
    isIntfoVisable,
    firstTime,
}) => {
    const [slideToDisplay, setSlideToDisplay] = useState(1);

    const ifMenuIsActiveStyle = {
        marginLeft: '-2.5vw',
    }

    function scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight * (2.25 / 7),
            behavior: 'smooth'
        });
    }

    return (
        <div className={styles.main__wrapper}>
            {firstTime
                ?
                <>
                    {isIntfoVisable &&
                        <motion.section
                            className={styles.wrapper}
                            style={activeValue ? ifMenuIsActiveStyle : undefined}
                            animate={{ x: 0, opacity: 1 }}
                            initial={{ x: 100, opacity: 0 }}
                            transition={{
                                duration: 1,
                                repeat: 0,
                            }}
                        >
                            {slideToDisplay === 1
                                ? <Slide1 setFocusSlide={setSlideToDisplay} firstTime={firstTime}/>
                                : slideToDisplay === 2
                                    ? <Slide2 setFocusSlide={setSlideToDisplay} firstTime={firstTime} />
                                    : <Slide3 scrollFunk={scrollToBottom} firstTime={firstTime}/>}
                        </motion.section>
                    }
                </>
                :
                <>
                    <section
                        className={styles.wrapper}
                        style={activeValue ? ifMenuIsActiveStyle : undefined}
                    >
                        {slideToDisplay === 1
                            ? <Slide1 setFocusSlide={setSlideToDisplay} firstTime={firstTime}/>
                            : slideToDisplay === 2
                                ? <Slide2 setFocusSlide={setSlideToDisplay} firstTime={firstTime}/>
                                : <Slide3 scrollFunk={scrollToBottom} firstTime={firstTime}/>}
                    </section>
                </>
            }
        </div>
    );
};

export default InfoContent;
