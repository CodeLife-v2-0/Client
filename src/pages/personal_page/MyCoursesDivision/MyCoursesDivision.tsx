import { FC, useEffect } from 'react'
import styles from './MyCourseDivision.module.css'
import { gsap } from 'gsap';
import LetterComponent from '../../../components/Decorations/AppearanceText/AppearanceText';

const MyCoursesDivision: FC = () => {

    useEffect(() => {
        let textAnimation = gsap.timeline();
        textAnimation.to('.text', {
         opacity: 1,
         stagger: 0.2,
        });
       }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.words}>
                {
                    'Hello World!'.split(' ').map((i) =>
                        i == ' ' ?
                            <LetterComponent letter={i} doAnimation={true}/>
                            :
                            <LetterComponent letter={i} doAnimation={true}/>
                    )}
            </div>
            <div className={styles.words}>
                {
                    'No Worries'.split(' ').map((i) =>
                        i == ' ' ?
                            <LetterComponent letter={i} doAnimation={true}/>
                            :
                            <LetterComponent letter={i} doAnimation={true}/>
                    )}
            </div>
        </div>
    )
}

export default MyCoursesDivision