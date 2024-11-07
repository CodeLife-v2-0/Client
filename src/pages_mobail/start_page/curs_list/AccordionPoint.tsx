import { FC, useState, ReactNode, useRef, RefObject } from 'react'
import styles from './AccordionPoint.module.css'
import { motion, AnimatePresence } from 'framer-motion'

interface IAccordionPoint {
    title: string;
    children: ReactNode;
    modalRef: RefObject<HTMLDivElement>
}

const AccordionPoint: FC<IAccordionPoint> = ({ children, title, modalRef }) => {

    const [isVisible, setVisible] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setTimeout(() => {
            if (!isVisible && modalRef.current && titleRef.current) {
                const modalElement = modalRef.current;
                const titleElement = titleRef.current;
                const offsetTop = titleElement.offsetTop;

                modalElement.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        }, 500);
        setVisible(!isVisible);
    }

    return (
        <>
            <div className={styles.title} ref={titleRef}>
                <span
                    className={`${styles.arrow} ${isVisible ? styles.expanded : ''}`}
                    onClick={handleClick}
                />
                <span onClick={handleClick}>
                    {title}
                </span>
            </div>
            <AnimatePresence>
                {isVisible && <motion.div
                    className={styles.body}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {children}
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export default AccordionPoint