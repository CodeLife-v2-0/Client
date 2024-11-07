import { FC, useRef, useState, useContext, Dispatch, SetStateAction, MouseEvent } from 'react';
import styles from './MainDivision.module.css'
import { mainDivisionData } from '../../../localizationData';
import { Context } from '../../..';

interface IMsgMenu {
    setMessege: Dispatch<SetStateAction<number>>
}
const MsgMenu: FC<IMsgMenu> = ({ setMessege }) => {

    const menuRef = useRef<null | HTMLDivElement>(null);
    const { store } = useContext(Context);
    const arrbot = styles.arrow + ' ' + styles.arrow_bottom;
    const [msgMenuActive, setMsgMenuActive] = useState(false);
    const [menuPoint, setMenuPoint] = useState(0);
    const activeRef = useRef<boolean>(false);

    const changePoint = (index: number, e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        console.log('index = ' + index)
        setMenuPoint(index)
        setMsgMenuActive(false)
        activeRef.current = false;
        setMessege(index)
        if (menuRef.current) {
            menuRef.current.style.opacity = '0';
            menuRef.current.style.height = '0';
            setTimeout(() => { if (menuRef.current) menuRef.current.style.display = 'none' }, 500);
        }
    }
    const openMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setMsgMenuActive(!msgMenuActive)
        activeRef.current = !activeRef.current
        if (menuRef.current && activeRef.current) {
            setTimeout(() => {
                if (menuRef.current) {
                    menuRef.current.style.opacity = '1';
                    menuRef.current.style.height = '20%';
                }
            }, 10)
            menuRef.current.style.display = 'block';
        } else if (menuRef.current && !activeRef.current) {
            menuRef.current.style.opacity = '0';
            menuRef.current.style.height = '0';
            setTimeout(() => { if (menuRef.current) menuRef.current.style.display = 'none' }, 500);
        }
    }

    return (
        <>
            <div className={styles.chat__title} onClick={openMenu}>
                <div className={styles.title__text}>{mainDivisionData.mesTitle[menuPoint][store.isEng]}</div>
                <div className={arrbot}
                    style={{
                        transform: msgMenuActive ? 'rotate(-225deg)' : 'rotate(-135deg)',
                        top: msgMenuActive ? '20%' : '30%'
                    }} />
            </div>
            <div className={styles.mes__menu} ref={menuRef}>
                {mainDivisionData.mesTitle.map((title, index) => {
                    if (index !== menuPoint)
                        return <div
                            className={styles.mes__menu__point}
                            onClick={(e) => changePoint(index, e)}
                            key={`msgpoint-${index}-mobile`}>
                            {title[store.isEng]}
                        </div>
                    return null
                }
                )}
            </div>
        </>
    )
}

export default MsgMenu;