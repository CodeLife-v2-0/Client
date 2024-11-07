import { FC, useContext } from 'react'
import styles from './UnAuthorization.module.css'
import LongMatrix from '../../components/Decorations/LongMatrixBack/LongMatrix'
import Notification from './Notification'
import ValidateEmail from './ValidateEmail'
import { Context } from '../..'


const UnAuthorization: FC = () => {
    const { store } = useContext(Context);
    return (
        <section className={styles.main_wrapper}>
            <LongMatrix charsColor='#00f57b'/>
            {store.user.email
                ? <ValidateEmail mail={store.user.email}/>
                : <Notification />
            }
        </section>
    )
}

export default UnAuthorization