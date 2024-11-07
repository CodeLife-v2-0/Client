import { FC, useState, useContext, ReactNode,useEffect } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import styles from './TopMenu.module.css'
import Hamburger from '../../../components/UI/Hamburger/Hamburger'
import generateFunctionTransfer from '../../../utils/animatedBacground'
import { Context } from '../../..';
import { startPage } from '../../../localizationData';
import { observer } from 'mobx-react-lite';
import CompanyLogo from '../../../components/Decorations/CL_logo/CompanyLogo';
import PrivateImage from '../../../components/PA/PrivateImage/PrivateImage';

const logoStyle = {
    width: '15%',
    borderRadius: '12px',
    borderWidth: '2px',
    fontSize: '4vh',
    borderColor: 'white',
    color: 'white',
    lineHeight: '5vh',
    marginLeft: '0.5em',
}

interface ITopMenuPAMobile{
    avatarUrl: string
}

const TopMenu: FC<ITopMenuPAMobile> = ({ avatarUrl }) => {
    const { store } = useContext(Context);
    const [avatar, setAvatar] = useState<ReactNode | null>(null);
    const history: NavigateFunction = useNavigate();
    const [authLink, paLink] = generateFunctionTransfer(history, ["authorization", "personal_account"]);
    const [isVisibleAsideMenu, setVisibleAsideMenu] = useState(false);

    useEffect(() => {
        setAvatar(<PrivateImage imageName={avatarUrl} />)
      }, [avatarUrl])

    return (
        <div className={styles.ouner_wrapper}>
            <section className={styles.wrapper}>
                <CompanyLogo style={logoStyle}/>
                <div className={styles.avatar}> {avatar} </div>
                <div className={styles.avatar__back1}></div>
                <div className={styles.avatar__back2}></div>
                <div
                    className={styles.right_component}>
                    <Hamburger lineStyles={{backgroundColor: 'white'}} width='6.67vw' height="calc(var(--vh, 1vh) * 2.38)" onClick={
                        (e) => {
                            e.preventDefault();
                            setVisibleAsideMenu(true)
                        }
                    } />
                </div>
            </section>
        </div>
    )
}

export default observer(TopMenu)