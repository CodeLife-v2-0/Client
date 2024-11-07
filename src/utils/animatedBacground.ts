import { NavigateFunction } from 'react-router-dom';
import {MouseEvent} from 'react';

const bacgroundDiv: HTMLElement | null = document.getElementById('animatedBackground');

export const animatedBacgroundCreate = (): void => {
    if (bacgroundDiv) {
        bacgroundDiv.style.display = 'block';
        setTimeout(() => {
            bacgroundDiv.style.opacity = '1';
        }, 100);
    }
};

export const animatedBacgroundDelete = (): void => {
    if (bacgroundDiv) {
        bacgroundDiv.style.opacity = '0';
        setTimeout(() => {
            bacgroundDiv.style.display = 'none';
        }, 1000);
    }
}

export type EventAB = MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>;

const generateFunctionTransfer = (history: NavigateFunction, paths: string[]) => {
    animatedBacgroundDelete();
  
    const generateFunction = (onePath: string) => {
    return (event: EventAB) => {
        event.preventDefault();
        window.onresize = null;
        animatedBacgroundCreate();
        setTimeout(() => {
          history(onePath, { replace: true });
        }, 1000);
      };
    };
  
    const buffer: ((event: EventAB) => void)[] = [];
    for (const path of paths) {
        buffer.push(generateFunction(path));
    }
    return buffer;
};

export const generateFunctionTransferWithoutEvent = (history: NavigateFunction, paths: string[]) => {
    animatedBacgroundDelete();
    const generateFunction = (onePath: string) => {
    return () => {
        window.onresize = null;
        animatedBacgroundCreate();
        setTimeout(() => {
          history(onePath, { replace: true });
        }, 1000);
      };
    };
  
    const buffer: (() => void)[] = [];
    for (const path of paths) {
        buffer.push(generateFunction(path));
    }
    return buffer;
};

export default generateFunctionTransfer;