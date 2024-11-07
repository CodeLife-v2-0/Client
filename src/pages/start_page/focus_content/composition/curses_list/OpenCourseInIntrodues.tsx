import { FC, useEffect, useState, useContext, MouseEvent } from 'react'
import { gsap } from 'gsap'
import styles from './OpenCourseInIntrodues.module.css'
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';
import generateFunctionTransfer, { EventAB } from '../../../../../utils/animatedBacground';
import { ddata } from '../../../../../pages_mobail/start_page/curs_list/CursData';
import { Context } from '../../../../..';
import ProgramDivision from './ProgramDivision'
import AppearanceText from '../../../../../components/Decorations/AppearanceText/AppearanceText';


const OpenCourseInIntrodues: FC = ({ }) => {

    const history: NavigateFunction = useNavigate();
    const { scrollValue } = useParams();
    const { store } = useContext(Context);
    const home: ((event: EventAB) => void)[] = generateFunctionTransfer(history, [`/${scrollValue}`]);
    const [newSkillsData, setNewSkillsData] = useState<{ title: string, body: string }[][]>([]);
    const programDivision = <ProgramDivision programPoint={ddata.programDara} />;
    const [introActive, setIntroActive] = useState(true);
    const [descriptionActive, setDescriptionActive] = useState(true);
    const [stagesActive, setStagesActive] = useState(true);
    const [numberButton, setNumberButton] = useState(0);

    const goHome = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        home[0](e);
    }

    const tableValues = [
        ['1', 'The most popular and in-demand framework in 2023'],
        ['110.000$', 'Average annual salary of a novice react developer'],
        ['18 - 24', 'The average number of months spent on mastering the profession'],
        ['40%', 'The share of developers on react from all frameworks'],
    ]

    const countWords = tableValues[0][1].split(' ').length + tableValues[1][1].split(' ').length + tableValues[2][1].split(' ').length + tableValues[3][1].split(' ').length

    useEffect(() => {
        let titleAnimation = gsap.timeline();
        titleAnimation.to(`.${styles.open__course__table__cell__title}`, {
            delay: 5,
            opacity: 1,
            stagger: 1,
            duration: 2,
        });
    }, []);

    useEffect(() => {
        let textAnimation = gsap.timeline();
        textAnimation.to('.appearance__text', {
            delay: 5,
            opacity: 1,
            stagger: 4 / countWords,
            duration: 2,
        });
    }, []);

    const tableContent = () => {
        return (
            <div className={introActive ? styles.open__course__intro__table : styles.open__course__intro__table__disanimation}>
                <div className={styles.open__course__table__cell}>
                    <div className={introActive ? styles.open__course__table__cell__title : styles.open__course__table__cell__title__disanimation}>{tableValues[0][0]}</div>
                    <div className={styles.open__course__table__cell__text}>{tableValues[0][1].split(' ').map((i) => <AppearanceText letter={i} doAnimation={introActive} />)}</div>
                </div>
                <div className={styles.open__course__table__cell}>
                    <div className={introActive ? styles.open__course__table__cell__title : styles.open__course__table__cell__title__disanimation}>{tableValues[1][0]}</div>
                    <div className={styles.open__course__table__cell__text}>{tableValues[1][1].split(' ').map((i) => <AppearanceText letter={i} doAnimation={introActive} />)}</div>
                </div>
                <div className={styles.open__course__table__cell}>
                    <div className={introActive ? styles.open__course__table__cell__title : styles.open__course__table__cell__title__disanimation}>{tableValues[2][0]}</div>
                    <div className={styles.open__course__table__cell__text}>{tableValues[2][1].split(' ').map((i) => <AppearanceText letter={i} doAnimation={introActive} />)}</div>
                </div>
                <div className={styles.open__course__table__cell}>
                    <div className={introActive ? styles.open__course__table__cell__title : styles.open__course__table__cell__title__disanimation}>{tableValues[3][0]}</div>
                    <div className={styles.open__course__table__cell__text}>{tableValues[3][1].split(' ').map((i) => <AppearanceText letter={i} doAnimation={introActive} />)}</div>
                </div>
            </div>
        )
    }

    const stagesTitles = [
        'The first stage',
        'The second stage',
        'The third stage',
        'The fourth stage',
    ]

    const stagesTexts = [
        [
            [
                'The main objectives:',
                'To achieve a good level of layout. Freely write html and css code based on the layout.',
            ],
            [
                'Training time:',
                'According to the general program, 12 classes are provided. With scheduled weekly classes, it will take three months.',
            ],
            [
                'Control projects:',
                'Adaptive layout of a complex multi-page website with a complex layout structure.',
            ],
        ],
        [
            [
                'something else', 
                'This is description aboud second stage part 1',
            ],
            [
                'something more',
                'This is description aboud second stage part 2',
            ],
        ],
        [
            [
                'something else', 
                'This is description aboud third stage part 1',
            ],
            [
                'something more',
                'This is description aboud third stage part 2',
            ],
        ],
        [
            [
                'something else', 
                'This is description aboud fourth stage part 1',
            ],
            [
                'something more',
                'This is description aboud fourth stage part 2',
            ],
        ],
    ]

    const setTitleStage = (numPage: number) => {
        return (
            <>
                <div className={stagesActive && numPage == 2
                    ? styles.open__course__stages__info__title
                    : numPage == -2 || numPage == 2
                        ? styles.open__course__stages__info__title__disanimation
                        : numPage == -3
                            ? styles.open__course__stages__info__title__appearance
                            : numPage >= 31 && numPage <= 34
                                ? styles.open__course__stages__info__title__disappearance
                                : styles.open__course__stages__info__title__unactive}>
                    Stages of training
                </div>
                <div className={numPage >= 31 && numPage <= 34
                    ? styles.open__course__stages__info__title__appearance
                    : numPage == -24
                        ? styles.open__course__stages__info__title__disanimation
                        : numPage == -3
                            ? styles.open__course__stages__info__title__disappearance
                            : styles.open__course__stages__info__title__unactive}>
                    {stagesTitles[numPage - 31]}
                </div>
            </>
        )
    }

    const setTextStage = (numPage: number) => {
        return (
            <div className={numPage >= 31 && numPage <= 34
                ? styles.open__course__stages__info__text__appearance
                : numPage == -24
                    ? styles.open__course__stages__info__text__disanimation
                    : numPage == -3
                        ? styles.open__course__stages__info__text__disappearance
                        : styles.open__course__stages__info__text__unactive}>
                {numPage >= 31 && numPage <= 34 && stagesTexts[numPage - 31].map(onePoint => 
                <div className={styles.open__course__stages__info__text__one__point}>
                    <div className={styles.open__course__stages__info__text__one__point__title}>
                        {onePoint[0]}
                    </div>
                    <div className={styles.open__course__stages__info__text__one__point__text}>
                        {onePoint[1]}
                    </div>
                </div>)}
            </div>
        )
    }

    return (
        <>
            <img src='/img/demo11.png' className={styles.backgrond__photo} />
            <div className={styles.open__course__visible__content}>
                <div className={numberButton == 0
                    ? styles.open__course__intro__wrapper__active
                    : numberButton == 1
                        ? styles.open__course__intro__wrapper__disappearance__left
                        : numberButton == -1
                            ? styles.open__course__intro__wrapper__appearance__left
                            : styles.open__course__intro__wrapper__unactive}
                >
                    <div className={styles.open__course__intro}>
                        <img src="/img/demo12.png" className={introActive ? styles.bg__photo__2 : styles.bg__photo__2__disanimation} />
                        <div className={introActive ? styles.open__course__intro__title : styles.open__course__intro__title__disanimation}> React Native </div>
                        <div className={styles.open__course__intro__main__content}>
                            {tableContent()}
                            <div className={introActive ? styles.open__course__intro__description : styles.open__course__intro__description__disanimetion}>
                                <div className={introActive ? styles.open__course__intro__description__text : styles.open__course__intro__description__text__disanimation}>
                                    &emsp;In our new react course, you will learn the most popular javascript framework for creating frontend sites! You will learn how to create powerful animations and cool dynamic pages, and all your sites will give incredible experience to your users!
                                    <br />
                                    <br />
                                    &emsp;Create a better future together with react!
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className={styles.go__on__main} onClick={(e) => { goHome(e) }}>
                                На главную
                            </div>
                            <div onClick={() => { setIntroActive(false); setNumberButton(1) }} style={{ color: 'white' }}> Go next</div>
                        </div>
                    </div>
                </div>
                <div className={numberButton == 1
                    ? styles.open__course__description__wrapper__appearance__right
                    : (numberButton >= 2 && numberButton <= 4) || (numberButton <= -2 && numberButton >= -4) || (numberButton >= 31 && numberButton <= 34) || numberButton == -24
                        ? styles.open__course__description__wrapper__active
                        : numberButton == -1
                            ? styles.open__course__description__wrapper__disappearance__right
                            : styles.open__course__description__wrapper__unactive}
                >
                    <div className={styles.open__course__description}>
                        <div className={numberButton == 1 ? styles.open__course__description__circle__appearance : numberButton == 2 || (numberButton >= 31 && numberButton <= 34) || numberButton == -3 ? styles.open__course__description__circle__left : numberButton == -2 || numberButton == -24 ? styles.open__course__description__circle__right : styles.open__course__description__circle__unactive}>
                            <img src="/img/courses_logo/react.png"
                                className={descriptionActive && numberButton == 1 ? styles.open__course__description__logo__photo__appearance : numberButton == 1 || numberButton == -2 || numberButton == -24 ? styles.open__course__description__logo__photo__left : styles.open__course__description__logo__photo__right} />
                        </div>
                        <div className={numberButton == 1
                            ? styles.open__course__description__main__content__wrapper__active
                            : numberButton == 2
                                ? styles.open__course__description__main__content__wrapper__disappearance__left
                                : numberButton == -2 || numberButton == -24
                                    ? styles.open__course__description__main__content__wrapper__appearance__left
                                    : styles.open__course__description__main__content__wrapper__unactive}
                        >
                            <div className={descriptionActive && numberButton == 1 ? styles.open__course__description__main__content__title__appearance : styles.open__course__description__main__content__title__disamination}>
                                Description
                            </div>
                            <div className={descriptionActive && numberButton == 1 ? styles.open__course__description__main__content__border__appearance : styles.open__course__description__main__content__border__disamination}>
                                <div className={descriptionActive && numberButton == 1 ? styles.open__course__description__main__content__text__appearance : styles.open__course__description__main__content__text__disamination}>
                                    React.js is a JavaScript library from Facebook* for convenient development of interfaces, that is,
                                    the external part of sites and applications with which the user interacts.<br /><br />

                                    Using the React library.js, the developer gets the opportunity to focus on the user interface and
                                    application components, paying less attention to the code. This library helps to create applications
                                    faster, declarative programming style greatly simplifies debugging of components and the project as a whole.
                                </div>
                            </div>
                        </div>
                        <div className={descriptionActive && numberButton == 1 || numberButton == 1 || numberButton == -2 || numberButton == -24 ? styles.open__course__description__main__content__buttons__appearance : styles.open__course__description__main__content__buttons__disanimation}>
                            <div>
                                <div onClick={() => { setDescriptionActive(false); setNumberButton(-1) }}> Go back </div>
                                <div> View the training plan </div>
                            </div>
                            <div onClick={() => { setDescriptionActive(false); setNumberButton(2) }}> How will the training take place</div>
                        </div>
                        <div
                            className={(stagesActive && numberButton == 2) || (numberButton >= 3 && numberButton <= 6) || (numberButton >= 31 && numberButton <= 34) || numberButton == -3
                                ? styles.open__course__stages__info__wrapper__active
                                : numberButton == 2
                                    ? styles.open__course__stages__info__wrapper__appearance__right
                                    : numberButton == -2
                                        ? styles.open__course__stages__info__wrapper__disappearance__right
                                        : styles.open__course__stages__info__wrapper__unactive}
                        >
                            <div className={styles.open__course__stages__info__relative}>
                                {setTitleStage(numberButton)}
                                <div className={stagesActive && numberButton == 2 ? styles.open__course__stages__info__border : styles.open__course__stages__info__border__disanimation} />
                                {setTextStage(numberButton)}
                                <div className={stagesActive && numberButton == 2 ? styles.open__course__stages__info__text : numberButton >= 31 && numberButton <= 34 ? styles.open__course__stages__info__text__disappearance : numberButton == -3 ? styles.open__course__stages__info__text__appearance : numberButton == 2 || numberButton == -2 ? styles.open__course__stages__info__text__disanimation : styles.open__course__stages__info__text__unactive}>
                                    <div className={styles.open__course__stages__info__text__part} onClick={() => { setNumberButton(31) }}>
                                        <span className={styles.open__course__stages__info__text__part__title}>The first stage:</span>
                                        &nbsp;familiarization with advanced layout, closing gaps on basic topics.
                                        The total duration of training is 3 months. The final work is a one-page landing page without internal
                                        logic.
                                    </div>
                                    <div className={styles.open__course__stages__info__text__part} onClick={() => { setNumberButton(32) }}>
                                        <span className={styles.open__course__stages__info__text__part__title}>The second stage:</span>
                                        &nbsp;you will begin full-scale development of javascript.
                                        Learn all the necessary algorithms and data structures.
                                    </div>
                                    <div className={styles.open__course__stages__info__text__part} onClick={() => { setNumberButton(33) }}>
                                        <span className={styles.open__course__stages__info__text__part__title}>The third stage (main):</span>
                                        &nbsp;you will learn the main concepts of React. Within 8 months,
                                        you will make 5 control projects, after which you will write your graduation project.
                                    </div>
                                    <div className={styles.open__course__stages__info__text__part} onClick={() => { setNumberButton(34) }}>
                                        <span className={styles.open__course__stages__info__text__part__title}>The fourth stage:</span>
                                        &nbsp;graduation project and employment.
                                    </div>
                                </div>

                            </div>
                            <div className={stagesActive && numberButton == 2 || numberButton == 2 || numberButton == -3 ? styles.open__course__stages__info__buttons : styles.open__course__stages__info__buttons__disamination}>
                                <div onClick={() => { setStagesActive(false); setNumberButton(-2) }}> Go back to the description </div>
                                <div onClick={() => { setNumberButton(100) }}> How will the training take place 111</div>
                            </div>
                            <div className={numberButton >= 31 && numberButton <= 34 ? styles.open__course__stages__info__buttons : styles.open__course__stages__info__buttons__disamination}>
                                <div onClick={() => { setNumberButton(-24) }}> Go back to the description </div>
                                <div>
                                    <div onClick={() => { setNumberButton(-3) }}> Go back to viewing all stages </div>
                                    <div onClick={() => { setNumberButton(100) }}> How will the training take place </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OpenCourseInIntrodues;