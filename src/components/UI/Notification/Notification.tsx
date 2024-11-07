import { FC, MouseEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styles from './Notification.module.css'
import { motion } from 'framer-motion';

interface INotification {
    title: string;
    message: string;
    setStateNtf: Dispatch<SetStateAction<string>>;
    deltaX: string;
    deltaY: string;
    mainColor?: string;
}

const Notification: FC<INotification> = ({ title, message, setStateNtf, deltaX, deltaY, mainColor }) => {

    const ntfRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (ntfRef.current) {
            ntfRef.current.focus();
        }
    }, []);

    const closeNotification = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStateNtf('');
    }

    const wrapperStyle = {
        top: deltaY,
        left: 0,
        '--mainColor': mainColor,
    }

    return (
        <motion.div
            className={styles.wrapper}
            style={wrapperStyle}
            initial={{ opacity: 0, x: '0%' }}
            animate={{ opacity: 1, x: deltaX }}
            transition={{ duration: 1 }}
        >
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.message}>
                {message}
            </div>
            <button onClick={closeNotification} onBlur={() => setStateNtf('')} ref={ntfRef}>
                ОК
            </button>
        </motion.div>
    )
}

export default Notification