import { FC } from 'react';
import styles from './StarRaiting.module.css'
import { FaStar } from 'react-icons/fa';

interface IStarRaiting {
    rate: number;
}



const StarRaiting: FC<IStarRaiting> = ({ rate }) => {

    return (
        <div className={styles.stars__wrapper}>
            {Array.from({ length: 5 }).map((star, index) => {
                return (
                    <FaStar color={(index + 1) > rate ? 'black': 'yellow'}/>
                )
            })}
        </div>
    )
}

export default StarRaiting;