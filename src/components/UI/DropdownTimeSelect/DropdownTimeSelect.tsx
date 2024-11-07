import { FC, Dispatch, SetStateAction, useState, CSSProperties, useEffect, useRef, useContext } from 'react'
import styles from './DropdownTimeSelect.module.css'
import { motion } from 'framer-motion'
import { formatMinuties } from '../../../utils/getDate';
import { Context } from '../../..';
import { ActivitiesData } from '../../../localizationData'
import { FieldDR } from '../../../pages/personal_page/Admin/Activities/Activities';


const { dialogWindowContent, correctInput } = ActivitiesData;


interface IDropdownTimeSelect {
    inputState: [string, Dispatch<SetStateAction<string>>],
    title: string;
    checkState: Dispatch<SetStateAction<boolean>>;
    setHint: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>
}

const titleFocusedStyle: CSSProperties = {
    backgroundColor: '#000',
    cursor: 'default',
    borderRadius: 'min(0.52083vw, 0.92593vh) min(0.52083vw, 0.92593vh) 0 0',
}

const DropdownTimeSelect: FC<IDropdownTimeSelect> = ({
    inputState,
    title,
    checkState,
    setHint,
    setTitle
}) => {
    const examples = dialogWindowContent[FieldDR.duration].example;
    const titles = dialogWindowContent[FieldDR.duration].title;
    const { store } = useContext(Context);
    const [enteredTime, setEnteredTime] = inputState;
    const [hasFocus, setFocus] = useState(false);
    const targerDiv = useRef<HTMLDivElement>(null);
    const dropdawnItemsDiv = useRef<HTMLDivElement>(null);
    const elements = [30, 40, 45, 60, 90, 120];
    useEffect(() => {
        checkState(enteredTime.length > 0);
        setHint(enteredTime ? correctInput[store.isEng] : examples[store.isEng]);
        setTitle(titles[store.isEng]);
    }, [enteredTime])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(targerDiv.current?.contains(event.target as Node) || dropdawnItemsDiv.current?.contains(event.target as Node))) {
                setFocus(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [targerDiv]);
    return (
        <div className={styles.wrapper} ref={targerDiv}>
            <div
                className={styles.prewie}
                onClick={() => {
                    setFocus(!hasFocus);
                    setHint(examples[store.isEng]);
                    setTitle(titles[store.isEng]);
                }}
                style={
                    hasFocus
                        ? titleFocusedStyle
                        : {}
                }
            >
                {hasFocus
                    ? <>
                        <input type="text"
                            placeholder='0'
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            onChange={(e) => {
                                if (/^$|^\d{1,3}$/.test(e.target.value)) {
                                    setEnteredTime(e.target.value);
                                }
                            }}
                            value={enteredTime}
                        />
                        <p>минут</p>
                    </>
                    : enteredTime ? `${enteredTime} минут` : title
                }
                <img
                    src="/svg/logo/pointer.svg"
                    alt="pointer"
                    className={styles.pointer}
                    style={{ transform: hasFocus ? 'rotate(180deg)' : '' }}
                />
            </div>
            {hasFocus && (
                <motion.div
                    ref={dropdawnItemsDiv}
                    initial={{
                        opacity: 0,
                        maxHeight: '0vh',
                    }}
                    animate={{
                        opacity: 1,
                        maxHeight: hasFocus ? `${elements.length * 6}vh` : '',
                    }}
                    exit={{
                        opacity: 0,
                        maxHeight: '0vh',
                    }}
                    transition={{
                        duration: 0.3
                    }}
                    className={styles.dropdownMenu}
                >
                    {
                        elements.map((item, index) => <div
                            key={index}
                            className={styles.dropdownMenuItem}
                            onClick={(e) => {
                                e.stopPropagation();
                                setFocus(false);
                                setEnteredTime(String(item));
                            }}
                        >
                            {formatMinuties(item, store.isEng)}
                        </div>
                        )
                    }
                </motion.div>
            )}
        </div>
    )
}

export default DropdownTimeSelect