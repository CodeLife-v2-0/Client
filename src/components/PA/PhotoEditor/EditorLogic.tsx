import { useRef, useEffect, useState, memo, useCallback, Dispatch, SetStateAction } from 'react';
import styles from './EditorLogic.module.css'


interface EditorLogicProps {
    file: File;
    setEdditImg: Dispatch<SetStateAction<string>>;
}

const EditorLogic: React.FC<EditorLogicProps> = ({ file, setEdditImg }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [imgSide, setImgSide] = useState<number>(0);
    const [imgTop, setImgTop] = useState<number>(0);
    const [imgLeft, setImgLeft] = useState<number>(0);

    const stopRepeat = useRef<boolean>(true);
    const initTop = useRef<number>(0);
    const initLeft = useRef<number>(0);
    const initWidth = useRef<number>(0);
    const initHeight = useRef<number>(0);
    const initSide = useRef<number>(0);
    const isDrawingImg = useRef<boolean>(false);
    const imgResolutionHeight = useRef<number>(0);
    const imgResolutionWidth = useRef<number>(0);
    const image = imageRef.current;

    const leftNow = useRef<number>(0);
    const toptNow = useRef<number>(0);
    const sideNow = useRef<number>(0);
    const [isVisibleOptionBlock, setVisibleOptionBlock] = useState(false);

    const handleImageCrop = () => {
        if (!canvasRef.current) return;

        // Получаем элементы изображения и холста

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context && image && image.complete) {

            isDrawingImg.current = true;
            image.onload = null;
            // Задаем значения обрезки
            const canvasSide = Math.min(imgResolutionHeight.current, imgResolutionWidth.current);
            const multiw = image.width / imgResolutionWidth.current;
            const multih = image.height / imgResolutionHeight.current;

            // Устанавливаем размеры холста
            canvas.width = canvasSide;
            canvas.height = canvasSide;
            // Очищаем холст и рисуем обрезанное изображение

            context.drawImage(
                image,
                (leftNow.current - initLeft.current) / multiw,
                (toptNow.current - initTop.current) / multih,
                sideNow.current / multiw,
                sideNow.current / multih,
                0,
                0,
                canvasSide,
                canvasSide,
            );

            // Создаем временную ссылку на обрезанное изображение
            const croppedImageURL = canvas.toDataURL('image/jpeg');
            setEdditImg(croppedImageURL);
        }
    };

    useEffect(()=>{
        if(!isDrawingImg.current && image){
            image.onload = handleImageCrop;
        }
    },[image])

    useEffect(() => {
        const imageElement = imageRef.current;
        if (imageElement && stopRepeat.current) {
            stopRepeat.current = false;

            setTimeout(() => {
                const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = imageElement;
                const side = Math.min(offsetWidth, offsetHeight)
                initTop.current = offsetTop;
                initLeft.current = offsetLeft;
                initWidth.current = offsetWidth;
                initHeight.current = offsetHeight;
                initSide.current = side;
                setImgSide(side);
                sideNow.current = side;
                const topValue = offsetTop + Number(offsetLeft > offsetTop) * ((offsetHeight - side) / 2)
                setImgTop(topValue);
                toptNow.current = topValue;
                const LeftValue = offsetLeft + Number(offsetTop > offsetLeft) * ((offsetWidth - side) / 2)
                setImgLeft(LeftValue);
                leftNow.current = LeftValue;
                setVisibleOptionBlock(true);
            }, 800);

        }
        const getImageResolution = () => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target!.result;

                if (typeof result === 'string') {
                    const image = new Image();

                    image.onload = () => {
                        const dimensions = {
                            width: image.width,
                            height: image.height
                        };

                        imgResolutionHeight.current = dimensions.height;
                        imgResolutionWidth.current = dimensions.width;
                    };

                    image.src = result;
                } 
            };

            reader.readAsDataURL(file);
        };

        if (file) {
            getImageResolution();
        }
    }, [file]);


    const handleMouseDown = useCallback((e: React.MouseEvent, id: number) => {
        e.preventDefault();
        //Стартовые значения на момент клика
        const initialPos = {
            x: e.clientX,
            y: e.clientY,
            top: imgTop,
            left: imgLeft,
            side: imgSide
        };
        const handleMouseMove = (e: MouseEvent) => {
            const SqueareSide = window.innerHeight * 0.03;
            const Sqdel = window.innerHeight * 0.05;
            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            const maxDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
            if (id === 0) {
                const deltaTop =
                    deltaY < initTop.current - initialPos.top
                        ? initTop.current - initialPos.top
                        : deltaY > initHeight.current + initTop.current - initialPos.top - initialPos.side
                            ? initHeight.current + initTop.current - initialPos.top - initialPos.side
                            : deltaY
                const deltaLeft =
                    deltaX < initLeft.current - initialPos.left 
                        ? initLeft.current - initialPos.left
                        : deltaX > initWidth.current + initLeft.current - initialPos.left - initialPos.side
                            ? initWidth.current + initLeft.current - initialPos.left - initialPos.side
                            : deltaX
                setImgTop(deltaTop + initialPos.top);
                toptNow.current = deltaTop + initialPos.top;
                setImgLeft(deltaLeft + initialPos.left);
                leftNow.current = deltaLeft + initialPos.left;
            }
            if (id === 1) {
                const deltaTop = (deltaX * deltaY < 0) ? 0 :
                    maxDelta < initTop.current - initialPos.top
                        ? initTop.current - initialPos.top
                        : maxDelta > initialPos.side - (SqueareSide + Sqdel)
                            ? initialPos.side - (SqueareSide + Sqdel)
                            : maxDelta
                const deltaLeft = (deltaX * deltaY < 0) ? 0 :
                    maxDelta < initLeft.current - initialPos.left
                        ? initLeft.current - initialPos.left
                        : maxDelta > initialPos.side - (SqueareSide + Sqdel)
                            ? initialPos.side - (SqueareSide + Sqdel)
                            : maxDelta
                const deltaSide = (deltaX * deltaY < 0) ? 0 :
                    initialPos.side - maxDelta < (SqueareSide + Sqdel)
                        ? initialPos.side - (SqueareSide + Sqdel)
                        : initialPos.side - maxDelta > initSide.current
                            ? initialPos.side - initSide.current
                            : maxDelta
                setImgTop(deltaTop + initialPos.top);
                toptNow.current = deltaTop + initialPos.top;
                setImgLeft(deltaLeft + initialPos.left);
                leftNow.current = deltaLeft + initialPos.left;
                setImgSide(initialPos.side - deltaSide)
                sideNow.current = initialPos.side - deltaSide;
            }
            if (id === 2) {
                const deltaTop = (deltaX * deltaY > 0)
                    ? 0
                    : deltaX > deltaY
                        ? -Math.abs(maxDelta) < initTop.current - initialPos.top
                            ? initTop.current - initialPos.top
                            : -Math.abs(maxDelta)
                        : Math.abs(maxDelta) > initialPos.side - (SqueareSide + Sqdel)
                            ? initialPos.side - (SqueareSide + Sqdel)
                            : Math.abs(maxDelta)
                const deltaLeft = (deltaX * deltaY > 0)
                    ? 0
                    : deltaX > deltaY
                        ? initialPos.left + initialPos.side + Math.abs(maxDelta) > initLeft.current + initWidth.current
                            ? initSide.current - initialPos.side <= Math.abs(maxDelta)
                                ? (initLeft.current + initWidth.current - (initialPos.left + initialPos.side)) - (initSide.current - initialPos.side)
                                : (initLeft.current + initWidth.current - (initialPos.left + initialPos.side)) - Math.abs(maxDelta)
                            : Math.abs(maxDelta) > initSide.current - initialPos.side 
                                ? Math.abs(maxDelta) - (initSide.current - initialPos.side)
                                : 0
                        : 0
                const deltaSide = (deltaX * deltaY > 0)
                    ? 0 
                    : deltaX > deltaY
                        ? Math.abs(maxDelta) > initSide.current - initialPos.side
                            ? initSide.current - initialPos.side
                            : Math.abs(maxDelta)
                        : (-Math.abs(maxDelta)) < (SqueareSide + Sqdel) - initialPos.side
                            ? (SqueareSide + Sqdel) - initialPos.side
                            : -Math.abs(maxDelta)
                setImgTop(initialPos.top + deltaTop);
                toptNow.current = deltaTop + initialPos.top;
                setImgLeft(initialPos.left + deltaLeft);
                leftNow.current = deltaLeft + initialPos.left;
                setImgSide(initialPos.side + deltaSide);
                sideNow.current = initialPos.side + deltaSide;
            }
            if (id == 3){
                const deltaTop = (deltaX * deltaY < 0)
                    ? deltaX > deltaY
                        ? 0
                        : Math.abs(maxDelta) < initTop.current + initHeight.current - (initialPos.top + initialPos.side)
                            ? 0
                            : Math.abs(maxDelta) < initSide.current - initialPos.side
                                ? (initTop.current + initHeight.current - (initialPos.top + initialPos.side)) - Math.abs(maxDelta)
                                : initTop.current - initialPos.top
                    : 0
                const deltaLeft = (deltaX * deltaY < 0)
                    ? deltaX > deltaY
                        ? Math.abs(maxDelta) > (initLeft.current + initWidth.current) - (initialPos.left + (SqueareSide + Sqdel))
                            ? (initLeft.current + initWidth.current) - (initialPos.left + (SqueareSide + Sqdel))
                            : Math.abs(maxDelta)
                        : -Math.abs(maxDelta) > initLeft.current - initialPos.left
                            ? -Math.abs(maxDelta)
                            : initLeft.current - initialPos.left
                    : 0
                const deltaSide = (deltaX * deltaY < 0)
                    ? deltaX > deltaY
                        ? (-Math.abs(maxDelta)) < (SqueareSide + Sqdel) - initialPos.side
                            ? (SqueareSide + Sqdel) - initialPos.side
                            : -Math.abs(maxDelta)
                        : Math.abs(maxDelta) < initSide.current - initialPos.side
                            ? Math.abs(maxDelta)
                            : initSide.current - initialPos.side
                    : 0
                setImgTop(initialPos.top + deltaTop);
                toptNow.current = deltaTop + initialPos.top;
                setImgLeft(initialPos.left + deltaLeft);
                leftNow.current = deltaLeft + initialPos.left;
                setImgSide(initialPos.side + deltaSide);
                sideNow.current = initialPos.side + deltaSide;
            }
            if (id == 4){
                const deltaTop = (deltaX * deltaY > 0)
                    ? maxDelta < initTop.current + initHeight.current - (initialPos.top + initialPos.side)
                        ? 0
                        : -maxDelta < initialPos.side - initSide.current
                            ? initTop.current - initialPos.top
                            : -(maxDelta - (initTop.current + initHeight.current - (initialPos.top + initialPos.side)))
                    : 0
                const deltaLeft = (deltaX * deltaY > 0)
                    ? maxDelta > initLeft.current + initWidth.current - (initialPos.left + initialPos.side)
                        ? maxDelta > initSide.current - initialPos.side
                            ? (initLeft.current + initWidth.current - (initialPos.left + initialPos.side)) - (initSide.current - initialPos.side)
                            : (initLeft.current + initWidth.current - (initialPos.left + initialPos.side)) - maxDelta
                        : maxDelta > initSide.current - initialPos.side 
                            ? maxDelta - (initSide.current - initialPos.side)
                            : 0
                    : 0
                const deltaSide = (deltaX * deltaY > 0) 
                    ? initialPos.side + maxDelta < (SqueareSide + Sqdel)
                        ? (SqueareSide + Sqdel) - initialPos.side
                        : initialPos.side + maxDelta > initSide.current
                            ? initSide.current - initialPos.side
                            : maxDelta
                    : 0
                setImgTop(initialPos.top + deltaTop);
                toptNow.current = deltaTop + initialPos.top;
                setImgLeft(initialPos.left + deltaLeft);
                leftNow.current = deltaLeft + initialPos.left;
                setImgSide(initialPos.side + deltaSide);
                sideNow.current = initialPos.side + deltaSide;
            }
        };
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            handleImageCrop();
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [imgTop, imgLeft, imgSide]);

    // Проверяем, что пропс `file` определен
    if (!file) {
        return null;
    }

    // Создаем ссылку на выбранное изображение
    const imageUrl = URL.createObjectURL(file);

    return (
        <>
            {imageUrl && (
                <div className={styles.wrapper}>
                    {/* Отображаем выбранное изображение */}
                    <img src={imageUrl} alt="Selected" id="selected-image" ref={imageRef} />
                    {/* Позиция 0: Рамка */}
                    <div
                        className={styles.frame}
                        onMouseDown={e => handleMouseDown(e, 0)}
                        style={{
                            top: `${imgTop}px`,
                            left: `${imgLeft}px`,
                            width: `${imgSide}px `,
                            height: `${imgSide}px`,
                            opacity: isVisibleOptionBlock? '1' : '0'
                        }} />

                    {/* Позиция 1: Левый верхний угол изображения */}
                    <div className={styles.option_block}
                        onMouseDown={e => handleMouseDown(e, 1)}
                        style={{
                            top: `${imgTop}px`,
                            left: `${imgLeft}px`,
                            cursor: 'nw-resize',
                            opacity: isVisibleOptionBlock? '1' : '0'
                        }} />

                    {/* Позиция 2: Правый верхний угол изображения */}
                    <div
                        className={styles.option_block}
                        onMouseDown={e => handleMouseDown(e, 2)}
                        style={{
                            top: `${imgTop}px`,
                            left: `calc(${imgSide + imgLeft}px - 3vh)`,
                            cursor: 'sw-resize',
                            opacity: isVisibleOptionBlock? '1' : '0'
                        }} />

                    {/* Позиция 3: Левый нижний угол изображения */}
                    <div className={styles.option_block}
                        onMouseDown={e => handleMouseDown(e, 3)} 
                        style={{
                            top: `calc(${imgSide + imgTop}px - 3vh)`,
                            left: `${imgLeft}px`,
                            cursor: 'sw-resize'
                    }} />

                    {/* Позиция 4: Правый нижний угол изображения */}
                    <div className={styles.option_block} 
                        onMouseDown={e => handleMouseDown(e, 4)}
                        style={{
                            top: `calc(${imgSide + imgTop}px - 3vh)`,
                            left: `calc(${imgSide + imgLeft}px - 3vh)`,
                            cursor: 'nw-resize'
                    }} />
                </div>
            )}
            {/* Холст для обрезанного изображения */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
    );
};

export default memo(EditorLogic);
