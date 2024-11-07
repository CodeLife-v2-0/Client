import { useState, FC, Dispatch, SetStateAction } from 'react'
import Intro from './composition/intro/Intro'
import InfoContent from './composition/info/InfoContent'
import styles from './FocusContent.module.css'
import CursesList from './composition/curses_list/CursesList'
import { EventAB } from '../../../utils/animatedBacground'
import Comments from './composition/comments/Comments'

interface IFocusContent {
    color: string;
    activeValue: boolean;
    authLink: (event: EventAB) => void;
    stateTopMenu: [boolean, Dispatch<SetStateAction<boolean>>];
    firstTime: [boolean, Dispatch<SetStateAction<boolean>>];
}

const FocusContent: FC<IFocusContent> = ({
    color,
    activeValue,
    authLink,
    stateTopMenu,
    firstTime,
}) => {

    const [isIntfoVisable, setIsInfroVisable] = useState(false);
    return (
        <section className={styles.wrapper}>
            <Intro
                color={color}
                activeValue={activeValue}
                authLink={authLink}
                activeInfoSection={setIsInfroVisable}
                stateTopMenu={stateTopMenu}
                firstTime={firstTime}
            />
            <InfoContent
                activeValue={activeValue}
                isIntfoVisable={isIntfoVisable}
                firstTime={firstTime[0]}
            />
            <CursesList firstTime={firstTime}
            />
        </section>
    )
}

export default FocusContent