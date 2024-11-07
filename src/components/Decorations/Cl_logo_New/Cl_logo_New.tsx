import { FC, CSSProperties, useState } from 'react'
import styles from './Cl_logo_New.module.css'

interface ICl_logo_New {
    onClickstyle?: CSSProperties,
    clickAction?: () => void,
}

const Cl_logo_New: FC<ICl_logo_New> = ({ onClickstyle, clickAction }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    return (
        <div className={styles.main__logo} style={isClicked && onClickstyle ? onClickstyle : {}}>
            <div
                className={styles.main__logo__shadowing}
                onClick={() => { setIsClicked(!isClicked); clickAction && clickAction() }}
            >
                Code Life
            </div>
        </div>
    )
}

export default Cl_logo_New