import { useState, FC, useContext } from 'react'
import styles from './Slide3.module.css'
import { motion } from "framer-motion";
import AnimatedText from '../../../../../../components/Decorations/AnimatedText/AnimatedText';
import { startPage } from '../../../../../../localizationData'
import { Context } from '../../../../../..';


interface ISlide3 {
    scrollFunk: () => void;
    firstTime: boolean;
}

const Slide3: FC<ISlide3> = ({ scrollFunk, firstTime }) => {
    const [rowIsPrinted, setRowIsPrinted] = useState(false);
    const { store } = useContext(Context);
    return (
        <div className={styles.wrapper}>
            {firstTime
                ?
                <>
                    <motion.img
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            delay: 3,
                        }}
                        src="img/start_page/background_for_3_slide.png"
                        alt="background for 3st slide"
                        className={styles.background_slide}
                        draggable="false"
                    />
                    <span className={styles.quest}>
                        <AnimatedText
                            delay={500}
                            setIsCompleted={setRowIsPrinted}
                            text={startPage.slide_3_row_1[store.isEng]}
                            colorCursor={'#009aad'}
                        />
                        <br />
                        <span className={styles.row_right}>
                            {rowIsPrinted &&
                                <AnimatedText
                                    delay={0}
                                    text={startPage.slide_3_row_2[store.isEng]}
                                    colorCursor={'#009aad'}
                                />
                            }
                        </span>
                    </span>
                    <motion.button
                        className={styles.slide_button}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            delay: 2,
                        }
                        }
                        onClick={scrollFunk}
                    >
                        {startPage.choose_course[store.isEng]}
                    </motion.button>
                </>
                :
                <>
                    <img
                        src="img/start_page/background_for_3_slide.png"
                        alt="background for 3st slide"
                        className={styles.background_slide}
                        draggable="false"
                    />
                    <span className={styles.quest}>
                        {startPage.slide_3_row_1[store.isEng]}
                        <br />
                        <span className={styles.row_right}>
                            {startPage.slide_3_row_2[store.isEng]}
                        </span>
                    </span>
                    <button
                        className={styles.slide_button}
                        onClick={scrollFunk}
                    >
                        {startPage.choose_course[store.isEng]}
                    </button>
                </>
            }

        </div>
    )
}

export default Slide3