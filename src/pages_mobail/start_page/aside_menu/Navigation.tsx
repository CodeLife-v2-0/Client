import { FC, MouseEvent, useState, useEffect, useContext } from 'react';
import styles from './Navigation.module.css';
import { Context } from '../../..';
import { ComponentContextType, StartPageContext } from '../StartPageMobile';

type dataIntem = {
  title: string[];
  top: number;
  background: string;
  src: string;
}



const calculateActiveArea = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
const calculatePureValue = (value: number) => Math.floor(value - window.innerHeight * 0.085) 

const Navigation: FC<{ hideMenuFunc: () => void }> = ({ hideMenuFunc }) => {
  const { stateContext } = useContext(StartPageContext) as ComponentContextType;
  const data: dataIntem[] = [
    { title: ['Главная', 'Main'], top: 0, background: 'linear-gradient(104.92deg, #000000 0%, rgba(87, 86, 87, 0) 235.18%)', src: 'CLogo' },
    { title: ['О нас', 'About us'], top: calculatePureValue(stateContext.startInfo), background: 'linear-gradient(102.09deg, #000000 -0.52%, rgba(87, 86, 87, 0) 192.52%)', src: 'info' },
    { title: ['Курсы', 'Corses'], top: calculatePureValue(stateContext.startShop), background: 'linear-gradient(99.77deg, #000000 0%, rgba(87, 86, 87, 0) 163.14%)', src: 'open_book' },
    { title: ['Отзывы', 'Reviews'], top: 3000, background: 'linear-gradient(97.64deg, #000000 0%, #575657 143.42%)', src: 'dialog' },
    { title: ['Вопросы', 'Questions'], top: 4000, background: 'linear-gradient(94.92deg, #000000 0%, #575657 127.42%)', src: 'question' },
    { title: ['Контакты', 'Contacts'], top: 5000, background: 'linear-gradient(92.08deg, #000000 0%, #575657 124.55%)', src: 'logo_men' },
  ]
  const [scrollLevel, setScrollLevel] = useState<number>(calculateActiveArea);

  const { store } = useContext(Context);

  useEffect(() => {
    const handleScroll = () => {
      setScrollLevel(calculateActiveArea);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>, scrollValue: number): void => {
    e.preventDefault()
    window.scrollTo({
      top: scrollValue,
      behavior: 'smooth',
    });
    setTimeout(() =>
      hideMenuFunc(), 500)
  };
  const navigationLinks = data.map(
    (link: dataIntem, index) => {
      const isActive = (scrollLevel >= data[index].top) && (index === data.length || scrollLevel < data[index + 1].top);
      return (
        <div
          key={`navvigation-title-link-${link.title[1]}`}
          className={styles.nav_link}
          style={{ background: link.background, width: 100 - (3.7 * index) + '%' }}
          onClick={(e: MouseEvent<HTMLDivElement>) => handleClick(e, link.top)}
        >
          <span>{link.title[store.isEng]}</span>
          <img
            src={`img/mobail_logo/start_page/${link.src}.png`}
            alt={`Логотип-${link.title[store.isEng]}`}
            className={styles.logo}
            style={{
              backgroundColor: isActive ? 'cyan' : 'white',
              borderColor: isActive ? '#009aad' : 'white'
            }}
          />
        </div>
      )
    });
  return (
    <div className={styles.wrapepr}>
      {navigationLinks}
    </div>
  )
}

export default Navigation