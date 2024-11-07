import { useEffect, useRef, FC } from 'react';
import styles from './BeautifulBackground.module.css'

interface Point {
    x: number;
    y: number;
    radius: number;
}

const points: Record<number, Point> = {
    1: { x: 34.3, y: 5.4, radius: 2 },
    2: { x: 89.9, y: 4, radius: 2 },
    3: { x: 80.3, y: 10, radius: 1 },
    4: { x: 16, y: 17.4, radius: 3 },
    5: { x: 49.2, y: 20.1, radius: 2 },
    6: { x: 54, y: 18.6, radius: 1 },
    7: { x: 73.4, y: 17.4, radius: 1 },
    8: { x: 23.4, y: 31.8, radius: 1 },
    9: { x: 54.3, y: 30.1, radius: 2 },
    10: { x: 85.6, y: 29.4, radius: 1 },
    11: { x: 94.7, y: 27.9, radius: 2 },
    12: { x: 13, y: 41, radius: 3 },
    13: { x: 83.5, y: 47, radius: 3 },
    14: { x: 38.8, y: 51, radius: 2 },
    15: { x: 39.9, y: 52.2, radius: 1 },
    16: { x: 8.8, y: 54.9, radius: 1 },
    17: { x: 6.9, y: 56.6, radius: 2 },
    18: { x: 21.5, y: 58.6, radius: 1 },
    19: { x: 54.3, y: 55.1, radius: 3 },
    20: { x: 85.1, y: 56.8, radius: 1 },
    21: { x: 96.5, y: 61.5, radius: 2 },
    22: { x: 31.1, y: 65.9, radius: 2 },
    23: { x: 76.9, y: 61.8, radius: 1 },
    24: { x: 59.8, y: 63.7, radius: 2 },
    25: { x: 44.9, y: 68.8, radius: 2 },
    26: { x: 7.4, y: 78.7, radius: 2 },
    27: { x: 1.6, y: 93.8, radius: 1 },
    28: { x: 2.7, y: 99, radius: 3 },
    29: { x: 74.2, y: 68.4, radius: 3 },
    30: { x: 90.4, y: 67.7, radius: 2 },
    31: { x: 81.1, y: 72, radius: 1 },
    32: { x: 57.2, y: 77.9, radius: 2 },
    33: { x: 87.2, y: 86.8, radius: 2 },
    34: { x: 93.4, y: 86, radius: 3 },
    35: { x: 96, y: 93.9, radius: 3 },
    36: { x: 70.7, y: 96.3, radius: 2 },
    37: { x: 81.4, y: 97.6, radius: 1 },
};


interface Line {
    point1: number;
    point2: number;
    color: string;
}


