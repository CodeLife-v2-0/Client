import { FC, useEffect, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import styles from './BackgroundCircle.module.css';


interface IBackgroundCircle{
    setOpenComments: Dispatch<SetStateAction<boolean>>;
    setCircleBig: Dispatch<SetStateAction<boolean>>;
    circleBig: boolean;
}

const BackgroundCircle: FC<IBackgroundCircle> = ({setOpenComments, setCircleBig, circleBig}) => {

    const strokeInRef = useRef<HTMLDivElement | null>(null);
    const strokeOutRef = useRef<HTMLDivElement | null>(null);

    const resizeCircle = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCircleBig(true);
        setTimeout(() => { setOpenComments(true) }, 400);
    }

    return (<>
        <div className={styles.circle__stroke__in} ref={strokeInRef} onClick={resizeCircle} style={{opacity: circleBig ? '0' : '1'}}/>
        <div className={styles.circle__stroke__out} ref={strokeOutRef} onClick={resizeCircle} style={{opacity: circleBig ? '0' : '1'}}/>
    </>)
}

export default BackgroundCircle;