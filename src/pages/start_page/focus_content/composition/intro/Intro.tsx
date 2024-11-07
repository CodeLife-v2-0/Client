import { useState, useEffect, useCallback, FC, Dispatch, SetStateAction, useContext } from 'react'
import styles from './Intro.module.css'
import AnimatedText from '../../../../../components/Decorations/AnimatedText/AnimatedText'
import { motion, MotionStyle } from "framer-motion";
import StartLangeSelector from './StartLangeSelector';
import { EventAB } from '../../../../../utils/animatedBacground';
import { Context } from '../../../../..';
import { observer } from 'mobx-react-lite';

const { startPage } = require('../../../../../localizationData');

interface IIntro {
    color: string;
    activeValue: boolean;
    authLink: (event: EventAB) => void;
    activeInfoSection: Dispatch<SetStateAction<boolean>>;
    stateTopMenu: [boolean, Dispatch<SetStateAction<boolean>>];
    firstTime: [boolean, Dispatch<SetStateAction<boolean>>];
}

const Intro: FC<IIntro> = ({
    color,
    activeValue,
    authLink,
    activeInfoSection,
    stateTopMenu,
    firstTime,
}) => {

    const [isIntroTextPrinted, setIsIntroTextPrinted] = useState(false);
    const [localMenuTop, setLocalMenuTop] = useState(0);
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const [lengtheningMenu, setLengtheningMenu] = useState(false);
    const [isFirstTime, setIsFirstTime] = firstTime;
    const stateTopMenuValue = stateTopMenu[0];
    const [isPrintIntroCompleted, setPrintIntroCompleted] = useState(false);
    const { store } = useContext(Context);
    useEffect(() => {
        const elem = document.getElementsByClassName(styles.bottom)[0];
        if (elem) {
            const rect = elem.getBoundingClientRect();
            setLocalMenuTop(rect.top + window.pageYOffset - 120);
        }
    }, [isIntroTextPrinted, localMenuTop]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight * 0.35 < window.pageYOffset) {
            setIsIntroTextPrinted(true);
        }
        if (localMenuTop && (window.pageYOffset > localMenuTop)) {
            setIsVisibleMenu(true);
            setTimeout(() => { setLengtheningMenu(true) }, 1000)
            activeInfoSection(true);
        } else {
            setLengtheningMenu(false);
            setIsVisibleMenu(false);
        }
    }, [localMenuTop]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const topMenuAdditionalStyle = {
        position: 'fixed',
        top: '2%',
        left: lengtheningMenu && !activeValue ? '15vw' : '35vw',
        width: lengtheningMenu ? (!activeValue ? '86vw' : '65vw') : '60vw',
        transition: 'all 1s ease-in-out',
        backgroundColor: 'black',
        border: `2px solid ${color}`,
        borderRadius: '40px 0 0 40px',
        height: '80px',
        display: 'flex',
    }

    const shortTopMenuAdditionalStyle = {
        position: 'fixed',
        top: '2%',
        left: '89.5vw',
        width: '10.5vw',
        transition: 'all 1s ease-in-out',
        backgroundColor: 'black',
        border: `2px solid ${color}`,
        borderRadius: '40px 0 0 40px',
        height: '80px',
        justifyContent: 'center',
        display: 'flex',
    }

    const bottomLeftAdditionalStyle = {
        border: '0px solid black',
        fontSize: lengtheningMenu ? '2vw' : '2vw',
        lineHeigth: lengtheningMenu ? 'calc(1.05 * 2vw)' : 'calc(1.05 * 2vw)',
        width: lengtheningMenu && !activeValue ? '60%' : '76%',
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'flex',
    }

    const shortBottomLeftAdditionalStyle = {
        border: '0px solid black',
        fontSize: '0px',
        opacity: '0',
        lineHeigth: '0',
        width: '0',
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'flex',
    }


    return (
        <div className={styles.wrapper} >
            {!isFirstTime
                ?
                <>
                    <div
                        className={styles.textblock}
                        style={{ borderRadius: '70px 70px 0px 0px' }}
                        onClick={() => { setPrintIntroCompleted(true); setIsIntroTextPrinted(true) }}
                    >
                        <div className={styles.maintext}>
                            {startPage.intro_text[store.isEng]}
                        </div>
                        <p className={styles.signature}>
                            {startPage.with_respect[store.isEng]}<br />
                            {startPage.our_team[store.isEng]}
                        </p>
                    </div>
                    <motion.div className={styles.bottom}
                        style={
                            isVisibleMenu
                                ? stateTopMenuValue
                                    ? shortTopMenuAdditionalStyle as MotionStyle
                                    : topMenuAdditionalStyle as MotionStyle
                                : {}
                        }>
                        <div
                            className={styles.bottom_left}
                            style={isVisibleMenu ? stateTopMenuValue ? shortBottomLeftAdditionalStyle : bottomLeftAdditionalStyle : {}}
                        >
                            {startPage.best_school[store.isEng]}
                        </div>
                        <StartLangeSelector
                            isVisibleMenu={isVisibleMenu}
                            authLink={authLink}
                            selectColor={color}
                            stateTopMenu={stateTopMenu}
                            maintTextPronted={setPrintIntroCompleted}
                        />
                    </motion.div>
                </>
                :
                <>
                    <motion.div
                        className={styles.textblock}
                        style={{
                            borderRadius: isIntroTextPrinted ? '70px 70px 0px 0px' : '70px'
                        }}
                        animate={{ opacity: 1, translateX: "0%" }}
                        initial={{ opacity: 0, translateX: "150%" }}
                        transition={{
                            duration: 2,
                            repeat: 0,
                        }}
                        onClick={() => { setPrintIntroCompleted(true); setIsIntroTextPrinted(true) }}
                    >
                        <div className={styles.maintext}>
                            {isPrintIntroCompleted
                                ? startPage.intro_text[store.isEng]
                                : <AnimatedText
                                    delay={2000}
                                    setIsCompleted={setIsIntroTextPrinted}
                                    text={startPage.intro_text[store.isEng]}
                                />
                            }
                        </div>
                        {(isIntroTextPrinted || isPrintIntroCompleted) && <div className={styles.our__team__and__news__wrapper}>
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{
                                    duration: 4,
                                    repeat: 0,
                                }}
                                className={styles.go__to__news}>
                                <div className={styles.go__to__news__cirlce}>
                                    <div className={styles.go__to__news__arrow}></div>
                                </div>

                                <div className={styles.go__to__news__text}> К новостям</div>
                            </motion.div>
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{
                                    duration: 4,
                                    repeat: 0,
                                }}
                                className={styles.signature}>
                                {startPage.with_respect[store.isEng]}<br />
                                {startPage.our_team[store.isEng]}
                            </motion.div>
                        </div>}
                    </motion.div>
                    {(isIntroTextPrinted || isPrintIntroCompleted) &&
                        (<motion.div
                            className={styles.bottom}
                            animate={{ y: 0, opacity: 1 }}
                            initial={{ y: "20vh", opacity: 0 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            style={
                                isVisibleMenu
                                    ? stateTopMenuValue
                                        ? shortTopMenuAdditionalStyle as MotionStyle
                                        : topMenuAdditionalStyle as MotionStyle
                                    : {}
                            }
                        >
                            <div
                                className={styles.bottom_left}
                                style={isVisibleMenu ? stateTopMenuValue ? shortBottomLeftAdditionalStyle : bottomLeftAdditionalStyle : {}}
                            >
                                {isPrintIntroCompleted ?
                                    startPage.best_school[store.isEng]
                                    : <AnimatedText delay={2000} text={startPage.best_school[store.isEng]} />
                                }
                            </div>
                            <StartLangeSelector
                                isVisibleMenu={isVisibleMenu}
                                authLink={authLink}
                                selectColor={color}
                                stateTopMenu={stateTopMenu}
                                maintTextPronted={setPrintIntroCompleted}
                            />
                        </motion.div>)
                    }
                </>
            }
        </div>
    )
}

export default observer(Intro)