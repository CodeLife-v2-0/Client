

export const enum prospectsType {
    Salary,
    Stats,
}

export const ddata = {
    generalInformation: 'React - это мощная и популярная библиотека JavaScript для разработки пользовательских интерфейсов. Она позволяет создавать масштабируемые и переиспользуемые компоненты, которые обеспечивают динамичное и эффективное отображение данных. React использует виртуальный DOM и умный механизм обновления, что делает приложения быстрыми и отзывчивыми. Благодаря своей гибкости и разнообразным инструментам, React стал незаменимым инструментом для разработки современных веб-приложений.',
    newSkills: [
        {
            title: 'Визуальное мышление',
            body: 'Разработка навыков визуального мышления, которые помогут вам лучше визуализировать и структурировать данные, для решения сложных бизнес-задач'
        },
        {
            title: 'Способы презентации данных',
            body: 'Овладение искусством сторителлинга и эффективными методами представления данных, чтобы делать информацию более доступной и убедительной для клиентов и заинтересованных сторон'
        },
        {
            title: 'Графическая подготовка материалов',
            body: 'Получение навыков работы с инструментами для создания визуальных материалов, позволяющих представить сложные данные в виде интересных и понятных инфографиков'
        },
        {
            title: 'Работа с инструментами',
            body: 'Изучение и использование онлайн-инструментов для создания профессиональных инфографик, включая возможности создания картодиаграмм, анимации данных и разработки дашбордов с помощью Tableau'
        },
        {
            title: 'Истории из данных',
            body: 'Научитесь находить увлекательные истории в данных и умело передавать их клиентам, решая бизнес-задачи и демонстрируя технологичность и инновационность в вашей работе'
        },
        {
            title: 'Интерактивная и видеоинфографика',
            body: 'Получите навыки создания интерактивных и видеоинфографик, начиная с разработки сценария и заканчивая созданием анимации, чтобы выбрать наиболее подходящий тип инфографики для вашей целевой аудитории'
        },
    ],
    candidateData: [
        {
            title: 'Новички в программировании',
            body: 'Курс предоставляет введение в React и основные принципы разработки веб-приложений. Он будет полезен для тех, кто только начинает свой путь в программировании и хочет освоить разработку с использованием React.',
            logo: 'junior'
        },
        {
            title: 'Веб-разработчики, переключающиеся на React',
            body: 'Если вы уже знакомы с веб-разработкой, но хотите изучить React и улучшить свои навыки, этот курс поможет вам освоить основы React и перейти на разработку с использованием этой библиотеки.',
            logo: 'disainer'
        },
        {
            title:
                'Фронтенд-разработчики, желающие расширить свои знания',
            body: 'Если вы уже работаете с React, но хотите углубить свои знания и ознакомиться с передовыми концепциями и техниками, предлагаемыми в React, этот курс поможет вам стать более опытным разработчиком.',
            logo: 'middleMens'
        },
        {
            title: 'Студенты и учащиеся',
            body: 'Курс может быть полезен студентам и учащимся, изучающим веб-разработку или компьютерные науки. Он предоставляет практическую основу и позволяет применить полученные знания в реальных проектах.',
            logo: 'students'
        },
        {
            title: 'Профессиональные разработчики, желающие обновить свои навыки',
            body: 'Если вы уже работаете в сфере разработки программного обеспечения и хотите обновить свои навыки и включить React в свой арсенал инструментов, этот курс поможет вам освоить React и применить его в ваших проектах.',
            logo: 'master'
        },
    ],
    prospects: [
        {
            type: prospectsType.Salary,
            content: {
                data: [
                    {
                        nameScale: 'Junior',
                        valueScale: 1000
                    },
                    {
                        nameScale: 'Middle',
                        valueScale: 5000
                    },
                    {
                        nameScale: 'Senior',
                        valueScale: 10000
                    },
                ],
                title: 'Средняя зароботная плата',
            }
        },
        {
            type: prospectsType.Stats,
            content: {
                dataStats: [
                    {
                        title: '9/10',
                        borderText: 'САМЫХ',
                        body: 'популярных сайтов используют React',
                        width: 26.134
                    },
                    {
                        title: '93%',
                        borderText: 'РАЗРАБОТЧИКОВ',
                        body: 'по опросу Stack Overwflow выбирают React в своих проектах',
                        width: 39.733
                    },
                    {
                        title: '130к',
                        borderText: '$ В ГОД',
                        body: 'средняя зарплата в Европе ',
                        width: 25.867
                    },
                    {
                        title: '∞',
                        borderText: 'БЕСЦЕННО',
                        body: 'менять мир в лучшую сторону',
                        width: 29.867
                    },
                ],
                marginLeft: 12,
                between: 16.8,
            }
        }
    ],
    programDara: {
        "Введение в React": [
            "Введение в React и его основные принципы",
            "Установка окружения разработки с использованием Create React App",
            "Создание и рендеринг компонентов React",
            "Работа с JSX и основными элементами интерфейса"
        ],
        "Основы разработки в React": [
            "Управление состоянием компонентов с помощью useState хука",
            "Разработка компонентов форм и обработка событий",
            "Работа с условным рендерингом и списками компонентов",
            "Использование жизненного цикла компонентов и хуков useEffect и useMemo"
        ],
        "Маршрутизация и управление состоянием": [
            "Навигация и маршрутизация с использованием React Router",
            "Управление глобальным состоянием приложения с помощью Redux",
            "Работа с асинхронными операциями и Redux Thunk",
            "Организация кода и структуры проекта"
        ],
        "Работа с внешними библиотеками и API": [
            "Интеграция сторонних компонентов и библиотек, таких как Material-UI или Ant Design",
            "Взаимодействие с внешними API и обработка данных",
            "Аутентификация и авторизация пользователей в React-приложении",
            "Оптимизация производительности с помощью мемоизации и ленивой загрузки"
        ],
        "Продвинутые концепции и разработка приложения": [
            "Использование контекста и провайдеров для обмена данными между компонентами",
            "Тестирование компонентов и приложения с использованием Jest и React Testing Library",
            "Развертывание React-приложения на хостинге или в облаке",
            "Оптимизация производительности приложения и обработка ошибок"
        ]
    },
    resultData: [
        {
            title: 'Что вы получите',
            align: 'flex-end',
            content: [
                {
                    title: 'ТВОРЧЕСКАЯ СВОБОДА И САМОРЕАЛИЗАЦИЯ',
                    text: 'Вы сможете применять свои идеи и воплощать их в реальность, создавая уникальные веб-приложения и взаимодействуя с миллионами пользователей.',
                    logo: 'creative_free',
                },
                {
                    title: 'ПОВЫШЕНИЕ КАРЬЕРНЫХ ПЕРСПЕКТИВ',
                    text: 'Знание React востребованный навык на рынке труда. Вы увеличите свою ценность для работодателей и откроете новые возможности для карьерного роста.',
                    logo: 'seccesfull',
                },
                {
                    title: 'СОЗДАНИЕ ПОТРЯСАЮЩИХ ЭМОЦИЙ',
                    text: ' Вы научитесь созданию интерфейсов, которые делают ваши приложения удобными, интуитивно понятными и привлекательными для пользователей.',
                    logo: 'users_expiriens',
                },
            ],
        },
    ]
}