const lines: Line[] = [
    { point1: 1, point2: 5, color: '#656565' },
    { point1: 2, point2: 3, color: '#292929' },
    { point1: 2, point2: 7, color: '#141414' },
    { point1: 2, point2: 11, color: '#323232' },
    { point1: 2, point2: 6, color: '#212121' },
    { point1: 2, point2: 9, color: '#292929' },
    { point1: 3, point2: 10, color: '#434343' },
    { point1: 3, point2: 13, color: '#141414' },
    { point1: 4, point2: 5, color: '#0c0c0c' },
    { point1: 4, point2: 6, color: '#151515' },
    { point1: 4, point2: 7, color: '#0c0c0c' },
    { point1: 4, point2: 14, color: '#242424' },
    { point1: 4, point2: 16, color: '#1e1e1e' },
    { point1: 5, point2: 13, color: '#343434' },
    { point1: 6, point2: 7, color: '#4a4a4a' },
    { point1: 6, point2: 8, color: '#363636' },
    { point1: 6, point2: 9, color: '#353535' },
    { point1: 7, point2: 11, color: '#2c2c2c' },
    { point1: 7, point2: 20, color: '#101010' },
    { point1: 8, point2: 9, color: '#3d3d3d' },
    { point1: 8, point2: 17, color: '#404040' },
    { point1: 8, point2: 18, color: '#2e2e2e' },
    { point1: 8, point2: 24, color: '#212121' },
    { point1: 9, point2: 11, color: '#3a3a3a' },
    { point1: 9, point2: 16, color: '#202020' },
    { point1: 9, point2: 24, color: '#262626' },
    { point1: 9, point2: 29, color: '#151515' },
    { point1: 9, point2: 32, color: '#0c0c0c' },
    { point1: 10, point2: 13, color: '#080808' },
    { point1: 10, point2: 15, color: '#070707' },
    { point1: 11, point2: 13, color: '#161616' },
    { point1: 11, point2: 24, color: '#090909' },
    { point1: 11, point2: 29, color: '#1d1d1d' },
    { point1: 12, point2: 19, color: '#313131' },
    { point1: 12, point2: 28, color: '#181818' },
    { point1: 13, point2: 23, color: '#2d2d2d' },
    { point1: 13, point2: 33, color: '#383838' },
    { point1: 14, point2: 15, color: '#787878' },
    { point1: 14, point2: 16, color: '#424242' },
    { point1: 14, point2: 20, color: '#292929' },
    { point1: 14, point2: 22, color: '#555555' },
    { point1: 14, point2: 25, color: '#434343' },
    { point1: 14, point2: 30, color: '#212121' },
    { point1: 15, point2: 16, color: '#333333' },
    { point1: 15, point2: 20, color: '#303030' },
    { point1: 15, point2: 22, color: '#474747' },
    { point1: 15, point2: 25, color: '#383838' },
    { point1: 15, point2: 30, color: '#0f0f0f' },
    { point1: 16, point2: 17, color: '#4f4f4f' },
    { point1: 16, point2: 18, color: '#333333' },
    { point1: 16, point2: 22, color: '#2e2e2e' },
    { point1: 16, point2: 25, color: '#2c2c2c' },
    { point1: 17, point2: 18, color: '#555555' },
    { point1: 17, point2: 26, color: '#232323' },
    { point1: 17, point2: 27, color: '#161616' },
    { point1: 17, point2: 32, color: '#191919' },
    { point1: 18, point2: 22, color: '#141414' },
    { point1: 18, point2: 24, color: '#4d4d4d' },
    { point1: 18, point2: 25, color: '#2f2f2f' },
    { point1: 18, point2: 26, color: '#474747' },
    { point1: 19, point2: 22, color: '#0e0e0e' },
    { point1: 20, point2: 22, color: '#141414' },
    { point1: 20, point2: 25, color: '#2d2d2d' },
    { point1: 20, point2: 30, color: '#4e4e4e' },
    { point1: 21, point2: 33, color: '#262626' },
    { point1: 21, point2: 34, color: '#262626' },
    { point1: 21, point2: 35, color: '#2c2c2c' },
    { point1: 22, point2: 25, color: '#444444' },
    { point1: 22, point2: 26, color: '#0b0b0b' },
    { point1: 22, point2: 30, color: '#040404' },
    { point1: 23, point2: 29, color: '#222222' },
    { point1: 23, point2: 31, color: '#313131' },
    { point1: 24, point2: 26, color: '#1c1c1c' },
    { point1: 24, point2: 29, color: '#282828' },
    { point1: 24, point2: 32, color: '#4e4e4e' },
    { point1: 24, point2: 36, color: '#2b2b2b' },
    { point1: 25, point2: 26, color: '#333333' },
    { point1: 25, point2: 30, color: '#2e2e2e' },
    { point1: 25, point2: 32, color: '#191919' },
    { point1: 26, point2: 36, color: '#050505' },
    { point1: 27, point2: 32, color: '#282828' },
    { point1: 29, point2: 30, color: '#323232' },
    { point1: 29, point2: 32, color: '#4c4c4c' },
    { point1: 29, point2: 33, color: '#151515' },
    { point1: 29, point2: 36, color: '#151515' },
    { point1: 30, point2: 36, color: '#0b0b0b' },
    { point1: 30, point2: 37, color: '#383838' },
    { point1: 32, point2: 36, color: '#303030' },
    { point1: 33, point2: 34, color: '#b5b5b5' },
    { point1: 33, point2: 35, color: '#424242' },
    { point1: 34, point2: 35, color: '#666666' },
    { point1: 34, point2: 36, color: '#2d2d2d' },
    { point1: 36, point2: 37, color: '#373737' },
];

