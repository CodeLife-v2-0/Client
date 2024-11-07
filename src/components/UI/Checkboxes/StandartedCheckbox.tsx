import { FC, ReactNode, InputHTMLAttributes } from 'react';

interface IStandartedCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const StandartedCheckbox: FC<IStandartedCheckbox> = ({ children, ...props }) => {
  return (
    <label>
      <input type="checkbox" {...props} /> 
      {children}
    </label>
  );
};

export default StandartedCheckbox;
