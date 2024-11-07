export interface ISlide {
    title: string[];
    body: string[];
    img?: string
    isInto?: boolean;
}

interface ISlidersData {
    [key: number]: ISlide;
}

const slidersData: ISlidersData = {
    1: {
        title: ['Изменим код жизни?', 'Change the code of life?'],
        body: [`Наша команда искренне верит в то, что каждый человек способен достичь успеха и стать выдающимся программистом.
        Мы убеждены, что уже в скором будущем только ваша фантазия станет вашим единственным сдерживающим фактором.
        Каждая ваша идея может стать исходной точкой для создания нового, потрясающего проекта.`,`Our team sincerely believes that everyone
        is capable of achieving success and becoming an outstanding programmer. We are convinced that in the near future only your imagination
        will become your only deterrent. Each of your ideas can become a starting point for creating a new, amazing project.`],
        isInto: true,
    },
    2: {
        title: ['Новости о школе','News about the school'],
        body: [`Школа программирования представляет новую программу обучения, разработанную для помощи студентам в освоении передовых технологий
        и получении практического опыта. Присоединяйтесь к нам и расширьте свои знания в мире программирования!`, `The School of Programming
        presents a new training program designed to help students master advanced technologies and gain practical experience.
        Join us and expand your knowledge in the world of programming!`],
        isInto: false,
    },
    3: {
        title: ['Акции школы','School promotions'],
        body: [`Не упустите уникальную возможность! Школа программирования предлагает специальные акции на обучение новых студентов. Получите доступ
        к высококачественному образованию по выгодной цене и расширьте свои навыки в программировании.`,`Don't miss this unique opportunity!
        The programming school offers special promotions for training new students. Get access to high-quality education at a bargain
        price and expand your programming skills.`],
        isInto: false,
    },
    4: {
        title: ['Интенсивный курс разработки веб-сайтов','Intensive course of website development.'],
        body: [`Приглашаем вас принять участие в нашем интенсивном курсе разработки веб-сайтов. Узнайте основы фронтенда и бэкенда, научитесь
        создавать динамические и привлекательные веб-приложения. Зарегистрируйтесь сегодня и станьте востребованным веб-разработчиком!`,`We invite
        you to take part in our intensive website development course. Learn the basics of frontend and backend, learn how to create dynamic and
        attractive web applications. Register today and become a sought-after web developer!`],
        isInto: false,
    },
}

export default slidersData;