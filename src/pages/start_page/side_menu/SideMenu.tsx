import { useState, FC, Dispatch, SetStateAction, useContext, useEffect } from 'react'
import styles from './SideMenu.module.css'
import CompanyLogo from '../../../components/Decorations/CL_logo/CompanyLogo'
import ContextMenu from './ContextMenu'
import { motion } from "framer-motion";
import { startPage, menuPoints } from '../../../localizationData';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

interface ISideMenu {
    color: string;
    activeState: [boolean, Dispatch<SetStateAction<boolean>>];
    MenuState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const SideMenu: FC<ISideMenu> = ({
    color,
    activeState,
    MenuState,
}) => {
    const { store } = useContext(Context);
    const [activeMode, setActiveMode] = activeState;
    const [stateFocusCL, setStateFocusCL] = useState(false);
    const [isAsideMenuActive, setActiveModeMenu] = MenuState;
    const menuStyleHover =
    {
        '--asideMenuHoverWidth': '31vw',
        '--asideMenuHoverHeight': '100vh'
    }
    const logoStyles = {
        width: activeMode ? '0' : '100%',
        height: activeMode ? '0px' : '9vh',
        fontSize: activeMode ? '0px' : 'max(4.2vw, 20px)',
        color: color,
        border: `${color} ${activeMode ? '0px' : 'calc(0.2vw + 2px)'} solid`,
        transition: 'width 1s ease, height 1s ease, left 1s ease, border 1s ease, box-shadow 1s ease, color 1s ease, font-size 0.5s ease-in-out',
        left: activeMode ? '-5vw' : '0vw',
        display: 'flex',
        cursor: 'pointer',
        '--size-shadow-in': stateFocusCL ? `20px` : `0px`,
        '--size-shadow-out': stateFocusCL ? `0px` : `30px`,
        '--color-shadow': color,
    }

    const menuStyle = {
        color: color,
        height: activeMode
            ? '100vh'
            : isAsideMenuActive
                ? '78.5%'
                : '0%',
        border: isAsideMenuActive
            ? `calc(0.2vw + 2px) solid ${color}`
            : `0px solid ${color}`,
        fontSize: isAsideMenuActive ? 'min(4.5vw, 55px)' : '0px',
        backgroundColor: isAsideMenuActive ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
    }

    const wrapperStyle = activeMode
        ? {
            height: '100vh',
            paddingBottom: '0px',
        }
        : {}

    const windowHeight = window.innerHeight;

    const menuPointsData = [
        { id: 0, title: menuPoints.main[store.isEng], scrollValue: 0 },
        { id: 1, title: menuPoints.about_us[store.isEng], scrollValue: windowHeight },
        { id: 2, title: menuPoints.courses[store.isEng], scrollValue: windowHeight * 2.1 },
        { id: 3, title: menuPoints.reviews[store.isEng], scrollValue: windowHeight * 4 },
        { id: 4, title: menuPoints.questions[store.isEng], scrollValue: windowHeight * 4 },
        { id: 5, title: menuPoints.contacts[store.isEng], scrollValue: windowHeight * 5.1 },
    ]

    return (
        <motion.div
            className={styles.wrapper}
            style={wrapperStyle}
            animate={{ opacity: 1, translateX: "0%" }}
            initial={{ opacity: 0, translateX: "-50%" }}
            transition={{
                duration: 2,
                repeat: 0,
            }}
        >

            <CompanyLogo
                style={logoStyles}
                mouseEnterAction={() => { setStateFocusCL(true) }}
                mouseLeaveAction={() => { setStateFocusCL(false) }}
                clickAction={() => { setActiveModeMenu(!isAsideMenuActive) }}
            />

            <div
                className={styles.AsideMenu}
                style={{ ...menuStyle, ...menuStyleHover }}
                onMouseEnter={() => { setActiveMode(true) }}
                onMouseLeave={() => { setActiveMode(false) }}
            >
                {activeMode && isAsideMenuActive
                    ? <ContextMenu
                        selectColor={color}
                        menuPointsData={menuPointsData}
                    />
                    : startPage.aside_menu_title[store.isEng]
                }
            </div>
        </motion.div>
    )
}

export default observer(SideMenu)