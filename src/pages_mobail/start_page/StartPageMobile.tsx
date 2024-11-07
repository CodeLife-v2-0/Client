import { FC, useState, useReducer, createContext, Dispatch, RefObject, createRef, useRef } from 'react'
import styles from './StartPageMobile.module.css'
import Welcome from '../welcome_animation/Welcome';
import TopMenu from './top_menu/TopMenu';
import IntroPage from './intro/IntroPage';
import Info from './info/Info';
import CursList from './curs_list/CursList';
import { observer } from 'mobx-react-lite';
import Comments from './comments/Comments_mobile';

interface AppState {
    startInfo: number;
    startShop: number;
    wrapperRef: RefObject<HTMLElement> | null;
}

type Action =
    | { type: 'SETUP_START_INFO'; payload: number }
    | { type: 'SETUP_START_SHOP'; payload: number }
    | { type: 'SETUP_WRAPPER_REF'; payload: RefObject<HTMLElement> | null };

export interface ComponentContextType {
    stateContext: AppState;
    dispatchContext: Dispatch<Action>;
}

export const StartPageContext = createContext<ComponentContextType | undefined>(undefined);

const initialState: AppState = {
    startInfo: 0,
    startShop: 0,
    wrapperRef: createRef<HTMLElement>(),
}

const startPageReducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'SETUP_START_INFO':
            return { ...state, startInfo: action.payload };
        case 'SETUP_START_SHOP':
            return { ...state, startShop: action.payload };
        case 'SETUP_WRAPPER_REF':
            return { ...state, wrapperRef: action.payload };
        default:
            return state;
    }
}

const StartPageMobile: FC = () => {
    window.scrollTo(0, 0);
    const wrapperRef = useRef<HTMLElement>(null);
    const [stateContext, dispatchContext] = useReducer(startPageReducer, {
        ...initialState,
        wrapperRef,
    });
    const [welcomeCompleted, setWelcomeCompleted] = useState(false);
    if (!welcomeCompleted)
        return <Welcome completeControl={setWelcomeCompleted} />;
    return (
        <StartPageContext.Provider value={{ stateContext, dispatchContext }}>
            <section className={styles.wrapper} ref={wrapperRef}>
                <TopMenu />
                <IntroPage />
                <Info />
                <CursList />
                <Comments />
            </section>
        </StartPageContext.Provider>
    )
}

export default observer(StartPageMobile)