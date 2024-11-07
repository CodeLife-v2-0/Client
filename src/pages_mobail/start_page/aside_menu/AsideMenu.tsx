import { FC, useRef, useEffect, Dispatch, SetStateAction, TouchEvent, useState, useContext } from 'react'
import styles from './AsideMenu.module.css'
import UnderFinder from './UnderFinder';
import Navigation from './Navigation'
import { Context } from '../../..';
import { startPage } from '../../../localizationData';
import { observer } from 'mobx-react-lite';

interface IAsideMenu {
    setActive: Dispatch<SetStateAction<boolean>>;
}


const AsideMenu: FC<IAsideMenu> = ({ setActive }) => {
    const wrapperRef = useRef<HTMLElement>(null);
    const asideRef = useRef<HTMLElement>(null);
    const finderInput = useRef<HTMLInputElement>(null);
    const {store} = useContext(Context);
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (wrapperRef.current && asideRef.current) {
                wrapperRef.current.style.opacity = '0.3';
                asideRef.current.style.transform = 'translateX(5vw)';
            }
        }, 10);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const hideMenu = () => {
        if (wrapperRef.current && asideRef.current) {
            asideRef.current.style.transform = 'translateX(100vw)';
            wrapperRef.current.style.opacity = '0';
        }
        setTimeout(() => {
            setActive(false);
        }, 500);
    }

    const [moveStartX, setMoveStartX] = useState(0);
    const [moveEndX, setMoveEndX] = useState(0);

    const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
        setMoveEndX(0);
        setMoveStartX(event.changedTouches[0].clientX);
    }

    const swipeThreshold = window.innerWidth / 15;

    const handleSwipe = (event: TouchEvent<HTMLElement>) => {
        setMoveEndX(event.changedTouches[0].clientX);
    };
    
    if (moveEndX && moveStartX && (moveEndX - moveStartX > swipeThreshold)) {
        hideMenu();
    }

    return (
        <>
            <section className={styles.wrapper} ref={wrapperRef} />
            <section
                className={styles.aside_menu_block}
                ref={asideRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleSwipe}
            >
                <div className={styles.menu_header}>
                    <div className={styles.title}>
                        {startPage.aside_menu_title_mobile[store.isEng]}
                    </div>
                    <div className={styles.close} onClick={hideMenu}>
                        ✕
                    </div>
                </div>
                <div className={styles.finder_block}>
                    <div className={styles.finder}>
                        <img
                            className={styles.lens}
                            alt={startPage.searching_art[store.isEng]}
                            src='img/mobail_logo/start_page/finder_lens.png'
                        />
                        <input
                            type="text"
                            className={styles.finder_input}
                            placeholder={startPage.searching_mobile[store.isEng]}
                            ref={finderInput}
                        />
                    </div>
                    <UnderFinder />
                </div>
                <div className={styles.company_title}>
                    Code Life
                </div>
                <Navigation hideMenuFunc={hideMenu} />
                <div className={styles.company_logo}>
                    CL
                </div>
            </section>
        </>
    )
}

export default observer(AsideMenu)