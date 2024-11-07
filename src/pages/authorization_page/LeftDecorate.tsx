import { FC } from 'react'
import CompanyLogo from '../../components/Decorations/CL_logo/CompanyLogo';
import { motion } from "framer-motion";
import {generateFunctionTransferWithoutEvent} from '../../utils/animatedBacground';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css'
import { observer } from 'mobx-react-lite';

const LeftDecorate: FC<{displayValue: number}> = ({displayValue}) => {

    const history = useNavigate();
    const [goMain] = generateFunctionTransferWithoutEvent(history, ['/', '/personal_account'])
    
    return (
        <motion.div
            animate={{ opacity: [0, 0.1, 1, 0.1, 1, 0.1, 1, 0.1, 1, 1] }}
            initial={{ opacity: 0 }}
            transition={{
                delay: 1,
                duration: 1,
                repeat: 0,
            }}
            className={styles.attributes_container}
        >
            {displayValue < 3
            ? <div className={styles.Company_title}>Code Life</div>
            : <div className={"clickable " + styles.Company_title} onClick={goMain}>Code Life</div>
            }  
            <CompanyLogo identificator={styles.CompanyLogoAuthorization} style={{color: '#b23aee', borderColor: '#b23aee'}}/>
        </motion.div>
    )
}

export default observer(LeftDecorate);