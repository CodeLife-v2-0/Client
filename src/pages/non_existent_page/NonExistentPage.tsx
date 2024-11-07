import { FC, MouseEvent, useContext  } from 'react'
import styles from './style.module.css';
import AnimatedStripe from '../../components/Decorations/AnimatedStripe/AnimatedStripe';
import DesignButton from '../../components/UI/Buttons/Button/DesignButton';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import generateFunctionTransfer from '../../utils/animatedBacground';
import CompanyTitle from '../../components/Decorations/CL_title/CompanyTitle';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { nonExistentPage } from '../../localizationData';


const NonExistenPage: FC = () => {

    const history: NavigateFunction = useNavigate();
    const [goMain, goLC]: ((event: MouseEvent<HTMLButtonElement>) => void)[] = generateFunctionTransfer(history, ["", "personal_account"]);
    const {store} = useContext(Context);

    return (
        <div className={styles.main_background}>
            <CompanyTitle id={styles.company_title_mobile_404}/>
            <img src='/img/girl_404.png' className={styles.girl_image + ' ' + styles.blur_animation} alt="perplexed girl" />
            <div className={styles.button_block_mobile}>
                <DesignButton onClickActive={goMain} idenficator={styles.button_404_gomain}>{nonExistentPage.goMain[store.isEng]}</DesignButton>
                <DesignButton onClickActive={goLC} idenficator={styles.button_404_goLC}>{nonExistentPage.goLc[store.isEng]}</DesignButton>
            </div>
            <div className={styles.left_part}>
                <div className={styles.local_header}>
                    <div className={styles.error_ntf}>{nonExistentPage.error404word1[store.isEng]}<br/>{nonExistentPage.error404word2[store.isEng]}</div>
                </div>
                <div className={styles.local_midle}>
                    <AnimatedStripe id ={styles.aminated404}/>
                    <div className={styles.error_code}>404</div>
                    <div className={styles.button_block}>
                        <DesignButton onClickActive={goMain} idenficator={styles.button_404_gomain}>{nonExistentPage.goMain[store.isEng]}</DesignButton>
                        <DesignButton onClickActive={goLC} idenficator={styles.button_404_goLC}>{nonExistentPage.goLc[store.isEng]}</DesignButton>
                    </div>
                    <CompanyTitle id={styles.company_title_404}/>
                </div>
                <div className={styles.local_header_mobile}>
                    <div className={styles.error_ntf}>{nonExistentPage.error404word1[store.isEng]}<br/>{nonExistentPage.error404word2[store.isEng]}</div>
                </div>
            </div>
        </div>
    )
}

export default observer(NonExistenPage)