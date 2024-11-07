import { FC, useState, Dispatch, SetStateAction } from 'react';
import styles from './DateTimeDialogWindow.module.css';
import Calendar from '../Calendar/Calendar';
import DialodWindowLeft from './DialodWindowLeft';
import SelectTimeLoop from '../Calendar/SelectTimeLoop';

interface IDateTimeDialogWindow {
  stateDates: [string[], Dispatch<SetStateAction<string[]>>],
}

const DateTimeDialogWindow: FC<IDateTimeDialogWindow> = ({ stateDates }) => {
  const now = new Date();
  const [activeMonth, setActiveMonth] = useState<number>(now.getMonth());;
  const [activeYear, setActiveYear] = useState<number>(now.getFullYear());;
  const [activePoint, setActivePoint] = useState<number>(1);
  const [chousenDates, setChousenDates] = stateDates;
  const [chousePastDate, setChousePastDate] = useState<boolean>(false);
  const [addMountAtLoop, setAddMountAtLoop] = useState<number>(0);
  const [countLoop, setCountLoop] = useState<string>('');


  return (
    <div className={styles.dateTimeDialogWindowWrapper}>
      <div className={styles.dateTimeDialogWindowRows}>
        <DialodWindowLeft
          activePoint={activePoint}
          chousePastDate={chousePastDate}
          chousenDates={chousenDates}
          addMountAtLoop={addMountAtLoop}
          countLoop={countLoop}
          setActivePoint={setActivePoint}
          setChousePastDate={setChousePastDate}
          setChousenDates={setChousenDates}
          setCountLoop={setCountLoop}
        />
      </div>
      <div className={styles.dateTimeDialogWindowCalendar}>
        {activePoint != 2 ? <Calendar
          activeMonth={activeMonth}
          activeYear={activeYear}
          chousenDates={chousenDates}
          chousePastDate={chousePastDate}
          addMountAtLoop={addMountAtLoop}
          activePoint={activePoint}
          countLoop={countLoop}
          setActiveMonth={setActiveMonth}
          setActiveYear={setActiveYear}
          setChousenDates={setChousenDates}
          setChousePastDate={setChousePastDate}
        /> : <SelectTimeLoop
          setActivePoint={setActivePoint}
          chousenDates={chousenDates}
          setAddMountAtLoop={setAddMountAtLoop}
          addMountAtLoop={addMountAtLoop}

        />}
      </div>
    </div>
  )
}

export default DateTimeDialogWindow