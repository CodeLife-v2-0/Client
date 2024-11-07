import { CSSProperties, FC } from 'react'
import styles from './CompanyLogo.module.css'
import { EventAB } from '../../../utils/animatedBacground';

interface ICompanyLogo {
    identificator?: string;
    style?: CSSProperties;
    linkToStart?: (event: EventAB) => void;
    mouseEnterAction?: () => void;
    mouseLeaveAction?: () => void;
    clickAction?: () => void;
}

const CompanyLogo: FC<ICompanyLogo> = ({
    identificator,
    style,
    mouseEnterAction,
    mouseLeaveAction,
    clickAction,
    linkToStart
}) => {
    return (
        <div
            id={identificator}
            className={`${styles.company_logo} ${styles.flicker_light}`}
            style={style}
            onMouseEnter={mouseEnterAction}
            onMouseLeave={mouseLeaveAction}
            onClick={
                (e) => {
                    if (clickAction) clickAction();
                    if (linkToStart) linkToStart(e)
                }}
        >
            CL
        </div>
    )
}

export default CompanyLogo