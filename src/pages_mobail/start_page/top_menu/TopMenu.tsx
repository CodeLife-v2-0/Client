import { FC, useState, useContext } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import styles from './TopMenu.module.css'
import Hamburger from '../../../components/UI/Hamburger/Hamburger'
import AsideMenu from '../aside_menu/AsideMenu'
import generateFunctionTransfer from '../../../utils/animatedBacground'
import { Context } from '../../..';
import { startPage } from '../../../localizationData';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';


const TopMenu: FC = () => {
    const { store } = useContext(Context);
    const history: NavigateFunction = useNavigate();
    const [authLink, paLink] = generateFunctionTransfer(history, ["authorization", "personal_account"]);
    const [isVisibleAsideMenu, setVisibleAsideMenu] = useState(false);
    return (
        <div className={styles.ouner_wrapper}>
            {isVisibleAsideMenu && <AsideMenu setActive={setVisibleAsideMenu} />}
            <section className={styles.wrapper}>
                <motion.div
                    className={styles.company_title}
                    initial={{ x: '-150%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Code Life
                </motion.div>
                <motion.div
                    className={styles.right_component}
                    initial={{ x: '150%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1  }}
                    transition={{ duration: 1 }}
                >
                    <div className={styles.login_link} onClick={store.isAuth ? paLink : authLink}>
                        {store.isAuth ? store.user.name : (startPage.login[store.isEng])}
                    </div>
                    <Hamburger width='6.67vw' height="calc(var(--vh, 1vh) * 2.38)" onClick={
                        (e) => {
                            e.preventDefault();
                            setVisibleAsideMenu(true)
                        }
                    } />
                </motion.div>
            </section>
        </div>
    )
}

export default observer(TopMenu)