const inputArray: Record<number, [number, number, string][]> = {
    1: [
        [19.7, 97.7, '#343434'],
        [43.3, 46.7, '#3b3b3b'],
        [163.2, 110.7, '#2a2a2a'],
        [-152.7, 146.2, '#2e2e2e'],
        [-39.4, 317, '#5b5b5b'],
    ],
    2: [
        [41, 40, '#333333'],
        [113.5, 25, '#232323'],
        [131, 30.5, '#272727'],
        [145, 40, '#131313'],
        [-72, 112, '#181818'],
    ],
    3: [
        [61.6, 70, '#0f0f0f'],
        [92, 59, '#101010'],
        [102.4, 60.4, '#0d0d0d'],
        [-5.4, 74.3, '#2e2e2e'],
        [-42.2, 101.2, '#1d1d1d'],
    ],
    4: [
        [26.3, 232.1, '#0c0c0c'],
        [181, 57, '#1d1d1d'],
        [-167.6, 60.4, '#1c1c1c'],
        [-147, 72, '#4a4a4a'],
        [-125, 101, '#676767'],
        [-79, 106, '#2b2b2b'],
    ],
    5: [
        [45.5, 167, '#262626'],
        [52, 150, '#252525'],
        [69.4, 125, '#303030'],
        [-33, 227.7, '#1a1a1a'],
        [151, 210, '#080808'],
        [-178, 184, '#2a2a2a'],
    ],
    6: [
        [65.6, 121, '#242424'],
        [-26, 194.6, '#1f1f1f'],
    ],
    7: [
        [85, 103.4, '#2c2c2c'],
        [20, 108.5, '#555555'],
        [-20, 106, '#4f4f4f'],
        [-39.4, 129, '#313131'],
    ],
    8: [[-175.5, 88, '#2a2a2a']],
    9: [[-7.4, 174, '#131313']],
    10: [
        [22, 56, '#3a3a3a'],
        [44.5, 74, '#2f2f2f'],
        [70, 159, '#202020'],
    ],
    11: [
        [-43.7, 30.4, '#1b1b1b'],
        [-71, 65.5, '#323232'],
    ],
    12: [[-121.7, 95, '#0a0a0a']],
    13: [
        [26, 67, '#626262'],
        [-23, 65, '#2d2d2d'],
        [-40, 79, '#3a3a3a'],
        [-44, 84, '#2e2e2e'],
        [-52, 100, '#4a4a4a'],
    ],
    16: [
        [167, 32, '#121212'],
        [-116, 75, '#515151'],
    ],
    17: [
        [124, 46, '#363636'],
        [-115, 60, '#242424'],
    ],
    18: [[-141, 104, '#535353']],
    19: [
        [34, 207, '#0d0d0d'],
        [-137, 282, '#0c0c0c'],
        [-21, 185, '#040404'],
    ],
    20: [
        [57.5, 108, '#171717'],
        [68, 154, '#232323'],
    ],
    21: [
        [11, 15, '#4e4e4e'],
        [-22, 15, '#343434'],
        [-35, 17, '#414141'],
        [-73, 42, '#0e0e0e'],
    ],
    22: [
        [-166, 118, '#111111'],
        [-144, 142, '#0c0c0c'],
        [-66, 220, '#181818'],
    ],
    25: [[-174, 168, '#242424']],
    26: [[134, 39, '#535353']],
    27: [
        [-166, 4, '#6d6d6d'],
        [-93, 36, '#1c1c1c'],
        [-38, 56, '#292929'],
    ],
    29: [
        [56, 178, '#3a3a3a'],
        [-13, 103, '#474747'],
    ],
    30: [
        [72.6, 120, '#111111'],
        [-120, 220, '#212121'],
    ],
    32: [
        [5, 163, '#373737'],
        [-109, 133, '#1f1f1f'],
    ],
    33: [
        [21, 53, '#575757'],
        [30, 58, '#4f4f4f'],
        [52, 82, '#282828'],
        [60, 100, '#4f4f4f'],
        [-140, 115, '#2d2d2d'],
    ],
    34: [
        [-16, 25, '#393939'],
        [11, 25, '#7a7a7a'],
        [25, 25, '#4d4d4d'],
        [34, 32, '#6b6b6b'],
        [60, 45, '#2e2e2e'],
        [70, 68, '#545454'],
    ],
    35: [
        [-47, 20, '#3c3c3c'],
        [-5, 13, '#2f2f2f'],
        [35, 18, '#3f3f3f'],
        [66, 35, '#2c2c2c'],
    ],
    36: [
        [-143, 34, '#222222'],
        [-13, 82, '#3e3e3e'],
    ],
    37: [
        [-158, 35, '#5b5b5b'],
        [-16, 40, '#2b2b2b'],
    ],
};

