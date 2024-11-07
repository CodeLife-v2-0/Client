import { useState, CSSProperties, FC, ChangeEvent, Dispatch, SetStateAction, memo, useCallback, HTMLAttributes } from 'react';
import styles from './InputPlaceholder.module.css';

interface IInputPlaceholder {
  textState: [string, Dispatch<SetStateAction<string>>];
  wrapperStyleClass?: string;
  inputType?: string;
  placeholderStyle?: CSSProperties;
  placeholderText: string;
  extraPlaceholder: [string, Dispatch<SetStateAction<string>>];
  fontSizePlaceholder: string;
  placeholderActiveStyle?: CSSProperties;
  onlyLetters?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
}

const InputPlaceholder: FC<IInputPlaceholder> = memo(({
  textState,
  wrapperStyleClass,
  inputType,
  placeholderStyle,
  placeholderText,
  extraPlaceholder,
  fontSizePlaceholder,
  placeholderActiveStyle,
  onlyLetters = false,
  inputMode = 'text'
}) => {
  const [text, setText] = textState;
  const [isVisiblePlaceholder, setVisiblePlaceholder] = useState(false);

  const handleFocus = useCallback(() => {
    extraPlaceholder[1]('');
    setVisiblePlaceholder(true);
  }, [extraPlaceholder]);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setVisiblePlaceholder(false);
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!onlyLetters) {
      setText(inputValue);
    }else{
      if(/^[A-Za-zА-Яа-я]+$/.test(inputValue) || !inputValue){
        setText( inputValue.charAt(0).toUpperCase() + inputValue.slice(1) );
      }
    }
    extraPlaceholder[1]('');
  }, [setText, extraPlaceholder]);
  return (
    <div className={`${styles.input_container} ${wrapperStyleClass}`} style={{ fontSize: fontSizePlaceholder }}>
      <input
        autoComplete="new-password"
        type={inputType || "text"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={extraPlaceholder[0] ? '' : text}
        onChange={handleChange}
        inputMode={inputMode}
      />
      <label
        className={isVisiblePlaceholder && !extraPlaceholder[0] ? styles.active : ''}
        style={{
          ...placeholderStyle,
          ...(isVisiblePlaceholder ? placeholderActiveStyle : {})
        }}
      >
        {extraPlaceholder[0] || placeholderText}
      </label>
    </div>
  );
});

export default InputPlaceholder;
