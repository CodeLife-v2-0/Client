
import styles from './CubeAdder.module.css'
import { CSSProperties, FC } from 'react'

interface ICubeAdder {
    wrapperStyle: CSSProperties
}

const CubeAdder: FC<ICubeAdder> = ({
    wrapperStyle
}) => {
    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <div className={styles.innerWraper}>
                <div
                    className={styles.left__cubes}
                />
                <div
                    className={`${styles.left__cubes} ${styles.left__cubes__2}`}
                />
                <div
                    className={`${styles.left__cubes} ${styles.left__cubes__3}`}
                />
                <div
                    className={styles.right__cubecenter}
                />
                <div
                    className={`${styles.right__cubecenter} ${styles.right__cubectop}`}
                />
                <div
                    className={`${styles.right__cubecenter} ${styles.right__cubecbot}`}
                />
            </div>
        </div>
    )
}

export default CubeAdder