const BeautifulBackground: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;
        // Очищаем холст перед каждым рендером
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const numSteps = 100;
        let currentStep = 0;

        function drawLines() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            
            lines.forEach((line) => {
                const { point1, point2, color } = line;
                const startPoint = points[point1];
                const endPoint = points[point2];
                if (startPoint && endPoint) {
                    const startX = (startPoint.x * canvas!.width) / 100;
                    const startY = (startPoint.y * canvas!.height) / 100;
                    const endX = (endPoint.x * canvas!.width) / 100;
                    const endY = (endPoint.y * canvas!.height) / 100;

                    const currentX = startX +((endX - startX) * currentStep) / numSteps;
                    const currentY = startY + ((endY - startY) * currentStep) / numSteps;

                    ctx!.beginPath();
                    ctx!.moveTo(startX, startY);
                    ctx!.lineTo(currentX, currentY);
                    ctx!.strokeStyle = color;
                    ctx!.lineWidth = 1;
                    ctx!.stroke();
                }
            });
            for (let indexLine in inputArray) {
                const key = parseInt(indexLine);
                const { x, y } = points[key];
                const canvasX = Math.round((x * canvas!.width) / 100);
                const canvasY = Math.round((y * canvas!.height) / 100);
                for (const [angleLine, lengthLine, color] of inputArray[key]) {
                    const angleInRadians = (angleLine * Math.PI) / 180;
                    const endX = canvasX + Math.round(lengthLine* (currentStep / numSteps) * Math.cos(angleInRadians));
                    const endY = canvasY + Math.round(lengthLine* (currentStep / numSteps)* Math.sin(angleInRadians));
                    const gradient = ctx!.createLinearGradient(canvasX, canvasY, endX, endY);
                    gradient.addColorStop(0, color);
                    gradient.addColorStop(0.8, color + '80');
                    ctx!.beginPath();
                    ctx!.moveTo(canvasX, canvasY);
                    ctx!.lineTo(endX, endY);
                    ctx!.strokeStyle = gradient;
                    ctx!.lineWidth = 1;
                    ctx!.stroke();
                }
            }
            Object.values(points).forEach(({ x, y, radius }) => {
                const canvasX = Math.round((x * canvas!.width) / 100); // Преобразуем проценты в пиксели
                const canvasY = Math.round((y * canvas!.height) / 100);
    
                ctx!.beginPath();
                ctx!.arc(canvasX, canvasY, radius / 2, 0, Math.PI * 2); // Рисуем закрашенный круг радиусом 1 пиксель
                ctx!.fillStyle = 'white';
                ctx!.fill();
            });
            if (currentStep < numSteps) {
                currentStep++;
                setTimeout(() => {
                    requestAnimationFrame(drawLines);
                }, 30); 
            }
        }

        const animatePoints = () => {
            const pointsArray = Object.values(points);
          
            let currentRadius = 1;
            const maxRadius = 3;
            const radiusIncrement = 1;
            const delay = 500; // Задержка между появлением точек (в миллисекундах)
          
            const drawPoint = (x: number, y: number, radius: number) => {
              const canvasX = Math.round((x * canvas!.width) / 100); // Преобразуем проценты в пиксел
              const canvasY = Math.round((y * canvas!.height) / 100);
          
              ctx!.beginPath();
              ctx!.arc(canvasX, canvasY, radius / 2, 0, Math.PI * 2); // Рисуем закрашенный круг  
              ctx!.fillStyle = 'white';
              ctx!.fill();
            };
          
            const animate = () => {
              ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          
              pointsArray.forEach(({ x, y, radius }) => {
                if (radius <= currentRadius) {
                  drawPoint(x, y, radius);
                }
              });
          
              if (currentRadius < maxRadius) {
                currentRadius += radiusIncrement;
                setTimeout(animate, delay);
              }
            };
          
            animate();
          };
          
          
        animatePoints();
        setTimeout(()=>drawLines(), 1500);

        
        // Рисуем точкиb
       

    }, []);

    return <canvas ref={canvasRef} className={styles.BeautifulBackground} />;
};

export default BeautifulBackground;