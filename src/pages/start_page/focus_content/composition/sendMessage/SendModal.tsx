import { FC, Dispatch, SetStateAction, MouseEvent } from 'react';
import styles from './SendForm.module.css';

interface ISendModal {
    setModal: Dispatch<SetStateAction<boolean>>;
}

const SendModal: FC<ISendModal> = ({ setModal }) => {

    const closeModal = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setModal(false);
    }
    return (
        <div className={styles.send__modal__wrapper} onClick={closeModal}>
            <div className={styles.send__modal} onClick={(e) => {e.stopPropagation()}}>
                <div className={styles.send__modal__text}>
                    Спасибо за уделенное время!<br/>
                    Скоро наши менеджеры свяжутся с вами.
                </div>
                <div className={styles.send__modal__button} onClick={closeModal}>
                    Окей
                </div>
            </div>
        </div>
    )
}

export default SendModal;