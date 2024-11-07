import { ReactNode, MouseEvent, FC } from 'react';
import classes from './DesignButton.module.css';

interface DesignButtonProps {
  idenficator: string;
  onClickActive: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const DesignButton: FC<DesignButtonProps> = ({ idenficator, onClickActive, children }) => {
  return (
    <button className={classes.DesignButton} id={idenficator} onClick={onClickActive}>
      {children}
    </button>
  );
};

export default DesignButton;
