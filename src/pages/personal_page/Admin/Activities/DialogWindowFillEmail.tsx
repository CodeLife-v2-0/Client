import { FC, useState, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import styles from './DialogWindowFillEmail.module.css'
import { defaultPhrase, shortInfo } from './Activities';
import UserRow from '../../../../components/Decorations/UserRow/UserRow';

interface IDialogWindowFillEmail {
  letterTextState: [string, Dispatch<SetStateAction<string>>],
  recipients: shortInfo[];
}

const DialogWindowFillEmail: FC<IDialogWindowFillEmail> = ({ letterTextState, recipients }) => {
  const [letterText, setLetterText] = letterTextState;
  const [areaText, setareaText] = useState(letterText);
  const [isActiveEditMode, setActiveEditMode] = useState(false);
  const [isMissingLeterTitle, setMissingLeterTitle] = useState(false);
  const [isReversAnimationWithLetter, setReversAnimationWithLetter] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [errorStatus, setErrorStatus] = useState('')
  const buttonHundler = (e: MouseEvent<HTMLButtonElement>, isSave: boolean) => {
    e.preventDefault();
    setReversAnimationWithLetter(true);
    setLetterText(isSave ? areaText : defaultPhrase);
    if (!isSave) setareaText(defaultPhrase)
    setMissingLeterTitle(false);
    setTimeout(() => {
      setActiveEditMode(false);
      setReversAnimationWithLetter(false);
    }, 300)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftInnerWrapper}>
        <div className={styles.title}>
          <div className={styles.stateBlock}>
            <div>3</div>
            <div>Этап</div>
          </div>
          <div className={styles.titleText}>
            Ввод данных участников и
            Заполнение пригласительного
          </div>
        </div>
        <div className={styles.letterSection}>
          <div className={styles.letterText}>
            <div className={styles.leftTitle} style={{
              opacity: Number(!isActiveEditMode),
              display: isMissingLeterTitle ? 'none' : ''
            }}>
              Текст письма
            </div>
            <div
              className={styles.letterBlock}
              style={{//адская пытка в несколько часов, я не уверен даже что коментарии проавильные, работает и славо богу 
                marginTop: isReversAnimationWithLetter && !isMissingLeterTitle ? '-9.1vh' : isActiveEditMode && !isMissingLeterTitle && '-9.1vh' || '',//поднимается наверх когда нажали редактировать, до удаления заголовка
                transition: isReversAnimationWithLetter && !isMissingLeterTitle ? 'none' : isMissingLeterTitle && 'none' || '' //когда письмо пропадает анимация скачка отключается
              }}//при обратной анимации письмо включается, потом делается неактивным редактор мод, когда письмо включается в обратной анимации нам нужно плавно вниз его подвинуть
              onClick={() => {
                setReversAnimationWithLetter(false);
                setActiveEditMode(true);
                setTimeout(() => {
                  setMissingLeterTitle(true);
                  textareaRef.current?.focus();
                }, 300)
              }}>
              <div>Дорогой друг,</div>
              {
                isActiveEditMode
                  ? <textarea
                    value={areaText}
                    onChange={e => {
                      const len = e.target.value.length;
                      if (len > 180) setErrorStatus('Слишком длинное письмо!')
                      else if (len < 50) setErrorStatus('Слишком короткое письмо!')
                      else setErrorStatus('')
                      setareaText(e.target.value);
                    }}
                    ref={textareaRef}
                  />
                  : <div className={styles.letterMainText}>
                    &emsp;{areaText}
                  </div>
              }
            </div>
            {isActiveEditMode && <div
              className={styles.buttonsBlock}
              style={{ opacity: Number(isMissingLeterTitle) }}
            >
              <div className={styles.hintBlock} style={{ opacity: errorStatus ? 1 : 0 }}>{errorStatus}</div>
              <button
                disabled={Boolean(errorStatus.length)}
                className={styles.saveButton}
                onClick={(e) => buttonHundler(e, true)}
              >Сохранить</button>
              <button
                className={styles.resetButton}
                onClick={(e) => buttonHundler(e, false)}
              >Отменить изменения</button>
            </div>}
          </div>
          <div className={styles.description}>
            <p>Слева вы видите текст пригласительного письма, он будет отправлен всем участникам новой активности.</p>
            <br />
            <p>Вы можете отредактировать его при необходимости, нажав на текст. Итоговый дизайн письма вы сможете посмотреть на следующем этапе.</p>
          </div>
        </div>
      </div>
      <div className={styles.rightInnerWrapper}>
        <div className={styles.rightInnerWrapper__header}>
          Вы можете добавить незарегестрированных в Code Life участников или отменить отправку письма пользователю.
        </div>
        <div className={styles.rightInnerWrapper__pecipers}>
          {recipients.map(user => <div className={styles.userRowPlace}>
            <UserRow recipients={user} imgWidth={window.innerWidth/window.innerHeight*9.8}/>
          </div>)}
        </div>
        <button className={styles.rightInnerWrapper__button}>Добавить</button>
      </div>
    </div>
  )
}

export default DialogWindowFillEmail