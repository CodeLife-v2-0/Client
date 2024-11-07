import { FC, useState, useEffect, ChangeEvent, useContext, Dispatch, SetStateAction, CSSProperties, useRef, ReactNode } from 'react'
import { IUserR } from '../../../models/IUserR';
import { ICourseR } from '../../../models/Course';
import styles from './DropDownWithImg.module.css'
import PrivateImage from '../../PA/PrivateImage/PrivateImage';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { AvatarList, FieldDR } from '../../../pages/personal_page/Admin/Activities/Activities';
import { dropdownMultiImg } from '../../../localizationData';
import { capitalize, getLocaleVariant } from '../../../utils/stringFunc';
import { motion } from 'framer-motion'

const wrapperStyle: CSSProperties = {
    borderRadius: 'min(0.52083vw, 0.92593vh) min(0.52083vw, 0.92593vh) 0 0',
    backgroundColor: '#000',
    cursor: 'default',
    borderBottom: 'none'
}

const filterList = (elements: IUserR[] | ICourseR[], filter: string, signature: number) => {
    if (signature === FieldDR.lector)
        return (elements as IUserR[]).filter(
            element => {
                const initialSting = `${element.surName} ${element.name}`.toLowerCase();
                return initialSting.includes(filter)
            }
        )
    return (elements as ICourseR[]).filter(
        element => {
            const initialSting = element.name ? element.name.toLowerCase() : '';
            return initialSting.includes(filter)
        }
    )
}

const { lackOptions, correctInput } = dropdownMultiImg;


interface IDropDownWithImg {
    elements: IUserR[] | ICourseR[];
    title: string;
    signature: number;
    setHint: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    example: string;
    inputState: [string, Dispatch<SetStateAction<string>>];
    checkState: Dispatch<SetStateAction<boolean>>;
    textState: [string, Dispatch<SetStateAction<string>>];
    unselectedLogo: string;
    avatar: AvatarList;
}

const DropDownWithImg: FC<IDropDownWithImg> = ({
    elements,
    title,
    signature,
    setHint,
    example,
    inputState,
    checkState,
    textState,
    setTitle,
    unselectedLogo,
    avatar
}) => {
    const [inputValue, setInputValue] = textState; //то что пишется в инпуте
    const [valueState, setState] = inputState; //выбранный айди элемента
    const correctValue = (valueState.includes(';') && signature === FieldDR.participants) ? valueState.split(';')[0] : valueState;
    const [filteredItems, setFilteredItems] = useState<IUserR[] | ICourseR[]>([]);
    const [hasFocus, setFocus] = useState(false);
    const [choice, setChoice] = useState<IUserR | ICourseR | null>(null); //хранит структуру с данными о выбраном преподавателе
    const { store } = useContext(Context);
    const targerDiv = useRef<HTMLDivElement>(null);
    const dropdawnItemsDiv = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setFilteredItems(filterList(elements, '', signature));
        if (correctValue && elements.length) {
            // @ts-ignore
            const result = elements.find((item: ICourseR | IUserR) => item._id === correctValue);
            if (result !== undefined) setChoice(result);
        }
    }, [elements])
    useEffect(() => {
        if (correctValue === '') { //если он удален
            setFilteredItems(filterList(elements, '', signature));
            setChoice(null); //обнулить выбор
            setState('');    // и связанные с ним 
        }
    }, [correctValue])//если был выбран или удален элемент

    useEffect(() => {
        if (signature === FieldDR.participants && inputState[0]) {
            // @ts-ignore
            const selectUser = elements.filter(userEl => userEl._id === inputState[0])
            if (selectUser.length === 1) setChoice(selectUser[0])
        }
    }, [inputState])

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

    useEffect(() => {
        setHint(choice ? correctInput[store.isEng] : example);
        checkState(choice ? true : false)
    }, [choice, correctInput, store.isEng, example, setHint])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        const filtered = filterList(elements, value, signature);
        setFilteredItems(filtered);
    };

    const handleSelection = (selectItem: IUserR | ICourseR) => {
        setState(selectItem._id || "");
        setChoice(selectItem);
        setInputValue('');
        setFilteredItems([]);
    };



    return (
        <>
            <div
                className={styles.dropdown}
                onClick={() => {
                    setHint(choice ? correctInput[store.isEng] : example);
                    setTitle(title);
                    setFocus(!hasFocus)
                }}
                ref={targerDiv}
            >
                <div className={styles.innerWrapper} style={hasFocus ? wrapperStyle : {}}>
                    {hasFocus
                        ? <input
                            type="text"
                            className={styles.input}
                            placeholder={'Поиск'}
                            value={capitalize(inputValue)}
                            onChange={handleInputChange}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}

                            autoComplete="new-password"
                        />
                        : <h1>{choice
                            ? (signature === FieldDR.lector || signature === FieldDR.participants)
                                ? `${(choice as IUserR).surName} ${choice.name}`
                                : getLocaleVariant(choice.name, store.isEng)

                            : title}</h1>
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
                        initial={{
                            opacity: 0,
                            maxHeight: '0vh',
                        }}
                        animate={{
                            opacity: 1,
                            maxHeight: hasFocus ? `16.9vh` : '',
                        }}
                        exit={{
                            opacity: 0,
                            maxHeight: '0vh',
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className={styles.dropdownMenu}
                        ref={dropdawnItemsDiv}
                    >
                        <div className={styles.innerDropDawnMenu}>
                            {(filteredItems.length > 0 && !(filteredItems.length === 1 && filteredItems[0] === choice)) ?
                                filteredItems.map((item, index) => (
                                    choice !== item && <div
                                        key={index}
                                        className={styles.dropdownMenuItem}
                                        style={{
                                            // @ts-ignore
                                            borderRight: (filteredItems.length - Number(choice && filteredItems.includes(choice)) > 3)
                                                ? 'solid #009aad 0.05208vw'
                                                : 'none'
                                        }}
                                        onClick={() => {
                                            handleSelection(item);
                                        }}
                                    >
                                        {(signature === FieldDR.lector || signature === FieldDR.participants)
                                            ? `${(item as IUserR).surName} ${item.name}`
                                            : getLocaleVariant(item.name, store.isEng)
                                        }
                                    </div>
                                ))
                                : <div
                                    className={styles.dropdownMenuItem}
                                    style={{ cursor: 'not-allowed' }}
                                >
                                    {
                                        filteredItems.length === 0
                                            ? lackOptions[store.isEng]
                                            : 'Выбранно сейчас'
                                    }
                                </div>}
                        </div>
                    </motion.div>
                )}
            </div>
            <div className={styles.selectBlock}>
                {choice
                    ? ((signature === FieldDR.lector || signature === FieldDR.participants)
                        ? ((choice as IUserR).avatar && avatar[(choice as IUserR).avatar as string]
                            ? avatar[(choice as IUserR).avatar as string]
                            : <PrivateImage imageName={(choice as IUserR).avatar as string as string}
                            />)
                        : <img
                            src={`svg/nearLessonsIcons/${choice.name?.split(';')[1]}_logo.svg`}
                            alt="select-subject-logo"
                        />)
                    : <img src={`svg/logo/${unselectedLogo}.svg`} alt="unselected" />
                }
            </div>
        </>
    );
};

export default observer(DropDownWithImg);