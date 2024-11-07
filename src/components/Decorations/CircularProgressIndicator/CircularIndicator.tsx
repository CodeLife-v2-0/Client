import React, { useEffect, useRef } from 'react';
import styles from './CircularIndicator.module.css';

interface CircularIndicatorProps {
    value: number;
    title: string;
}

const CircularIndicator: React.FC<CircularIndicatorProps> = ({ value, title }) => {
    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        const circle = circleRef.current;

        if (circle) {
            const svgElement = circle.ownerSVGElement;
            const svgRect = svgElement!.getBoundingClientRect();
            const radius = (svgRect.width / 100) * 43;
            const circumference = 2 * Math.PI * radius;
            const strokeOffset = (100 - value) / 100 * circumference;
            circle.style.strokeDasharray = `${0} ${circumference}`;
            circle.style.borderRadius = '0';
        
            setTimeout(() => {
              circle.style.transition = `stroke-dasharray 2s ease-in-out`;
              circle.style.strokeDasharray = `${circumference - strokeOffset} ${circumference}`;
            }, 10);
          }
    }, [value]);

    return (
        <svg className={styles.circle} width="100%" height="100%">
            <defs>
                <radialGradient id="trackGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#282C2F" />
                    <stop offset="100%" stopColor="#000000" />
                </radialGradient>
                <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="13.5%" stopColor="#CECECE" />
                    <stop offset="73.55%" stopColor="#101010" />
                </linearGradient>
            </defs>
            <circle
                className={styles.track}
                cx="50%"
                cy="50%"
                r="37.5%"
                fill="url(#trackGradient)"
            />
            <circle
                ref={circleRef}
                className={styles.progress}
                cx="50%"
                cy="50%"
                r="43%"
                stroke="url(#borderGradient)"
            />
            <text className={styles.text} x="50%" y="50%">
                {title}
            </text>
        </svg>
    );
};


export default CircularIndicator;
