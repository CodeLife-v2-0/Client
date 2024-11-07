import { FC, useState, useContext, useMemo, useEffect, useRef } from 'react'
import styles from './CursList.module.css'
import { coursesData } from '../../../pages/start_page/focus_content/composition/curses_list/DataCurse';
import CourseCard from './CourseCard';
import { Context } from '../../..';
import convertStringToLayout from '../../../pages/start_page/focus_content/composition/curses_list/switch_char_leng';
import { ComponentContextType, StartPageContext } from '../StartPageMobile';

const CursList: FC = () => {

    const {dispatchContext } = useContext(StartPageContext) as ComponentContextType;
    const sectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (sectionRef.current) {
            dispatchContext({ type: 'SETUP_START_SHOP', payload: sectionRef.current.offsetTop - window.innerHeight * 0.02 })
        }
    }, [])

    const [queryRequest, setQueryRequest] = useState('');
    const [activeCategory, setActiveCategory] = useState(1);

    const sortedCourses = useMemo(() => {
        const query = queryRequest.toLowerCase();

        var filteredCourses = [...coursesData];
        if (queryRequest) {
            filteredCourses = filteredCourses.filter((course) => {
                const queryField = course.queryField.toLowerCase();
                const description1 = course.description[0].toLowerCase();
                const description2 = course.description[1].toLowerCase();

                const queryFieldSwitchLeng = convertStringToLayout(queryField);
                const description1SwitchLeng = convertStringToLayout(description1);
                const description2SwitchLeng = convertStringToLayout(description2);
                return (
                    queryField.includes(query) ||
                    description1.includes(query) ||
                    description2.includes(query) ||
                    queryFieldSwitchLeng.includes(query) ||
                    description1SwitchLeng.includes(query) ||
                    description2SwitchLeng.includes(query)
                );
            });
        }
        switch (activeCategory) {
            case 1:
                return filteredCourses.sort((a, b) => b.popularity - a.popularity);
            case 2:
                return filteredCourses.sort((a, b) => a.date - b.date);
            case 3:
                return filteredCourses.filter((course) => course.entity === 'profession');
            case 4:
                return filteredCourses.sort((a, b) => b.discount - a.discount);
            default:
                return filteredCourses;
        }
    }, [activeCategory, queryRequest]);



    const amountRowPerPage = 5;
    const amountCoursePerRow = 2;
    const volumeContent = amountRowPerPage * amountCoursePerRow;
    const { store } = useContext(Context);
    const categoriesData = ['Популярное', 'Новинки', 'Профессии', 'Скидки'];
    const categoriesData2 = ['Popular', 'New courses', 'Professions', 'Discounts'];
    const currCategoriesData = !store.isEng ? categoriesData : categoriesData2;
    const placeholderText = !store.isEng ? 'Чему желаете научиться?' : 'What do you want to learn?';
    const totalPages = Math.ceil(sortedCourses.length / volumeContent);
    const [activeCatalogPage, setActiveCatalogPage] = useState(1);
    const coursesSelection = sortedCourses.slice((activeCatalogPage - 1) * volumeContent, activeCatalogPage * volumeContent);
    const amountChar = currCategoriesData.map(word => word.length).reduce((a, b) => a += b);
    const categoriesContent = [];

    for (let categoryNumber in currCategoriesData) {
        const categoryName = currCategoriesData[categoryNumber];
        categoriesContent.push(
            <div
                key={`shop-list-category-${categoryName}`}
                className={styles.category}
                style={{
                    width: 97 * categoryName.length / amountChar + '%',
                    backgroundColor: (activeCategory === (Number(categoryNumber) + 1)) ? '#6981C0' : '#878A92',
                }}
                onClick={() => {
                    setActiveCategory(Number(categoryNumber) + 1)
                }
                }
            >
                {categoryName}
            </div>
        )
    }

    const content = [];
    let row = [];
    for (let course of coursesSelection) {
        row.push(course)
        if (!(row.length % amountCoursePerRow)) {
            content.push(
                <div className={styles.row} key={`course-${course.title[1]}`}>
                    {row.map(
                        (course) => <CourseCard data={course} key={`${course.title[1]}-card`} />
                    )}
                </div>

            );
            row = [];
        }
    }
    if (row.length) {
        content.push(
            <div className={styles.last_row} key='last-course-row'>
                {row.map(
                    (course) => <CourseCard data={course} key={`${course.title[1]}-card`} />
                )}
            </div>
        )
    }
    return (
        <section className={styles.wrapper}>
            <div className={styles.transleteBackground} />
            <div className={styles.content} ref={sectionRef}>

                <div className={styles.finder_block}>
                    <div className={styles.CLogo}>
                        CL
                    </div>
                    <div className={styles.finder}>
                        <img src="img/mobail_logo/start_page/finder_lens.png" alt="finder lens" className={styles.finder_lens} />
                        <input
                            type="text"
                            className={styles.finder_input}
                            placeholder={placeholderText}
                            value={queryRequest}
                            onChange={(e) => setQueryRequest(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.categories}>
                    {categoriesContent}
                </div>

                <div className={styles.courses}>
                    {content}
                </div>
                <div className={styles.container}>
                    {activeCatalogPage === 1
                        ? <span className={styles.pageNumberWrapper}>
                            <span
                                className={styles.pageNumber + ' ' + styles.pageSoloStart}
                                onClick={() => {
                                    if (activeCatalogPage !== totalPages) {
                                        setActiveCatalogPage(activeCatalogPage + 1);
                                    }
                                }}>
                                Далее
                            </span>
                            <div className={styles.arrow1}
                                onClick={() => {
                                    if (activeCatalogPage !== totalPages) {
                                        setActiveCatalogPage(activeCatalogPage + 1);
                                    }
                                }}>
                                <div className={`${styles.line} ${styles.line_one}`}></div>
                                <div className={`${styles.line} ${styles.line_two}`}></div>
                            </div>
                        </span>
                        : activeCatalogPage === totalPages
                            ? <span className={styles.pageNumberWrapper}>
                                <div className={styles.arrow2}
                                    onClick={() => {
                                        if (activeCatalogPage !== 1) {
                                            setActiveCatalogPage(activeCatalogPage - 1);
                                        }
                                    }}>
                                    <div className={`${styles.line} ${styles.line_three}`}></div>
                                    <div className={`${styles.line} ${styles.line_four}`}></div>
                                </div>
                                <span
                                    className={styles.pageNumber + ' ' + styles.pageSoloEnd}
                                    onClick={() => {
                                        if (activeCatalogPage !== 1) {
                                            setActiveCatalogPage(activeCatalogPage - 1);
                                        }
                                    }}>
                                    Назад
                                </span>
                            </span>
                            : <>
                                <span className={styles.pageNumberWrapper}>
                                    <div className={styles.arrow2}
                                        onClick={() => {
                                            if (activeCatalogPage !== 1) {
                                                setActiveCatalogPage(activeCatalogPage - 1);
                                            }
                                        }}>
                                        <div className={`${styles.line} ${styles.line_three}`}></div>
                                        <div className={`${styles.line} ${styles.line_four}`}></div>
                                    </div>
                                    <span
                                        className={styles.pageNumber + ' ' + styles.pageSoloEnd}
                                        onClick={() => {
                                            if (activeCatalogPage !== 1) {
                                                setActiveCatalogPage(activeCatalogPage - 1);
                                            }
                                        }}>
                                        Назад
                                    </span>
                                </span>
                                <span className={styles.pageNumberWrapper}>
                                    <span
                                        className={styles.pageNumber + ' ' + styles.pageSoloStart}
                                        onClick={() => {
                                            if (activeCatalogPage !== totalPages) {
                                                setActiveCatalogPage(activeCatalogPage + 1);
                                            }
                                        }}>
                                        Далее
                                    </span>
                                    <div className={styles.arrow1}
                                        onClick={() => {
                                            if (activeCatalogPage !== totalPages) {
                                                setActiveCatalogPage(activeCatalogPage + 1);
                                            }
                                        }}>
                                        <div className={`${styles.line} ${styles.line_one}`}></div>
                                        <div className={`${styles.line} ${styles.line_two}`}></div>
                                    </div>
                                </span>
                            </>
                    }
                </div>
            </div>
        </section>
    )
}

export default CursList