import { FC, CSSProperties, useState, useEffect } from 'react';
import styles from './BallIndicator.module.css';

interface IBallIndicator {
  style: CSSProperties;
  limits: { start: number; end: number };
}

const caclScroll = () =>
  window.scrollY <= window.innerHeight * 1.8
    ? (12 / window.innerHeight) * window.scrollY
    : window.scrollY <= window.innerHeight * 3.5
      ? 22 + (1 / window.innerHeight) * window.scrollY
      : 1 + (8 / window.innerHeight) * window.scrollY

const BallIndicator: FC<IBallIndicator> = ({ style, limits }) => {


  const [scrollValue, setScrollValue] = useState(caclScroll());
  console.log(scrollValue);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrollValue(caclScroll()));
    return window.removeEventListener('scroll', () => setScrollValue(caclScroll()));
  })

  const topValue = scrollValue + limits.start;

  return (
    <div className={styles.ballIndicator} style={{ ...style, top: `${topValue}%` }}></div>
  );
};

export default BallIndicator;
