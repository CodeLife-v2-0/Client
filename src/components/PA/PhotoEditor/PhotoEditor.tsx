import { FC, useState, useEffect, useRef, MouseEvent, ChangeEvent, useContext } from 'react'
import styles from './PhotoEditor.module.css'
import EditorBlock from './EditorBlock';
import { mainDivisionData } from '../../../localizationData';
import { Context } from '../../..';

export const enum UBTextCode{
    defult,
    badFormat,
    badSize
}

interface IPhotoEditor {
    editingAvatar: () => void;
}

const editorModeStyles = {
    width: '75%',
    height: '70%',
}

const PhotoEditor: FC<IPhotoEditor> = ({ editingAvatar }) => {
    const globalWrapperRef = useRef<HTMLDivElement>(null);
    const localWrapperRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editorMode, setEditorMode] = useState<File | null>(null);;
    const [underButtonTextCode, setUnderButtonTextCode] = useState(UBTextCode.defult);
    const {store} = useContext(Context);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (globalWrapperRef.current) {
            timeoutId = setTimeout(() => {
                globalWrapperRef.current!.style.opacity = '1';
            }, 10);
        }
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!editorMode && globalWrapperRef.current && globalWrapperRef.current.style.opacity === '1') {
            if (localWrapperRef.current) {
                localWrapperRef.current!.style.opacity = '0';
                timeoutId = setTimeout(() => {
                    localWrapperRef.current!.style.opacity = '1';
                }, 500);
            }
            return () => clearTimeout(timeoutId);
        }
    }, [editorMode]);


    const closeEditor = (e?: MouseEvent<HTMLDivElement>) => {
        if (e) { e.preventDefault(); }
        globalWrapperRef.current!.style.opacity = '0';
        setTimeout(() => { editingAvatar() }, 700);
    }
    const handleClick = (e?: MouseEvent<HTMLButtonElement>) => {
        if (e) { e.preventDefault(); }
        fileInputRef.current!.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                const allowedTypes = ['image/jpeg', 'image/png'];
                if(!allowedTypes.includes(selectedFile.type)){
                    setUnderButtonTextCode(UBTextCode.badFormat);
                    return;
                }
                const fileSizeInBytes = selectedFile.size;
                const fileSizeInKilobytes = fileSizeInBytes / 1024;
                const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
                if (fileSizeInMegabytes > 3) {
                    setUnderButtonTextCode(UBTextCode.badSize);
                    return;
                }
                if (localWrapperRef.current) {
                    localWrapperRef.current.style.opacity = '0';
                    setTimeout(() => { setEditorMode(selectedFile); }, 300)
                }
            }
        }
    };


    const startedContent = (<div className={styles.local_wrapper} ref={localWrapperRef}>
        <div className={styles.wrapper_header}>
            <div className={styles.wrapper_title} >
                {mainDivisionData.selectImgToUp[store.isEng]}
            </div>
            <div className={styles.close} onClick={closeEditor}>
                ✕
            </div>
        </div>
        <div className={styles.inner_wrapper}>
            <div className={styles.main_text}>
                {mainDivisionData.describeMes[store.isEng]}
            </div>
            <button className={styles.loader} onClick={handleClick}>
                {mainDivisionData.selectImg[store.isEng]}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className={styles.wrapper_footer} style={{
                color: underButtonTextCode===UBTextCode.defult? 'black': 'red'
            }}>
                {mainDivisionData.underButtonMsg[store.isEng][underButtonTextCode]}
            </div>
        </div>
    </div>)

    return (
        <div className={styles.main_wrapper} ref={globalWrapperRef}>
            <div
                className={styles.wrapper}
                style={editorMode ? editorModeStyles : {}}
            >
                {editorMode
                    ? <EditorBlock file={[editorMode, setEditorMode]} closeEditor={closeEditor} setUnderButtonTextCode={ setUnderButtonTextCode}/>
                    : startedContent}
            </div>
        </div>
    )
}

export default PhotoEditor