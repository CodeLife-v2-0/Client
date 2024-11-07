import { FC } from 'react'
import styles from './IntroPage.module.css'
import NewsSlider from './news_slider/NewsSlider'
import TryButton from './try_button/TryButton'
import GoingDown from './going_down/GoingDown'



const IntroPage: FC = () => {
    return (
        <section className={styles.wrapper}>
            <NewsSlider />
            <TryButton />
            <GoingDown />
        </section>
    )
}

export default IntroPage