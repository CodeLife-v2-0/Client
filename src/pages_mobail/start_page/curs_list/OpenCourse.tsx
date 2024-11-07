import { FC, Dispatch, SetStateAction, useState, useEffect, useRef, useContext } from 'react'
import { ICourse } from './CourseCard'
import styles from './OpenCourse.module.css'
import CircularIndicator from '../../../components/Decorations/CircularProgressIndicator/CircularIndicator'
import Accordion from './Accordion'
import { ComponentContextType, StartPageContext } from '../StartPageMobile'

interface IOpenCourse {
    data: ICourse;
    closeFunc: Dispatch<SetStateAction<boolean>>
}

const simulateInertiaScroll = (element: HTMLElement, initialVelocity: number, duration: number) => {
    const start = element.scrollTop;
    const startTime = performance.now();
    let currentTime = 0;
    let currentScroll = start;
    let currentVelocity = initialVelocity;
  
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  
    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      currentTime = elapsed;
  
      const deltaTime = currentTime / duration;
      const dampingFactor = 0.8; // Фактор затухания для эффекта инерции
  
      // Применяем физическую модель инерции с плавным замедлением
      currentScroll += currentVelocity * easeOutCubic(deltaTime);
      currentVelocity *= dampingFactor;
  
      element.scrollTop = currentScroll;
  
      if (currentTime < duration && Math.abs(currentVelocity) > 0.1) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  };

const OpenCourse: FC<IOpenCourse> = ({ data, closeFunc }) => {
    const { stateContext } = useContext(StartPageContext) as ComponentContextType;
    const modalRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<number | null>(null);
    const topStartRef = useRef<number | null>(null);
    const touchEndTimeRef = useRef<number | null>(null);
    const touchPositionsRef = useRef<number[]>([]);
    useEffect(() => {
        const mainWindow = stateContext.wrapperRef;
        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0] || event.changedTouches[0];
            touchStartRef.current = touch.clientY;
            topStartRef.current = modalRef.current!.scrollTop;
            touchPositionsRef.current = [];
        };

        const handleTouchMove = (event: TouchEvent) => {
            event.preventDefault();
            touchEndTimeRef.current = event.timeStamp;
            if (touchStartRef.current) {
                const touch = event.touches[0] || event.changedTouches[0];
                touchPositionsRef.current.push(touch.clientY);
                const deltaY = touchStartRef.current - touch.clientY;
                if (modalRef.current) {
                    modalRef.current.scrollTop = topStartRef.current! + deltaY;
                }

            }
        };
        const handleTouchEnd = (event: TouchEvent) => {
            if (touchStartRef.current && touchEndTimeRef.current && modalRef.current) {
                const lastPosition = touchPositionsRef.current[touchPositionsRef.current.length - 1];
                const duration = touchEndTimeRef.current - event.timeStamp;
                const velocity = (lastPosition - touchStartRef.current) / duration;
                if (velocity) {
                    simulateInertiaScroll(modalRef.current, velocity**3/25, 500 + Math.abs(velocity*50));
                }
            }
        };
        mainWindow?.current?.addEventListener('touchstart', handleTouchStart, { passive: false });
        mainWindow?.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainWindow?.current?.addEventListener('touchend', handleTouchEnd, { passive: false });
        return () => {
            mainWindow?.current?.removeEventListener('touchstart', handleTouchStart);
            mainWindow?.current?.removeEventListener('touchmove', handleTouchMove);
            mainWindow?.current?.removeEventListener('touchend', handleTouchEnd);
        };
    }, [stateContext.wrapperRef]);


    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setTimeout(() =>
            setIsVisible(true), 10
        )
    }, [])

    const closeCourse = () => {
        setIsVisible(false);
        setTimeout(() => { closeFunc(false) }, 500)
    }

    return (
        <section className={styles.wrapper} style={{ opacity: isVisible ? 1 : 0 }} ref={modalRef}>
            <div className={styles.header}>
                <div className={styles.main_title}>Курс</div>
                <div className={styles.close} onClick={closeCourse}>✕</div>
            </div>
            <div className={styles.preview}>
                <div className={styles.container_img}>
                    <img src="img/courses_logo/react.png" alt="react logo" />
                </div>
                <div className={styles.container_text}>
                    <div className={styles.course_name}>
                        React
                    </div>
                    <div className={styles.definition}>
                        Библиотека по JavaScript
                    </div>
                </div>
            </div>
            <div className={styles.stats}>
                {[
                    { title: 'Рейтинг', barText: '4.7', value: 94 },
                    { title: 'Популярность', barText: '90%', value: 90 },
                    { title: 'Сложность', barText: '4.8', value: 96 }
                ].map(
                    (dataIndicator) => {
                        return <div className={styles.indicator_container} key={`indicator-${dataIndicator.title}`}>
                            <div className={styles.indicator_name}>
                                {dataIndicator.title}
                            </div>
                            <div className={styles.indicator}>
                                <CircularIndicator value={dataIndicator.value} title={dataIndicator.barText} />
                            </div>

                        </div>
                    })
                }
            </div>
            <Accordion data={data} modalRef={modalRef} />
        </section>
    )
}

export default OpenCourse