import { FC, Dispatch, SetStateAction, MouseEvent, useEffect, useRef, useState, useContext } from 'react'
import styles from './EditorBlock.module.css'
import EditorLogic from './EditorLogic'
import { Context } from '../../..'
import { UBTextCode } from './PhotoEditor'
import { mainDivisionData } from '../../../localizationData'


interface IEditorBlock {
    file: [File, Dispatch<SetStateAction<File | null>>]
    closeEditor: (e?: MouseEvent<HTMLDivElement>) => void;
    setUnderButtonTextCode:  Dispatch<SetStateAction<UBTextCode>>
}


const EditorBlock: FC<IEditorBlock> = ({ file, closeEditor, setUnderButtonTextCode }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [edditImg, setEdditImg] = useState<string>('');
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (wrapperRef.current) {
            timeoutId = setTimeout(() => {
                wrapperRef.current!.style.opacity = '1';
            }, 500);
        }
        return () => clearTimeout(timeoutId);
    }, []);
    
    const [fileValue, setFile] = file;
    const {store} = useContext(Context);

    const stepBack = (e: MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setUnderButtonTextCode(UBTextCode.defult)
        setFile(null);
    }

    const sendData = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        closeEditor();
        if(edditImg){
            store.uploadAvatar(edditImg);
        }
        stepBack(e);
    }

    
    return (
        <div ref={wrapperRef} className={styles.local_wrapper}>
            <div className={styles.title}>
                {mainDivisionData.changeAvatar[store.isEng]}
            </div>
            <div className={styles.content}>
                <div className={styles.left_content}>
                    <div className={styles.left_title}>
                        {mainDivisionData.choiceArea[store.isEng]}
                    </div>
                    <div className={styles.editor}>
                        <EditorLogic file={fileValue} setEdditImg={setEdditImg}/>
                    </div>
                </div>
                <div className={styles.right_content}>
                    <div className={styles.right_title}>
                        {mainDivisionData.avatarResult[store.isEng]}
                    </div>
                    <div className={styles.result}>
                        <div />
                        {edditImg && <img src={edditImg} alt="editable content block"/>}
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.save} onClick={sendData}>
                            {mainDivisionData.saveAvatar[store.isEng]}
                        </button>
                        <button className={styles.cansel} onClick={stepBack}>
                            {mainDivisionData.cancelSave[store.isEng]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorBlock