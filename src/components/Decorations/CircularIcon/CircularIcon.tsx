import {FC} from 'react'
import styles from './CircularIcon.module.css'

interface ICircularIcon extends React.HTMLProps<HTMLImageElement> {
    imgSrc: string;
}

const CircularIcon: FC<ICircularIcon> = ({ imgSrc, ...props }) => {
    return (
        <img
            className={styles.icon}
            {...props}
            src={`/img/logos_social_networks/${imgSrc}.png`} alt={`logo_${imgSrc}`}
        />
    )
}

export default CircularIcon