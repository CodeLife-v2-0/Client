import { FC, Fragment } from 'react'
import styles from './InfoPanel.module.css'
import { motion } from "framer-motion";

interface IInfoPanel {
    data: string[];
    SpecialPos?: number;
    firstTime: boolean;
}

const InfoPanel: FC<IInfoPanel> = ({
    data,
    SpecialPos,
    firstTime
}) => {
    const TextContentPanel = data.map((element, index) => {
        if (firstTime) {
            if (index === SpecialPos) {
                return (
                    <Fragment key={`info-panel-string-${index}`}>
                        <motion.span
                            animate={{ x: 0, opacity: 1 }}
                            initial={{ x: -100, opacity: 0 }}
                            transition={{
                                delay: 1 + index,
                                duration: 1,
                                repeat: 0,
                            }}
                        >
                            <img
                                src="img/start_page/check_mark.png"
                                alt="check_mark"
                                className={styles.check_mark}
                            />
                            {element}
                        </motion.span>
                        <motion.span
                            className={styles.special}
                            animate={{ width: "36%" }}
                            initial={{ width: "0%" }}
                            transition={{
                                duration: 1,
                                delay: 2 + index,
                            }}
                        />
                    </Fragment>
                )
            } else {
                return (
                    <motion.span
                        key={`info-panel-string-${index}`}
                        animate={{ x: 0, opacity: 1 }}
                        initial={{ x: -100, opacity: 0 }}
                        transition={{
                            delay: 1 + index,
                            duration: 1,
                            repeat: 0,
                        }}
                    >
                        <img
                            src="img/start_page/check_mark.png"
                            alt="check_mark"
                            className={styles.check_mark}
                        />
                        {element}
                    </motion.span>
                )
            }
        } else {
            if (index === SpecialPos) {
                return (
                    <Fragment key={`info-panel-string-${index}`}>
                        <span>
                            <img
                                src="img/start_page/check_mark.png"
                                alt="check_mark"
                                className={styles.check_mark}
                            />
                            {element}
                        </span>
                        <span
                            className={styles.special}
                        />
                    </Fragment>
                )
            } else {
                return (
                    <span
                        key={`info-panel-string-${index}`}
                    >
                        <img
                            src="img/start_page/check_mark.png"
                            alt="check_mark"
                            className={styles.check_mark}
                        />
                        {element}
                    </span>
                )
            }
        }
    })
    return (
        <div className={styles.wrapper}>
            {TextContentPanel}
        </div>
    )
}

export default InfoPanel
