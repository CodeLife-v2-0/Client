import { FC, useContext, lazy, Suspense, useEffect, useState } from 'react';
import styles from './style.module.css';
import LeftDecorate from './LeftDecorate';
import RightForm from './RightForm';
import { Context } from '../..';
import Loader from '../Loader/Loader';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';

const LongMatrix = lazy(() => import('../../components/Decorations/LongMatrixBack/LongMatrix'));

const AuthorizationPage: FC<{ displayValue: number }> = ({ displayValue }) => {
    const { store } = useContext(Context);
    const [errorItem, setErrorItem] = useState('');
    const handleErrorMessageChange = (errorMes: string) => {
        if (errorMes) {
            setErrorItem(errorMes);
        }
    };

    useEffect(() => {
        const disposeReaction = reaction(
            () => store.errorMes,
            handleErrorMessageChange
        );

        return () => {
            disposeReaction();
        };
    }, []);

    return (
        <>
            {store.isLoading && <Loader />}
            <Suspense fallback={<Loader />}>
                <LongMatrix charsColor='#aa23ff' />
            </Suspense>
            <div className={styles.authorization_page_content}>
                <LeftDecorate displayValue={displayValue}/>
                <RightForm displayValue={displayValue} errorItem={[errorItem, setErrorItem]}/>
            </div>
        </>
    )
}

export default observer(AuthorizationPage);