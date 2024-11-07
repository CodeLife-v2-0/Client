import { FC, useState, useContext } from 'react';
import styles from './CourseCard.module.css';
import OpenCourse from './OpenCourse';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

export interface ICourse {
  title: string[];
  description: string[];
  logo: string;
  discount: number;
  queryField: string;
  popularity: number;
  date: number;
  entity: string;
}

const CourseCard: FC<{ data: ICourse }> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [coursesOpened, setCoursesOpened] = useState(false)
  const [isVisibleBack, setVisibleBack] = useState(false);
  const {store} = useContext(Context);
  const handleClick = () => {
    if (isFlipped === isVisibleBack) {
      setIsFlipped(!isFlipped);
      setTimeout(() => setVisibleBack(!isVisibleBack), 300)
    }
  };

  return (
    <>
      {coursesOpened && <OpenCourse data={data} closeFunc={setCoursesOpened} />}
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleClick}>
        <div className={styles.content}>
          <div className={styles.front}>
            {isVisibleBack ? (
              <div className={styles.back}>
                <div className={styles.title} style={{fontSize:`calc(var(--font23px)/${data.title[store.isEng].length <= 12 ? 1 : data.title[store.isEng].length/14})`}}>
                  {data.title[0]}
                </div>
                <button onClick={(e) => {e.stopPropagation(); setCoursesOpened(true)}} >Подробнее</button>
                <button>Попробовать</button>
              </div>
            ) : (
              <img src={`img/courses_logo/${data.logo}.png`} alt="Изображение" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(CourseCard);
