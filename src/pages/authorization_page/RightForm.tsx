import { useState, FC, Dispatch, SetStateAction, memo } from 'react'
import AuthorizationForm from './AuthorizationForm';
import RegistrationForm from './RegistrationForm';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';
import { useNavigate } from 'react-router-dom';
import {generateFunctionTransferWithoutEvent} from '../../utils/animatedBacground';
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import styles from './style.module.css'

const RightForm: FC<{ displayValue: number; errorItem: [string, Dispatch<SetStateAction<string>>] }>= ({ displayValue, errorItem }) => {
    const history = useNavigate();
    const [goMain, goLC] = generateFunctionTransferWithoutEvent(history, ['/', '/personal_account'])
    const [registrationMode, setRegistrationMode] = useState(false);
    const switchMode = () => {
        setRegistrationMode(!registrationMode);
    }
    return (
        <motion.div
            animate={{ x: 0,  opacity: 1 }}
            initial={{ x: 500, opacity: 0 }}
            transition={{
                delay: 1,
                duration: 1,
                repeat: 0,
            }}
            className={styles.authorization_form}
        >
            <FormHeader Mode={registrationMode} closeLink={goMain} displayValue={displayValue} />
            {
                registrationMode
                    ? <RegistrationForm switchFunc={switchMode} sAuth={goLC} displayValue={displayValue} errorItem={errorItem}/>
                    : <AuthorizationForm switchFunc={switchMode} sAuth={goLC}  displayValue={displayValue} errorItem={errorItem}/>
            }
            <FormFooter />
        </motion.div>
    )
}

export default observer(RightForm);