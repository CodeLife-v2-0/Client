import { useState, useEffect, useRef, FC, useContext } from 'react';
import styles from './Loader.module.css';
import Spinner from './Spark';
import { Context } from '../..';


const Loader: FC = () => {

    const [dots, setDots] = useState('');
    const {store} = useContext(Context);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => prevDots.length < 3 ? prevDots + '.' : '');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let spinner: Spinner;
        const canvas = canvasRef.current!;
        spinner = new Spinner(canvas);
        spinner.animate();
        return () => {
            spinner.clear();
        };
    }, []);
    return (
        <div className={styles.loadingContainer}>

            <canvas ref={canvasRef} className={styles.canvas} />
            <div
                className={styles.loadingText}
                style={{left: `${50 - store.isLoading.length / 2}%`}}
            >{store.isLoading}{dots}
            </div>


        </div>
    );
};

export default Loader;
