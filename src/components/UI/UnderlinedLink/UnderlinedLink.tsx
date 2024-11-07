import {FC, ReactNode} from 'react'
import styles from './UnderlinedLink.module.css'

interface IUnderlinedLink{
    children: ReactNode
    lineColor?:string;
}

const UnderlinedLink: FC<IUnderlinedLink> = ({children, lineColor='', ...props}) => {
    
    const lineStyle: any = {
        '--lineColor': lineColor || '#009aad', 
    }

    return (
        <a className={styles.underlined_link} {...props} style={lineStyle}>{children} </a>
    )
}

export default UnderlinedLink