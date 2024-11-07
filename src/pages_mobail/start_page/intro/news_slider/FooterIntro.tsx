import {FC, useContext} from 'react'
import styles from './FooterIntro.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'
import { startPage } from '../../../../localizationData'

const FooterIntro: FC = () => {

    const {store} = useContext(Context);
    return (
        <div className={styles.wrapper} style={{ marginTop: `calc(var(--vh, 1vh) * ${store.isEng === 1 ? 8.6 : 3.6})`}}>
            {!store.isEng
            ? <div className={styles.leng_selector}
            onClick={() => store.setLang()}> RU </div>
            : <div className={styles.leng_selector}
            onClick={() => store.setLang()}> EN </div>}
            <div className={styles.signature}>
            {startPage.with_respect[store.isEng]}<br/>
            {startPage.our_team[store.isEng]}
            </div>
        </div>
    )
}

export default observer(FooterIntro)