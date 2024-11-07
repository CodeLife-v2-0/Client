import {useEffect, useRef, FC, Dispatch, SetStateAction, useContext } from 'react';
import styles from './StartLangeSelector.module.css';
import LoginPanel from './LoginPanel';
import { EventAB } from '../../../../../utils/animatedBacground';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../../..';


interface IStartLangeSelector{
    isVisibleMenu: boolean;
    authLink: (event: EventAB) => void;
    selectColor: string;
    stateTopMenu: [boolean, Dispatch<SetStateAction<boolean>>]; 
    maintTextPronted: Dispatch<SetStateAction<boolean>>;
}

const StartLangeSelector: FC<IStartLangeSelector> = ({
    isVisibleMenu,
    authLink,
    selectColor,
    stateTopMenu,
    maintTextPronted
}) => {
    const {store} = useContext(Context);
    const startSwitcher = useRef<HTMLDivElement>(null);
    const totalSwitcher = useRef<HTMLDivElement>(null);
    const [stateTopMenuValue, setStateTopMenuValue] = stateTopMenu;

    const shortLangSelectorStyle = {
        width: '0px',
        opacity: '1',
        fontSize: '0',
        border: '0px solid'
    }

    useEffect(() => {
        const doubleSwitcher = startSwitcher.current!;
        const soloSwitcher = totalSwitcher.current!;
        if (!isVisibleMenu) {
            soloSwitcher.animate(
                [
                    { opacity: 1 },
                    { opacity: 0 },
                ],
                {
                    duration: 500,
                    fill: 'both',
                },
            ).onfinish = () => {
                soloSwitcher.style.display = 'none';
            };
            setTimeout(() => {
                doubleSwitcher.style.display = 'flex';
                doubleSwitcher.animate(
                    [
                        { opacity: 0 },
                        { opacity: 1 },
                    ],
                    {
                        duration: 500,
                        fill: 'both',
                    },
                )
            }, 500);

        } else {
            doubleSwitcher.animate(
                [
                    { opacity: 1 },
                    { opacity: 0 },
                ],
                {
                    duration: 500,
                    fill: 'both',
                },
            ).onfinish = () => {
                doubleSwitcher.style.display = 'none';
            };
            setTimeout(() => {
                soloSwitcher.style.display = 'flex';
                soloSwitcher.animate(
                    [
                        { opacity: 0 },
                        { opacity: 1 },
                    ],
                    {
                        duration: 500,
                        fill: 'both',
                    },
                )
            }, 500);
        }
    }, [isVisibleMenu]);

    const handleClickBottom = () => {
        maintTextPronted(true);
        const startBody = document.getElementsByTagName('body')[0];
        startBody.scrollIntoView({ behavior: 'smooth' });
        setStateTopMenuValue(false);
        store.setLang();
    };


    return (
        <>
            <div
                ref={startSwitcher}
                className={styles.selector_styles}
                style={stateTopMenuValue ? shortLangSelectorStyle : {}}
            >
                <span
                    className={`${styles.lang} ${!store.isEng ? styles.active : styles.anactive}`}
                    onClick={() => store.setLang()}
                    style={stateTopMenuValue ? shortLangSelectorStyle : {}}
                >
                    RU
                </span>
                {' | '}
                <span
                    className={`${styles.lang} ${store.isEng ? styles.active : styles.anactive}`}
                    onClick={() => store.setLang()}
                    style={stateTopMenuValue ? shortLangSelectorStyle : {}}
                >
                    EN
                </span>
            </div>
            <div className={styles.solo_selector_styles} ref={totalSwitcher} style={stateTopMenuValue ? shortLangSelectorStyle : {}}>
                {!store.isEng
                    ? <span className={styles.solo_leng} style={stateTopMenuValue ? shortLangSelectorStyle : {}} onClick={() => handleClickBottom()}>RU</span>
                    : <span className={styles.solo_leng} style={stateTopMenuValue ? shortLangSelectorStyle : {}} onClick={() => handleClickBottom()}>EN</span>
                }
                <LoginPanel
                    authLink={authLink}
                    selectColor={selectColor}
                    stateTopMenuValue={stateTopMenuValue}
                />
            </div>
        </>
    );
};

export default observer(StartLangeSelector);
