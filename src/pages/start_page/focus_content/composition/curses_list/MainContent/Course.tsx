import { FC, CSSProperties, useContext, Dispatch, SetStateAction, MouseEvent, useState, useEffect } from 'react'
import styles from './Course.module.css'
import { startPage } from '../../../../../../localizationData';
import { ICourseDataItem } from './MainContent';
import { Context } from '../../../../../..';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import generateFunctionTransfer, { EventAB } from '../../../../../../utils/animatedBacground';

interface ICourse {
    data: ICourseDataItem;
    additionalStyle: CSSProperties;
    firstTime: [boolean, Dispatch<SetStateAction<boolean>>],
}

const Course: FC<ICourse> = ({
    data,
    additionalStyle,
    firstTime,
}) => {

    const { store } = useContext(Context);
    const [isFirstTime, setIsFirstTime] = firstTime;
    const [scrollValue, setScrollValue] = useState(0);
    const history: NavigateFunction = useNavigate();
    const detailsLink: ((event: EventAB) => void)[] = generateFunctionTransfer(history, [`/open_course/${data.title[1].toLowerCase()}/${Math.round(scrollValue)}`]);

    const goCourse = (e:MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsFirstTime(false);
        detailsLink[0](e);
    }
    useEffect(()=>{
        window.addEventListener('scroll', ()=>{setScrollValue(window.scrollY)});
        return () => {
            window.removeEventListener('scroll', ()=>{setScrollValue(window.scrollY)});
          };
    },[])
    

    return (
        <div className={styles.wrapper} style={additionalStyle}>
            <div className={styles.logo_block}>
                <img
                    src={`img/courses_logo/${data.logo}.png`}
                    alt={`Логотип ${data.title}`}
                    className={styles.logo_img}
                />
            </div>
            <div className={styles.content_block}>
                <div className={styles.title}>{data.title[store.isEng]}</div>
                <div className={styles.description}>{data.description[store.isEng]}</div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={(e) => {goCourse(e)}}>{startPage.details[store.isEng]}</button>
                    <button className={styles.button}>{startPage.trying[store.isEng]}</button>
                </div>
            </div>
        </div>
    )
}

export default Course