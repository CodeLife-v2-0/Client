import { FC } from 'react'
import styles from './StartPageRe.module.css'
import FixedHeader from './FixedHeader/FixedHeader'

const StartPageRe: FC = () => {
    return (
        <section className={styles.wrapper}>
            <FixedHeader />
        </section>
    )
}

export default StartPageRe