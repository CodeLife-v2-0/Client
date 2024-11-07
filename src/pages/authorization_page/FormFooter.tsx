import {FC, useContext} from 'react'
import styles from './style.module.css'
import CircularIconPanel from '../../components/Decorations/CircularIconPanel/CircularIconPanel'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const dataIcons: string[] = [
    'apple',
    'facebook',
    'twitter',
    'vk',
    'google'
];

const FormFooter: FC = () => {
    const {store} = useContext(Context);
    return (
        <div className={styles.authorization_form_footer}>
            <CircularIconPanel dataIcons={dataIcons}/>
            <div onClick={()=>{store.setLang()}} className={"clickable " + styles.lang_selecter}>
                {store.isEng ? 'EN': 'RU'}
            </div>
        </div>
    )
}

export default observer(FormFooter)