import { FC } from 'react'
import styles from './ButtonRe.module.css'


const ButtonRe: FC<{
    text?: string,
    svgPath?: string,
}> = ({ text, svgPath }) => {
    return (
        <button className={styles.wrapper} style={svgPath ? { padding: '0.3125vw' } : {}}>
            {svgPath ?
                <img src={`/svg/iconRe/${svgPath}.svg`} alt="heder-icon" />
                : text}
        </button>
    )
}

export default ButtonRe