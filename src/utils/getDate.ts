import { capitalize } from "./stringFunc";
import { timeTablelocalization } from "./../localizationData"
import { TimeTableData } from "../models/TimeTableData";

const daysOfWeek = timeTablelocalization.DayNameCutback;

const months = timeTablelocalization.mouthName;

const getCurrentDateInfo = (currentDate: Date) => {
  // Получение текущего дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
  const currentDayOfWeek = currentDate.getDay();
  // Получение текущего месяца (0 - январь, 1 - февраль, и т.д.)
  const currentMonth = currentDate.getMonth();
  // Получение текущего года
  const currentYear = currentDate.getFullYear();
  // Получение количества дней в текущем месяце
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Получение дня недели, с которого начался текущий месяц
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayOfWeek = firstDayOfMonth;

  return {
    currentDayOfWeek,       // Текущий день недели
    currentMonth,           //  Текущий месяц
    currentYear,            //  Текущий год
    daysInMonth,            //  Количество дней в текущем месяце
    firstDayOfWeek      //  День недели, с которого начался текущий месяц
  }
};

// Исправил твою функцию для получения номера недели. Получилось хорошо, вроде)) Все надо через тесты прогонять!
export const getNumderOfWeekAtYear = (date: Date = new Date()): number => {
  const currentDate = date;
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor((currentDate.getTime() - firstDayOfYear.getTime()) / 86400000);
  const currentWeek = Math.ceil((pastDaysOfYear + (firstDayOfYear.getDay() == 0 ? firstDayOfYear.getDay() + 7 : firstDayOfYear.getDay())) / 7);
  return currentWeek;
};
// Функция считает кол-во недель в месяце.
export const getAmountWeeksInMonth = (year: number, month: number) => {
  const currentDate = new Date(year, month);
  const dayOfWeekOnStartMonth = currentDate.getDay() == 0 ? 7 : currentDate.getDay();
  const amountDaysInMonth = new Date(year, month + 1, 0).getDate();
  const amountWeeksInMonth = Math.ceil((amountDaysInMonth + dayOfWeekOnStartMonth - 1) / 7);
  return amountWeeksInMonth;
};

export const getWeekNumber = (date: Date) => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
}

export const getWeekNumber2 = (year: number, month: number, day: number): number => {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);

  // Устанавливаем первый день недели в воскресенье
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));

  const yearStart = new Date(date.getFullYear(), 0, 1);

  // Получаем разницу в днях между первым днем недели и началом года
  const weekNumber = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return weekNumber;
}



// Функция для форматирования даты в указанном формате (день-месяц)
export const formatDate = (date: Date, lang: number): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString(['ru-RU', 'en-GB'][lang], options);
};

// Функция для получения границ дат на неделе в формате "начало-конец"
// Функцию переделал, логика получения diff попроще и все вроде правильно работает!
export const getWeekDateRange = (year: number, week: number, lang: number): string => {
  const startDate = new Date(year, 0, 1);
  const day = startDate.getDay();
  const diff = (week * 7) - (day == 0 ? 12 : day + 5);
  startDate.setDate(diff);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  let dateRange = '';

  if (startMonth === endMonth) {
    dateRange = `${startDate.getDate()} - ${endDate.getDate()} ${capitalize(formatDate(endDate, lang).split(' ')[1])}`;
  } else {
    dateRange = `${formatDate(startDate, lang).split(' ')[0]} ${capitalize(formatDate(startDate, lang).split(' ')[1])} - ${endDate.getDate()} ${capitalize(formatDate(endDate, lang).split(' ')[1])}`;
  }

  return dateRange;
};


export const getMonthFromWeekNumber = (year: number, weekNumber: number): number => {
  // Создаем новый объект Date
  const date = new Date(year, 0, 1);

  // Устанавливаем неделю на указанный номер недели
  date.setDate(date.getDate() + (weekNumber - 1) * 7);

  // Получаем месяц от 0 до 11
  const month = date.getMonth();

  return month;
}

export const getDayOfMonth = (year: number, month: number): number => {
  const nextMonth = new Date(year, month + 1, 0);
  return nextMonth.getDate();
}

export const getMonthName = (currentMonth: number, lang: number) => months[lang][currentMonth];
export const getDayOfWeekName = (currentDay: number, lang: number) => daysOfWeek[lang][currentDay];

export const getFullYearsOld = (dateOfBirth: number) => {
  const year = Math.trunc(dateOfBirth / 10000);
  const month = Math.trunc((dateOfBirth % 10000) / 100);
  const day = dateOfBirth % 100;
  const today = new Date();
  const isBirthdayAtYear = (today.getMonth() >= month - 1) && (today.getDate() >= day);
  const fullYearsOld = (today.getFullYear() - year) - (Number(!isBirthdayAtYear));
  return fullYearsOld;
}

export const convertDateInEngFormatString = (dateString: string) => {
  if (!dateString) return ''
  const parts = dateString.split('.');
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${monthNames[Number(parts[1])]} ${parts[0]}, ${parts[2]}`;
}

export const dateToStringDMY = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Прибавляем 1, так как месяцы начинаются с 0
  const year = date.getFullYear();

  return (day < 10 ? '0' + day : day) + '.' + (month < 10 ? '0' + month : month) + '.' + year;
}

export const dateToStringHM = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const isInPast = (date: Date): boolean => {
  const now = new Date();
  return date.getTime() < now.getTime();
};

export const lessonConvertNearLesson = (data: TimeTableData) => {
  const currentDate = new Date();
  const nearLessons = [];
  for (const year in data) {
    for (const month in data[year]) {
      for (const day in data[year][month]) {
        for (const lesson in data[year][month][day]) {
          const date = new Date(`${year}-${month}-${day}`);
          if (date > currentDate) {
            const { subject, lecturer } = data[year][month][day][lesson]
            nearLessons.push(
              {
                date,
                subject,
                lecturer
              }
            )
          }
        }
      }
    }
  }

  return nearLessons;
}

export const formatMinuties = (minutes: number, language: number): string => {
  const hours: number = Math.floor(minutes / 60);
  const remainderMinutes: number = minutes % 60;

  if (language === 1) {
      if (hours === 0) {
          return `${remainderMinutes} minutes`;
      } else if (remainderMinutes === 0) {
          if (hours === 1) {
              return '1 hour';
          } else {
              return `${hours} hours`;
          }
      } else {
          return `${hours} hour${hours === 1 ? '' : 's'} ${remainderMinutes} minutes`;
      }
  } else {
      if (hours === 0) {
          return `${remainderMinutes} минут`;
      } else if (remainderMinutes === 0) {
          if (hours === 1) {
              return '1 час';
          } else {
              return `${hours} часа`;
          }
      } else {
          return `${hours} час${hours === 1 ? '' : 'а'} ${remainderMinutes} минут`;
      }
  }
}

export default getCurrentDateInfo;