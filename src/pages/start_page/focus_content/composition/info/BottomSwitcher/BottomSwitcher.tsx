import { FC, Dispatch, SetStateAction } from 'react'
import styles from './BottomSwitcher.module.css'
import { motion } from "framer-motion";

interface IBottomSwitcher {
    CountPos: number;
    ActivePos: number;
    setFocusSlide: Dispatch<SetStateAction<number>>;
    firstTime: boolean;
}

const BottomSwitcher: FC<IBottomSwitcher> = ({ CountPos, ActivePos, setFocusSlide, firstTime }) => {
    const blocks = Array.from({ length: CountPos }, (_, i) => (
        <motion.div
            key={`button-switcher-into-panel-${i}`}
            className={(ActivePos - 1) === i ? styles.active_block : styles.inactive_block}
            animate={{ opacity: 1, y: [20, -10, 5, -2, 0] }}
            initial={{ opacity: 0, y: 0 }}
            transition={{
                delay: 5 + i / 4,
                duration: 1,
                repeat: 0,
            }}
            onClick={() => { setFocusSlide(i + 1); }}
        />
    ));

    return (
        <div className={styles.first_wrapper}>
            {firstTime
                ?
                <>
                    {ActivePos !== 1
                        ? <motion.img
                            src="img/start_page/pointer_before.png"
                            alt="pointer_back"
                            className={styles.pointer}
                            onClick={() => setFocusSlide(--ActivePos)}
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 50 }}
                            transition={{
                                delay: 5,
                                duration: 1,
                                repeat: 0,
                            }}
                        />
                        : <span />
                    }
                    <div className={styles.wrapper}>{blocks}</div>
                    <motion.img
                        src="img/start_page/pointer_next.png"
                        alt="pointer_next"
                        className={styles.pointer}
                        onClick={() => setFocusSlide(++ActivePos)}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        transition={{
                            delay: 5,
                            duration: 1,
                            repeat: 0,
                        }}
                    />
                </>
                :
                <>
                    {ActivePos !== 1
                        ? <img
                            src="img/start_page/pointer_before.png"
                            alt="pointer_back"
                            className={styles.pointer}
                            onClick={() => setFocusSlide(--ActivePos)}
                        />
                        : <span />
                    }
                    <div className={styles.wrapper}>{blocks}</div>
                    <img
                        src="img/start_page/pointer_next.png"
                        alt="pointer_next"
                        className={styles.pointer}
                        onClick={() => setFocusSlide(++ActivePos)}
                    />
                </>
            }
        </div>
    )
};

export default BottomSwitcher;
