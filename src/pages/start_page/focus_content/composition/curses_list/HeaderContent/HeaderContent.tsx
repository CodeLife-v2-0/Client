import { FC, Dispatch, SetStateAction, useContext } from 'react'
import styles from './HeaderContent.module.css'
import Finder from '../Finder/Finder'
import { startPage } from '../../../../../../localizationData';
import { Context } from '../../../../../..';

interface IHeaderContent {
    requestState: [string, Dispatch<SetStateAction<string>>];
    totalCountResult: number;
}

const HeaderContent: FC<IHeaderContent> = ({ requestState, totalCountResult }) => {
    const {store} = useContext(Context);
    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>
                {startPage.shop_header[store.isEng]}
            </span>
            <Finder requestState={requestState} totalResult={totalCountResult} />
        </div>
    )
}

export default HeaderContent