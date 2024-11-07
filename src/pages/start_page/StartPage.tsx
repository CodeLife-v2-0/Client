import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import generateFunctionTransfer from '../../utils/animatedBacground';
import LongMatrix from '../../components/Decorations/LongMatrixBack/LongMatrix';
import SideMenu from './side_menu/SideMenu';
import FocusContent from './focus_content/FocusContent';
import styles from './style.module.css';
import NonExistentPage from '../non_existent_page/NonExistentPage';
import BackgroundCircle from '../../components/Decorations/BackgroundCircle/BackgroundCircle';
import Comments from './focus_content/composition/comments/Comments';
import SendForm from './focus_content/composition/sendMessage/SendForm';

interface IStartPage {
  firstTime: boolean,
  setFirstTime: Dispatch<SetStateAction<boolean>>
}

const StartPage: FC<IStartPage> = ({ firstTime, setFirstTime }) => {
  const history = useNavigate();
  const [authorization] = generateFunctionTransfer(history, ['authorization']);
  const [isAsideMenuActive, setActiveMode] = useState(true);
  const [isTopMenuActive, setTopMenuActive] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const { scrollValue } = useParams();

  const get_color = () => {
    const height = window.innerHeight;
    const scrollTop = window.scrollY;
    if (scrollTop < height) {
      let relative = scrollTop / height;
      return `rgb(${45 - 45 * relative}, ${29 * relative + 107}, ${154 * relative + 40})`;
    }
    if (scrollTop < height * 2) {
      let relative = scrollTop / height - 1;
      return `rgb(${255 * relative}, ${119 * relative + 136}, ${61 * relative + 194})`;
    }
    return 'white';
  };

  useEffect(() => {
    const handleScroll = () => {
      setColor(get_color());
      // для скрытия левой менюшки после второй композиции
      if (window.scrollY > window.innerHeight * 1.5) {
        setActiveMode(false);
      } else {
        setActiveMode(true);
      }

      // для скрытия верхней менюшки на третьей композиции
      if (window.scrollY > window.innerHeight * 1.7 && window.scrollY < window.innerHeight * 4) {
        setTopMenuActive(true);
      } else {
        setTopMenuActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [color, setColor] = useState(get_color());
  const activeState = useState(false);
  const value = Number(scrollValue);
  useEffect(() => {
    window.scrollTo({
      top: value,
      behavior: "auto",
    });
  }, [value])
  if (value < 0 || value > 10000) {
    return (
      <NonExistentPage />
    )
  }

  return (
    <div className={styles.wrapper_start_page}>
      <LongMatrix />
      <div className={styles.wrapper_content}>
        <SideMenu
          color={color}
          activeState={activeState}
          MenuState={[isAsideMenuActive, setActiveMode]}
        />
        <FocusContent
          color={color}
          activeValue={activeState[0]}
          authLink={authorization}
          stateTopMenu={[isTopMenuActive, setTopMenuActive]}
          firstTime={[firstTime, setFirstTime]}
        />
        {!openComments && <BackgroundCircle setOpenComments={setOpenComments}/>}
        {openComments && <><Comments setOpenComments={setOpenComments}/> <SendForm/> </>}
      </div>
    </div>
  );
};

export default StartPage;
