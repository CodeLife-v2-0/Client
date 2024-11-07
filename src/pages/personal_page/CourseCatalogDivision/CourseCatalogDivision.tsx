import { FC, useContext, useState, useEffect, useRef } from 'react'
import styles from './CourseCatalogDivision.module.css';
import { coursesData } from './../../start_page/focus_content/composition/curses_list/DataCurse';
import { Context } from '../../..';

const categories = [
    'Новинки',
    'Хиты',
    'Профессии',
    'IT',
    'Скидки',
    'Прочее',
    'Дизайн',
    'Языки',
    'Групповые',
    'Индивид',
    'До года',
    'От года',
    'С опытом',
    'Без опыта',
    'Оффлайн',
    'Онлайн',
    'Набор',
    'Бета',
    'Лекции',
    'Практика',
    'Что-то',
    'Ещё',
];

const anotherCategories = [
    'Дизайн',
    'Языки',
    'Групповые',
    'Индивид',
    'До года',
    'От года',
    'С опытом',
    'Без опыта',
    'Оффлайн',
    'Онлайн',
    'Набор',
    'Бета',
    'Лекции',
    'Практика',
    'Что-то',
    'Ещё',
];


const CourseCatalogDivision: FC = () => {

    const { store } = useContext(Context);
    const [activePage, setActivePage] = useState<number>(1);
    const [chousePage, setChousePage] = useState<boolean>(false);
    const [useNavigation, setUseNavigation] = useState<boolean>(false);
    const [hoverSearch, setHoverSearch] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterList, setFilterList] = useState<string[]>([]);
    const [chousenCategories, setChousenCategories] = useState<boolean>(false);
    const [animateCategory, setAnimateCategory] = useState<boolean>(false);
    const [changeListCategories, setChangeListCategories] = useState<boolean>(false);
    const [chouseAnotherCategories, setChouseAnotherCategories] = useState<boolean>(false);

    const changeFilterList = (category: string) => {
        if (category == "Прочее") {
            setChousenCategories(true);
            if (!filterList.includes(category))
                setFilterList([...filterList, category]);
            setTimeout(() => { setAnimateCategory(true) }, 300);
        }
        else if (filterList.includes(category))
            setFilterList(filterList.filter(item => item !== category));
        else
            setFilterList([...filterList, category]);
    }

    const getCategoriseButtons = () => {
        const categotyData = [];
        for (let i = 0; i != 6; ++i) {
            categotyData.push(<div className={styles.CourseCatalogDivisionCategoriesHeaderName}
                onClick={() => { changeFilterList(categories[i]) }}
                style={{
                    color: `${filterList.includes(categories[i]) ? "rgba(43, 43, 43, 1)" : ""}`,
                    backgroundColor: `${filterList.includes(categories[i]) ? "rgba(244, 244, 244, 0.8)" : ""}`,
                    boxShadow: `${categories[i] === "Прочее" && chouseAnotherCategories
                        ? "0px 0px min(3.125vw, 5.55556vh) min(0.52083vw, 0.92593vh) rgba(255, 255, 255, 0.3)"
                        : filterList.includes(categories[i])
                            ? "0px 0px min(3.125vw, 5.55556vh) min(0.52083vw, 0.92593vh) rgba(255, 255, 255, 0.3)" : ""}`,
                    border: `${filterList.includes(categories[i]) ? "none" : ""}`
                }}>
                {categories[i]}
            </div>)
        }
        return categotyData;
    }

    const getAllCetegories = () => {
        const categotyData = [];
        let categoryRow = [];
        for (let i = 0; i !== Math.ceil(categories.length / 6); ++i) {
            categoryRow = [];
            for (let j = 0; j !== 6; ++j) {
                if ((i * 6) + j === categories.length)
                    break;
                categoryRow.push(<div className={styles.CourseCatalogDivisionCategoriesHeaderCell}
                    onClick={() => { changeFilterList(categories[(i * 6) + j]); setChangeListCategories(true); }}
                    style={{
                        color: `${filterList.includes(categories[(i * 6) + j]) ? "rgba(43, 43, 43, 1)" : ""}`,
                        backgroundColor: `${filterList.includes(categories[(i * 6) + j]) ? "rgba(244, 244, 244, 0.8)" : ""}`,
                        boxShadow: `${filterList.includes(categories[(i * 6) + j]) ? "0px 0px min(3.125vw, 5.55556vh) min(0.52083vw, 0.92593vh) rgba(255, 255, 255, 0.3)" : ""}`,
                        border: `${filterList.includes(categories[(i * 6) + j]) ? "none" : ""}`
                    }}>
                    {categories[(i * 6) + j]}
                </div>);
            }
            categotyData.push(<div className={styles.CourseCatalogDivisionCategoriesRow}>
                {categoryRow}
            </div>);
        }
        return categotyData;
    }

    const getFieldChousenPage = () => {
        const countRow = Math.ceil(coursesData.length / 4 / 14);
        const rowsData = []
        for (let i = 0; i != countRow; ++i) {
            rowsData.push(<div className={styles.chouseRow}>
                {getRowChousenPage(i)}
            </div>);
        }
        return rowsData;
    }
    const changeChousenPage = (e: React.MouseEvent<HTMLDivElement>) => {
        setActivePage(Number(e.currentTarget.dataset.page));
    }

    const setChousenPage = (e: React.MouseEvent<HTMLDivElement>) => {
        setActivePage(Number(e.currentTarget.dataset.page));
        setChousePage(false);
    }

    const clickOnNavigate = () => {
        if (chousenCategories) {
            setChousenCategories(!chousenCategories);
            setTimeout(() => setAnimateCategory(false), 300);
            setChangeListCategories(false);
            setChouseAnotherCategories(false);
            setFilterList(filterList.filter(item => item !== "Прочее"));
            for (let item of anotherCategories)
                if (filterList.includes(item))
                    setChouseAnotherCategories(true);
        }
        else {
            if (chousePage) {
                setActivePage(currentPage);
            }
            else {
                setCurrentPage(activePage);
            }
            setChousePage(!chousePage);
        }
    }

    const getRowChousenPage = (numberRow: number) => {
        const rowData = [];
        let i = numberRow * 14 + 1;
        while (i < (numberRow + 1) * 14 + 1 && i <= Math.ceil(coursesData.length / 4)) {
            rowData.push(<div className={styles.chouseCell}
                data-page={i}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => setChousenPage(e)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => changeChousenPage(e)}>
                {i}
            </div>)
            ++i;
        }
        if (i < (numberRow + 1) * 14 + 1) {
            rowData.push(<div className={styles.chouseCell}
                onClick={() => setActivePage(i / 4)}>
                ...
            </div>)
        }
        return rowData;
    }

    const getFontSize = (str: string) => {

        if (str.length >= 20) {
            return ('min(1.30208vw, 2.31481vh)');
        }
        else if (str.length >= 12) {
            return ('min(1.04167vw, 1.85185vh)');
        }
        else {
            return ('min(1.5625vw, 2.77778vh)');
        }

    }

    const getCards = (page: number) => {
        const cardsField = [];
        let cardsRow = [];
        for (let i = 0; i < 4; i++) {
            if (page * 4 - 4 + i === coursesData.length)
                break;
            if (i % 2 == 1) {
                cardsRow.push(<div className={styles.CourseCatalogDivisionContentCell}>
                    <div className={styles.CourseCatalogDivisionContentCellLogo}>
                        <img src={'img/courses_logo/' + coursesData[page * 4 - 4 + i].logo + '.png'}
                            className={styles.CourseCatalogDivisionContentCellLogoPhoto} />
                    </div>
                    <div className={styles.CourseCatalogDivisionContentCellDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quaerat sunt itaque enim sit nesciunt error vero fugit facilis dolorem!
                    </div>
                    <div className={styles.CourseCatalogDivisionContentCellName}
                        style={{ fontSize: getFontSize(coursesData[page * 4 - 4 + i].title[store.isEng]) }}>
                        {coursesData[page * 4 - 4 + i].title[store.isEng]}
                    </div>
                </div>)
                cardsField.push(<div className={styles.CourseCatalogDivisionContentRow}>
                    {cardsRow}
                </div>);
                cardsRow = [];
            } else {
                cardsRow.push(<div className={styles.CourseCatalogDivisionContentCell}>
                    <div className={styles.CourseCatalogDivisionContentCellName}
                        style={{ fontSize: getFontSize(coursesData[page * 4 - 4 + i].title[store.isEng]) }}>
                        {coursesData[page * 4 - 4 + i].title[store.isEng]}
                    </div>
                    <div className={styles.CourseCatalogDivisionContentCellDescription}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, saepe esse aliquam vitae quis nisi repellat doloremque quod placeat iure?
                    </div>
                    <div className={styles.CourseCatalogDivisionContentCellLogo}>
                        <img src={'img/courses_logo/' + coursesData[page * 4 - 4 + i].logo + '.png'}
                            className={styles.CourseCatalogDivisionContentCellLogoPhoto} />
                    </div>
                </div>)
            }
        }
        return cardsField;
    }

    return (
        <div className={styles.CourseCatalogDivisionWrapper}>
            {chousePage &&
                <div className={styles.CourseCatalogDivisionChousePage}>
                    {getFieldChousenPage()}
                </div>}
            <div className={styles.CourseCatalogDivisionHeader}>
                <div className={styles.CourseCatalogDivisionHeaderName}>
                    <div className={styles.main_text}
                        style={{ opacity: `${chousenCategories ? '0' : '1'}` }}>
                        Каталог курсов
                    </div>
                    <div className={chousenCategories ? styles.active : styles.anactive}>
                        Выбор категории
                    </div>
                </div>
                <div className={styles.CourseCatalogDivisionHeaderSearch}
                    style={{ opacity: `${chousenCategories ? '0' : '1'}` }}>
                    <div className={styles.CourseCatalogDivisionHeaderSearchContent}
                        onMouseEnter={() => { setHoverSearch(true) }}
                        onMouseLeave={() => { setHoverSearch(false) }}>
                        <div className={styles.CourseCatalogDivisionHeaderSearchText}>
                            Ищите что-то определенное?
                        </div>
                        <div className={styles.CourseCatalogDivisionHeaderSearchContentSearchImg}>
                            <img src='img/for_courseCatalog/searchDisable.png'
                                style={{
                                    opacity: `${hoverSearch ? "0" : "1"}`,
                                    transition: 'opacity 0.3s ease-in-out'
                                }} />
                            <img src='img/for_courseCatalog/searchActive.png'
                                style={{
                                    opacity: `${hoverSearch ? "1" : "0"}`,
                                    transition: 'opacity 0.3s ease-in-out'
                                }} />
                        </div>
                        <div className={styles.CourseCatalogDivisionPipe} />
                        <div className={styles.CourseCatalogDivisionHeaderSettings}>
                            <img src='img/for_courseCatalog/settings.png' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.CourseCatalogDivisionCategoriesHeader}
                style={{ opacity: `${chousenCategories ? "0" : "1"}` }}>
                {getCategoriseButtons()}
            </div>
            {animateCategory && <div className={styles.CourseCatalogDivisionAllCategories}
                style={{ opacity: `${chousenCategories ? "1" : "0"}` }}>
                {getAllCetegories()}
            </div>}
            <div className={styles.CourseCatalogDivisionContent}
                style={{ opacity: `${chousenCategories ? "0" : "1"}` }}>
                {getCards(activePage)}
            </div>
            <div className={styles.CourseCatalogDivisionNavigationButton}
                onMouseEnter={() => setUseNavigation(true)} onMouseLeave={() => setUseNavigation(false)}
                onClick={() => clickOnNavigate()}>
                <div className={styles.CourseCatalogDivisionNavigationButtonNav}
                    style={{
                        opacity: `${useNavigation && !chousePage && !animateCategory ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "1" : "0"}`
                    }}>
                    Навигация
                </div>
                <div className={styles.CourseCatalogDivisionNavigationButtonNumber}
                    style={{
                        opacity: `${!useNavigation && !chousePage && !animateCategory ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "5" : "0"}`
                    }}>
                    {activePage} из {Math.ceil(coursesData.length / 4)}
                </div>
                <div className={styles.CourseCatalogDivisionNavigationButtonChousePage}
                    style={{
                        opacity: `${chousePage && !useNavigation && !animateCategory ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "5" : "0"}`
                    }}>
                    Навигация
                </div>
                <div className={styles.CourseCatalogDivisionNavigationButtonBack}
                    style={{
                        opacity: `${chousePage && useNavigation && !animateCategory ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "5" : "0"}`
                    }}>
                    Вернуться
                </div>
                <div className={styles.CourseCatalogDivisionNavigationButtonCategoryBack}
                    style={{
                        opacity: `${!chousePage && animateCategory && !changeListCategories ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "5" : "0"}`
                    }}>
                    Назад
                </div>
                <div className={styles.CourseCatalogDivisionNavigationButtonCategoryBack}
                    style={{
                        opacity: `${!chousePage && animateCategory && changeListCategories ? "1" : "0"}`,
                        zIndex: `${useNavigation && !chousePage && !animateCategory ? "5" : "0"}`
                    }}>
                    Сохранить
                </div>
            </div>
        </div>
    )
}

export default CourseCatalogDivision