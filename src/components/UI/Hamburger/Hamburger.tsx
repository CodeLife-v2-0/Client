import {CSSProperties, FC, HTMLAttributes} from 'react'
import styles from './Hamburger.module.css'

interface IHamburger extends HTMLAttributes<HTMLDivElement>{
    width: string;
    height: string;
    lineStyles?: CSSProperties;
}

const Hamburger: FC<IHamburger> = ({width, height, lineStyles={}, ...props}) => {
    return (
        <div className={styles.wrapper} style={{width, height}} {...props}>
            <div className={styles.line} style={lineStyles}/>
            <div className={styles.line} style={lineStyles}/>
            <div className={styles.line} style={lineStyles}/>
        </div>
    )
}

export default Hamburger