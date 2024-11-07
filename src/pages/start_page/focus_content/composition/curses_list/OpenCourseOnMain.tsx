import { FC, MouseEvent, useState, useEffect, useContext } from 'react';
import styles from './OpenCourseOnMain.module.css';
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';
import generateFunctionTransfer, { EventAB } from '../../../../../utils/animatedBacground';
import CircularIndicator from '../../../../../components/Decorations/CircularProgressIndicator/CircularIndicator';
import { ddata } from '../../../../../pages_mobail/start_page/curs_list/CursData';
import { Context } from '../../../../..';
import ProgramDivision from './ProgramDivision'


type Content = {
    title: string;
    text: string;
    logo: string;
}

interface IOpenCourseOnMain {
    courseName?: string;
}

const makeCandidateDivision = (
    candidate: {
        title: string;
        body: string;
        logo: string;
    },
    index: number
) => {
    return (
        <div className={styles.candidateRow} key={`candidate-${candidate.title}`}>
            {index % 2 == 1
                ?
                <>
                    <div>
                        <div>
                            {candidate.title}
                        </div>
                        <div>
                            {candidate.body}
                        </div>
                    </div>
                    <img
                        src={`/img/courses_data/${candidate.logo}.png`}
                        alt={`candidate-${candidate.logo}`}
                        className={styles.candidate__photo}
                    />
                </>
                :
                <>
                    <img
                        src={`/img/courses_data/${candidate.logo}.png`}
                        alt={`candidate-${candidate.logo}`}
                        className={styles.candidate__photo}
                    />
                    <div>
                        <div>
                            {candidate.title}
                        </div>
                        <div>
                            {candidate.body}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
const makeResultDivision = (oneResult: Content, index: number) => {
    return (
        <div className={styles.candidateRow} key={`candidate-${oneResult.title}`}>
            {index % 2 == 1
                ?
                <>
                    <div>
                        <div>
                            {oneResult.title}
                        </div>
                        <div>
                            {oneResult.text}
                        </div>
                    </div>
                    <img
                        src={`/img/courses_data/${oneResult.logo}.png`}
                        alt={`candidate-${oneResult.logo}`}
                        className={styles.candidate__photo}
                    />
                </>
                :
                <>
                    <img
                        src={`/img/courses_data/${oneResult.logo}.png`}
                        alt={`candidate-${oneResult.logo}`}
                        className={styles.candidate__photo}
                    />
                    <div>
                        <div>
                            {oneResult.title}
                        </div>
                        <div>
                            {oneResult.text}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

const OpenCourseOnMain: FC<IOpenCourseOnMain> = ({ }) => {
    const history: NavigateFunction = useNavigate();
    const {scrollValue} = useParams();
    const { store } = useContext(Context);
    const home: ((event: EventAB) => void)[] = generateFunctionTransfer(history, [`/${scrollValue}`]);
    const [newSkillsData, setNewSkillsData] = useState<{ title: string, body: string }[][]>([]);
    const programDivision = <ProgramDivision programPoint={ddata.programDara} />;

    useEffect(() => {
        let SkillsRow = [];
        const SkillsData = [];
        for (let skill of ddata.newSkills) {
            SkillsRow.push(skill);
            if (!(SkillsRow.length % 2)) {
                SkillsData.push([...SkillsRow])
                SkillsRow = [];
            }
        }
        setNewSkillsData(SkillsData);
    }, [store.isEng, ddata.newSkills])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    })

    const skillsContent = (newSkillsData.length !== 0) && newSkillsData.map((
        skillsRow, index1) => <div className={styles.skills__row}>
            {skillsRow.map(
                (skill, index2) =>
                    <div className={styles.skill}>
                        <div className={styles.count__skill__wrapper}><div className={styles.count__skill}>0{index1 * 2 + index2 + 1}</div></div>
                        <div className={styles.skill__title}>{skill.title}</div>
                        <div className={styles.skill__body}>{skill.body}</div>
                    </div>
            )}
        </div>
    )

    const goHome = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        home[0](e);
    }
    const { courseName } = useParams<{ courseName: string }>();
    console.log(courseName);
    const profPrices = [
        { price: 'от  1000$', prof: 'Junier разработчик' },
        { price: 'от  2000$', prof: 'Middle разработчик' },
        { price: 'от  5000$', prof: 'Senior разработчик' },
    ];

    const proffesionPrices =
        profPrices.map((prof) =>
            <div className={styles.one__prof__block}>
                <div className={styles.one__prof__block__price}>{prof.price}</div>
                <div className={styles.one__prof__block__prof}>{prof.prof}</div>
            </div>
        );
    const courseMenuPoints =
        <div className={styles.open__course__menu}>
            <div className={styles.course__menu__point}>Чему вы научитесь</div>
            <div className={styles.course__menu__point} style={{ borderLeft: '1px solid black', borderRight: '1px solid black' }}>Для кого курс</div>
            <div className={styles.course__menu__point} style={{ borderRight: '1px solid black' }}>Программа курса</div>
            <div className={styles.course__menu__point}>Что-то еще</div>
        </div>;

    const candidateContent = ddata.candidateData.map(
        (candidate, index) => makeCandidateDivision(candidate, index)
    )
    const content = ddata.resultData.map(element => element.content);
    const resultContent = content[0].map((oneResult, index) => makeResultDivision(oneResult, index))
    return (
        <div className={styles.main__wrapper}>
            <div className={styles.all__content}>
                {courseMenuPoints}
                <div className={styles.hello__block}>
                    <div className={styles.course__main__info}>
                        <div className={styles.course__name}>
                            React<br />Библиотека по JavaScript
                        </div>
                        <div className={styles.course__main__description}>
                            За 3 месяца вы освоите библиотеку React во фронт-енд разработке:
                            научитесь создавать функциональные компоненты, использовать хуки,
                            создавать красивые анимации. Учутшите свои навыки верстки и поймете, как пишутся 90% сайтов в мире!
                        </div>
                        <div className={styles.stats}>
                            {[
                                { title: 'Рейтинг', barText: '4.7', value: 94 },
                                { title: 'Популярность', barText: '90%', value: 90 },
                                { title: 'Сложность', barText: '4.8', value: 96 }
                            ].map(
                                (dataIndicator) => {
                                    return <div className={styles.indicator_container} key={`indicator-${dataIndicator.title}`}>
                                        <div className={styles.indicator_name}>
                                            {dataIndicator.title}
                                        </div>
                                        <div className={styles.indicator}>
                                            <CircularIndicator value={dataIndicator.value} title={dataIndicator.barText} />
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className={styles.sign__up__course}>
                            Записаться
                        </div>
                    </div>
                    <div className={styles.photo__block}>
                        Тут будет фото
                    </div>
                </div>
                <div className={styles.profession__price__block}>
                    {proffesionPrices}
                </div>
                <div className={styles.general__information}>
                    <div className={styles.general__information__title}>Общая информация</div>
                    <div className={styles.general__information__body}>React - это мощная и популярная библиотека JavaScript для
                        разработки пользовательских интерфейсов. Она позволяет создавать масштабируемые и переиспользуемые компоненты,
                        которые обеспечивают динамичное и эффективное отображение данных. React использует виртуальный DOM и умный механизм
                        обновления, что делает приложения быстрыми и отзывчивыми. Благодаря своей гибкости и разнообразным инструментам,
                        React стал незаменимым инструментом для разработки современных веб-приложений.
                    </div>
                </div>
                <div className={styles.who__can__study__block}>
                    <div className={styles.who__can__study__block__title}>
                        Кому подойдет курс
                    </div>
                    {candidateContent}
                </div>
                <div className={styles.new__skills__block}>
                    <div className={styles.new__skills__block__title}>
                        Чему вы научитесь
                    </div>
                    {skillsContent}
                </div>
                <div className={styles.program__course__title__wrapper}>
                    <div className={styles.program__course__block__title}>
                        Программа курса
                    </div>
                </div>
                <div className={styles.program__course__block__body}>
                    {programDivision}
                </div>
                <div className={styles.what__you__take__block}>
                    <div className={styles.what__you__take__block__title}>
                        Что вы получите
                    </div>
                    <div className={styles.what__you__take__block__body}>
                        {resultContent}
                    </div>
                </div>
                <div className={styles.buttons__block}>
                    <div className={styles.go__on__main} onClick={(e) => { goHome(e) }}>
                        На главную
                    </div>
                    <div className={styles.enter__course} onClick={()=>{}}>
                        Записаться на курс
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OpenCourseOnMain;