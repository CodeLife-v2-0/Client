import { FC, useRef, useEffect } from 'react';
import styles from "./Comments_mobile.module.css";

interface ICommentsMobileOpenFilter {
    niceClose: boolean;
}
const CommentsMobileOpenFilter: FC<ICommentsMobileOpenFilter> = ({ niceClose }) => {

    const openFilterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            if (!niceClose && openFilterRef.current) {
                openFilterRef.current.style.height = '12vh';
                openFilterRef.current.style.paddingBottom = '4%';
                openFilterRef.current.style.paddingTop = '4%';
                openFilterRef.current.style.opacity = '1';
            } else if (niceClose && openFilterRef.current) {
                console.log('We here');
                openFilterRef.current.style.height = '0vh';
                openFilterRef.current.style.paddingBottom = '0%';
                openFilterRef.current.style.paddingTop = '0%';
                openFilterRef.current.style.opacity = '0';
            }
        }, 10);
    })
    return (
        <div className={styles.comments__mobile__open__course__wrapper} ref={openFilterRef}>
            <div className={styles.comments__mobile__open__course__line}>
                <div className={styles.comments__mobile__open__course__category}>Выбранный курс: </div>
                <div className={styles.comments__mobile__open__course__data}> React </div>
            </div>
            <div className={styles.comments__mobile__open__course__line}>
                <div className={styles.comments__mobile__open__course__category}>В приоритете: </div>
                <div className={styles.comments__mobile__open__course__data}> Положительные</div>
            </div>
        </div>
    )
}

export default CommentsMobileOpenFilter;