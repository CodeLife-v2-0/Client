import { FC, useEffect, useRef, useCallback } from 'react';
import styles from './LongMatrix.module.css';

const CHARACTERS: string =
  'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン';

interface IColumn {
  x: number;
  y: number;
  fontSize: number;
  canvasHeight: number;
  symbol: string;
  color: string;
}

const LongMatrix: FC<{ charsColor?: string }> = ({ charsColor = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<IColumn[]>([]);

  const handleResize = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      const fontSize = 16;
      const columnsCount = Math.floor(innerWidth / fontSize);

      let columns = columnsRef.current;
      if (columns.length !== columnsCount) {
        columns = Array.from({ length: columnsCount }, (_, i) => {
          if (columns[i]) {
            return columns[i];
          }
          return {
            x: i * fontSize,
            y: Math.floor(Math.random() * innerHeight),
            fontSize,
            canvasHeight: innerHeight,
            symbol: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            color: charsColor == "" ? '#009aad' : charsColor,
          };
        });

        columnsRef.current = columns;
      }
    }
  }, [charsColor]);


  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      let animationFrameId: number;

      const draw = () => {
        const { innerWidth, innerHeight } = window;

        ctx.fillStyle = 'rgba(0,0,0,0.055)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        let scrollTop = window.scrollY;
        let foneColor = 'white';

        if (charsColor) {
          foneColor = charsColor;
        }
        else if (scrollTop < innerHeight) {
          let relative = scrollTop / innerHeight;
          foneColor = `rgb(${45 - 45 * relative}, ${29 * relative + 107}, ${154 * relative + 40
            })`;
        } else if (scrollTop < innerHeight * 2) {
          let relative = scrollTop / innerHeight - 1;
          foneColor = `rgb(${255 * relative}, ${119 * relative + 136}, ${61 * relative + 194
            })`;
        };
        ctx.fillStyle = foneColor;

        const updatedColumns = columnsRef.current.map((column) => {
          const { x, y, fontSize, canvasHeight } = column;

          let newY = y + Math.floor(Math.random() * 3) * fontSize / 2;
          let newSymbol = column.symbol;

          if (newY > canvasHeight) {
            newY = 0;
            newSymbol = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }

          if (newY % fontSize === 0) {
            ctx.fillStyle = foneColor;
            ctx.fillText(newSymbol, x, newY);
          }

          return {
            ...column,
            y: newY,
            symbol: newSymbol,
            color: foneColor,
          };
        });

        columnsRef.current = updatedColumns;

        animationFrameId = requestAnimationFrame(draw);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      animationFrameId = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [charsColor, handleResize, canvasRef]);

  return <canvas ref={canvasRef} className={styles.matrix}></canvas>;
};

export default LongMatrix;