export interface TimeTableData {
    [year: number]: TimeTableDataYear;
};

export interface TimeTableDataYear {
    [month: number]: TimeTableDataMonth;
}

export interface TimeTableDataMonth {
    [day: number]: TimeTableDataDay;
}

export interface TimeTableDataDay {
    [hour: number]: TimeTableDataLesson;
}

export interface TimeTableDataLesson {
    type: number;  //0 - other 1 - individual lesson 2 - group lesson 3 - open lesson 4 - intensive
    subject: string;
    students: string[];
    lecturer: string;
    duration: number;
    isConducted: boolean; // проведённый
    isRescheduled: boolean; // перенесённый
    startMinute: number;
    numberInCourse: number; // номер урока в курсе
    lessonTopic: string;  // тема урока
    tools: string[], // что понадобится на уроке
    assignment: string, //задание к уроку
    teacherNotes: string, //заметки учителя
    studentNotes: string, //заметки ученика
    description: string,
    teacherChat: {
        [key: number]: string;
    }[] | {};
}