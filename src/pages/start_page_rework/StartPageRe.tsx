import { FC } from 'react'
import styles from './StartPageRe.module.css'
import FixedHeader from './FixedHeader/FixedHeader'
import SvgForMatrix from '../../components/Decorations/SvgForMatrix/SvgForMatrix'
import brain from '../../svgMatrix/brain'


const StartPageRe: FC = () => {
    return (
        <section className={styles.wrapper}>
            <FixedHeader />
            <div style={{top: '20vh', position: 'absolute'}}>
                <SvgForMatrix data={brain} />
            </div>
        </section>
    )
}

export default StartPageRe