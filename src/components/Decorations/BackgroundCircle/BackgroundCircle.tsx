import { FC, Dispatch, SetStateAction, MouseEvent, useRef, useState } from 'react';
import styles from './BackgroundCircle.module.css';
import CircleStroke from './CircleStroke';

interface IBackgroundCircle {
    setOpenComments: Dispatch<SetStateAction<boolean>>;
}
const BackgroundCircle: FC<IBackgroundCircle> = ({ setOpenComments }) => {

    const [circleBig, setCircleBig] = useState(false);

    const resizeCircle = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCircleBig(true);
        setTimeout(() => { 
            setOpenComments(true) }, 500);
    }
    return (
        <div className={styles.canvar__circle}>
            <div className={styles.circle}
                onClick={resizeCircle}
                style = {{height: circleBig ? '120vw' : '', width: circleBig ? '120vw' : '', opacity: circleBig ? '0' : '1'}}/>
            <CircleStroke setOpenComments={setOpenComments} setCircleBig={setCircleBig} circleBig={circleBig}/>
        </div>
    )
}

export default BackgroundCircle;