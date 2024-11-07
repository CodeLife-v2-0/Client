import { CSSProperties, FC, useContext, useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import styles from './TopMenu.module.css'
import { Context } from '../../..';
import generateFunctionTransfer, { EventAB } from '../../../utils/animatedBacground'
import { observer } from 'mobx-react-lite'
import Cl_logo_New from '../../Decorations/Cl_logo_New/Cl_logo_New';


interface ITopMemu {
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    setActiveContentCategory: Dispatch<SetStateAction<number>>
}

const logoStyleClicked: CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
}



const TopMenu: FC<ITopMemu> = ({ mode, setMode, setActiveContentCategory }) => {

    const { store } = useContext(Context);
    const [isActive, setActive] = useState<boolean>(false);

    const history: NavigateFunction = useNavigate();
    const [startLink, loginLink]: ((event: EventAB) => void)[] = generateFunctionTransfer(history, ["/", "/authorization"]);

    const handleLogout = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTimeout(() => store.logout(), 1500);
        startLink(e);
    };

    const switchActiveMode = () => {
        setActiveContentCategory(mode === 'user' ? 11 : 0)
        setMode(mode === 'user' ? store.user.role : 'user')
    }

    return (
        <div className={styles.header_menu}>
            <div
                className={styles.new__logo__style}
            >
                <Cl_logo_New
                    onClickstyle={logoStyleClicked}
                    clickAction={switchActiveMode}
                />
            </div>
            <div
                className={styles.header_right}
                style={{ marginRight: isActive ? '3.90625vw' : '' }}
            >
                <div
                    className={styles.translate__Block}
                    style={{
                        opacity: isActive ? '0' : '1',
                        userSelect: isActive ? 'none' : 'all',
                        '--cursorState': isActive ? 'auto' : 'pointer'
                    } as CSSProperties}
                >
                    RU
                </div>
                <div
                    className={styles.settiggs__Block}
                    style={{
                        opacity: isActive ? '0' : '1',
                        userSelect: isActive ? 'none' : 'all',
                        '--cursorState': isActive ? 'auto' : 'pointer'
                    } as CSSProperties}
                >
                    <svg
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.settings__Block__svg}
                    >
                        <path
                            d="M15 2.5L11.25 6.25H6.25V11.25L2.5 15L6.25 18.75V23.75H11.25L15 27.5L18.75 23.75H23.75V18.75L27.5 15L23.75 11.25V6.25H18.75L15 2.5Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            className={styles.settings__second__form}
                        />
                    </svg>
                </div>
                <div
                    className={styles.accont__Block}
                    onClick={
                        () => { setActive(!isActive) }
                    }
                >
                    <svg
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.account__Block__svg}
                        style={{ fill: isActive ? 'white' : '' }}
                    >
                        <path
                            d="M21.5 7.5C21.5 11.0915 18.5915 14 15 14C11.4085 14 8.5 11.0915 8.5 7.5C8.5 3.90853 11.4085 1 15 1C18.5915 1 21.5 3.90853 21.5 7.5ZM1 26.25C1 25.3704 1.43268 24.5259 2.31797 23.7089C3.21006 22.8855 4.49345 22.1593 5.99453 21.558C8.99829 20.3547 12.6219 19.75 15 19.75C17.3781 19.75 21.0017 20.3547 24.0055 21.558C25.5066 22.1593 26.7899 22.8855 27.682 23.7089C28.5673 24.5259 29 25.3704 29 26.25V29H1V26.25Z"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>
            <AnimatePresence>
                {isActive && <motion.div
                    className={styles.account__main__Menu}
                    initial={{ height: 0 }}
                    animate={{ height: '12.77778vh' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.account__main__Menu__second}>
                        <div
                            onClick={startLink}
                            className={styles.exit__menu__link}
                        >
                            На главную
                        </div>
                        <div
                            onClick={loginLink}
                            className={styles.exit__menu__link}
                        >
                            Смена аккаунта
                        </div>
                        <div
                            onClick={handleLogout}
                            className={styles.exit__menu__link}
                        >
                            Выход
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default observer(TopMenu)