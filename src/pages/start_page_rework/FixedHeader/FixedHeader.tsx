import { FC } from 'react'
import styles from './FixedHeader.module.css'
import ButtonRe from '../../../components/UI/Buttons/ButtonRe/ButtonRe'

const setButtonText = [
    'Курсы',
    'О нас',
    'Отзывы',
    'Контакты',
    'Личный кабинет',
]

const setButtonSVG = [
    'search_button',
    'burger_menu_button',
    'Settings',
]

const FixedHeader: FC = () => {
    const buttonBlock = setButtonText.map(text => <ButtonRe text={text} />)
    const buttonSVGBlock = setButtonSVG.map(path => <ButtonRe svgPath={path} />)
    return (
        <header className={styles.wrapper}>
            <div className={styles.companyBlock}>
                <img src="/svg/iconRe/logoCO.svg" alt="company-logo" />
            </div>
            <div className={styles.buttonBlock}>
                {buttonBlock}
                {buttonSVGBlock}
            </div>
        </header>
    )
}

export default FixedHeader