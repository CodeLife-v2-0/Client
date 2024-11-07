import { useState, FC, Dispatch, SetStateAction, Fragment, MouseEvent } from 'react';
import styles from './HeaderSubmenu.module.css';

interface IHeaderSubmenu {
    data: string[];
    setSortedValue: Dispatch<SetStateAction<number>>;
}

const HeaderSubmenu: FC<IHeaderSubmenu> = ({
    data,
    setSortedValue
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleHover = (event: MouseEvent<HTMLSpanElement>, index: number) => {
        if (activeIndex !== index) {
            const target = event.currentTarget as HTMLSpanElement;
            target.style.setProperty('--hover-width', `${target.offsetWidth}px`);
        }
    };

    const handleClick = (index: number) => {
        setActiveIndex(index);
        setSortedValue(index + 1);
    };

    const subMenuElements = data.map((item, index) => {
        const separator = index !== data.length - 1 ? <span>|</span> : null;
        const isActive = activeIndex === index;

        return (
            <Fragment key={`courses-menu-${index}`}>
                <span
                    key={`Shop-menu-point-${index * 2}`}
                    className={`${styles.text} ${isActive ? styles.active : ''}`}
                    onMouseOver={(event) => handleHover(event, index)}
                    onClick={() => handleClick(index)}
                >
                    {item}
                </span>
                <span key={`courses-menu-${index * 2 + 1}`} className={styles.separation}>
                    {separator}
                </span>
            </Fragment>
        );
    });

    return <div className={styles.wrapper}>{subMenuElements}</div>;
};

export default HeaderSubmenu;
