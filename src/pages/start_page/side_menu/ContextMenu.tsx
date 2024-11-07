import { FC, Dispatch, SetStateAction, CSSProperties } from 'react'
import styles from './ContextMenu.module.css'
import CompanyTitle from '../../../components/Decorations/CL_title/CompanyTitle'
import BallIndicator from '../../../components/Decorations/BallIndicator/BallIndicator'
import { motion } from "framer-motion";

interface IMenuPointItem {
    id: number;
    title: string;
    scrollValue: number;
}

interface IContextMenu {
    selectColor: string;
    menuPointsData: IMenuPointItem[];
}

const ContextMenu: FC<IContextMenu> = ({
    selectColor,
    menuPointsData
}) => {
    const menuPointStyle = { '--menu-point-color': selectColor }
    const ballIndicatorStyle = {
        width: '10px',
        height: '10px',
        left: '10%',
        backgroundColor: selectColor,
    }

    function scrollToMain(Value: number) {
        window.scrollTo({
            top: Value,
            behavior: 'smooth'
        });
    }

    const menuPoints = menuPointsData.map((menuPoint) => {
        return <div
            key={`menu-point-link${menuPoint.id}`}
            className={styles.menu_point}
            style={menuPointStyle as CSSProperties}
            onClick={() => { scrollToMain(menuPoint.scrollValue) }}
        >
            {menuPoint.title}
        </div>
    })

    return (
        <motion.div
            className={styles.wrapper}
            style={{ color: selectColor }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{
                delay: 0.5,
                duration: 0.5,
                repeat: 0,
            }}
        >
            <CompanyTitle
                textStyle={{ textShadow: `0 0 40px ${selectColor}` }}
                wrapperStyle={{ marginBottom: '3vh' }}
            />
            <BallIndicator
                style={ballIndicatorStyle}
                limits={{ start: 26, end: 84 }}
            />
            {menuPoints}
        </motion.div>
    )
}

export default ContextMenu