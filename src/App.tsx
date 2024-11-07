import { useState, FC, Dispatch, SetStateAction, useEffect, useContext, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start_page/StartPage';
import NonExistentPage from './pages/non_existent_page/NonExistentPage';
import PersonalPage from './pages/personal_page/PersonalPage';
import AuthorizationPage from './pages/authorization_page/AuthorizationPage';
import { Context } from '.';
import StartPageMobile from './pages_mobail/start_page/StartPageMobile';
import MobailNotification from './components/UI/Notification/MobailNotification';
import PersonalPageMobile from './pages_mobail/personal_page_mobile/PersonalPageMobile';
import OpenCourseInIntrodues from './pages/start_page/focus_content/composition/curses_list/OpenCourseInIntrodues';

export type SelectLangState = [number, Dispatch<SetStateAction<number>>];

export enum DisplayValue {
  Desktop = 1,
  Tablet = 2,
  BigMobile = 3,
  Mobile = 4
}

const badOrientationDisplay = ' Скорее всего ваш телефон находится в повернутом состоянии. Для удобного просмотра контента, пожалуйста поверните его или используйте другой десктоп. ';
let badOrientationShowed = false;

const App: FC = () => {

  const { store } = useContext(Context);
  store.checkExistenceLenguage();
  const msg = useState('');
  const isRefreshToken = useRef(false);

  if (localStorage.getItem('token') && !isRefreshToken.current) {
    isRefreshToken.current = true;
    store.checkAuth()
  }

  const [displayValue, setDisplayValue] = useState<number>(0);
  const [isFirstEnterOnStartPage, setIsFirstEnterOnStartPage] = useState(true);


  const setupDisplayValue = useCallback((widthValue: number) => {
    if (widthValue <= 600) {
      setDisplayValue(DisplayValue.Mobile);
    } else if (widthValue <= 700) {
      setDisplayValue(DisplayValue.BigMobile);
    } else if (widthValue < 1024) {
      setDisplayValue(DisplayValue.Tablet);
    } else {
      setDisplayValue(DisplayValue.Desktop);
    }
  }, []);

  if (!displayValue) { setupDisplayValue(window.innerWidth); }

  const oldWindowHeight = useRef(window.innerHeight);

  useEffect(() => {
    if (displayValue === DisplayValue.Mobile) {

      const checkOrientantion = () => {
        if (!badOrientationShowed && window.innerWidth > window.innerHeight * 1.3) {
          badOrientationShowed = true;
          msg[1](badOrientationDisplay);
        } else if (!badOrientationShowed) {
          msg[1]('');
        }
      }

      const setupNewHeight = (newHeight: number) => {
        oldWindowHeight.current = newHeight;
        const vh = newHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      setupNewHeight(window.innerHeight);

      const potentialRecalulateVH = () => {
        checkOrientantion();
        const newHeight = window.innerHeight;
        if (newHeight > oldWindowHeight.current * 1.5) {
          setupNewHeight(newHeight);
        }
      }

      window.addEventListener('resize', potentialRecalulateVH);

      return () => {
        window.removeEventListener('resize', potentialRecalulateVH);
      }
    } else {
      const handleResize = () => {
        setupDisplayValue(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  });


  return (
    <>
      {msg[0].length ? <MobailNotification message={msg} /> : <></>}
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              displayValue === DisplayValue.Mobile
                ? <StartPageMobile />
                : <StartPage firstTime={isFirstEnterOnStartPage} setFirstTime={setIsFirstEnterOnStartPage}/>
            }
          />
          <Route path="/:scrollValue" element={<StartPage firstTime={isFirstEnterOnStartPage} setFirstTime={setIsFirstEnterOnStartPage}/>}/>
          <Route path="*" element={<NonExistentPage />} />
          <Route path="personal_account" element={
            displayValue === DisplayValue.Mobile
              ? <PersonalPageMobile />
              : <PersonalPage />
          } />
          <Route path="authorization" element={<AuthorizationPage displayValue={displayValue} />} />
          <Route path="open_course/:courseName/:scrollValue" element={<OpenCourseInIntrodues />}/>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;