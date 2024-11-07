import { useState, useEffect, useContext, Dispatch, SetStateAction, FC, CSSProperties, useRef } from 'react';
import styles from './Dropdown.module.css';
import { Context } from '../../..';
import { ActivitiesData } from '../../../localizationData';
import { motion } from 'framer-motion'

const {
  dialogWindowContent,
  correctInput
} = ActivitiesData;


const wrapperStyle: CSSProperties = {
  borderRadius: 'min(0.52083vw, 0.92593vh) min(0.52083vw, 0.92593vh) 0 0',
  backgroundColor: '#000',
  cursor: 'default',
  borderBottom: 'none'
}

interface DropdownProps {
  elements: string[];
  title: string;
  setHint: Dispatch<SetStateAction<string>>
  signature: number;
  inputState: [string, Dispatch<SetStateAction<string>>];
  checkState: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
}

const Dropdown: FC<DropdownProps> = ({ elements, title, setHint, signature, inputState, checkState, setTitle }) => {
  const [inputValue, setInputValue] = inputState;
  const [hasFocus, setFocus] = useState(false);
  const targerDiv = useRef<HTMLDivElement>(null);
  const dropdawnItemsDiv = useRef<HTMLDivElement>(null);
  const { store } = useContext(Context);

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
    <>
      <div
        ref={targerDiv}
        className={styles.dropdown}
        onClick={() => {
          setHint(dialogWindowContent[signature].example[store.isEng]);
          setTitle(title);
          setFocus(!hasFocus);
        }}
        style={hasFocus ? wrapperStyle : {}}
      >
        <div
          className={styles.titleBlock}
        >
          {inputValue ? inputValue : title}
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
              elements.map((item, index) => (
                item !== inputValue && <div
                  key={index}
                  className={styles.dropdownMenuItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocus(false);
                    checkState(true);
                    setHint(correctInput[store.isEng]);
                    setInputValue(item);
                  }}
                >
                  {item}
                </div>
              ))}
          </motion.div>
        )}

      </div >
      <div className={styles.invisibleBlock} />
    </>
  );
};

export default Dropdown;
