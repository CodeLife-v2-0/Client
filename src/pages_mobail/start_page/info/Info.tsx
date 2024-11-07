import { FC, useState, useEffect, useRef, useContext } from 'react'
import styles from './Info.module.css'
import BeautifulBackground from './BeautifulBackground'
import CompanyDiscription from './CompanyDiscription'
import { StartPageContext, ComponentContextType } from '../StartPageMobile'

const calculateActiveArea = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 1;
    return scrollTop / windowHeight;
}

const Info: FC = () => {
    const { dispatchContext} = useContext(StartPageContext) as ComponentContextType;
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleText, setVisibleText] = useState(false);
    useEffect(()=>{
        if(sectionRef.current){
            dispatchContext({type: 'SETUP_START_INFO', payload: sectionRef.current.offsetTop})
        }
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            const curientArea = calculateActiveArea()
            if (0.35 < curientArea && curientArea < 1.3) {
                setIsVisible(true);
                setTimeout(() => { setVisibleText(true); }, 3500)
            }
        };
        if (!isVisible)
            window.addEventListener('scroll', handleScroll);
        else {
            window.removeEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);


    return (
        <section className={styles.wrapper} ref={sectionRef}>
            {isVisible && <BeautifulBackground />}
            {isVisibleText && <CompanyDiscription />}
        </section>
    )
}

export default Info