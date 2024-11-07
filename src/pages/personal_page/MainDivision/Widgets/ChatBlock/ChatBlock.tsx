import { CSSProperties, FC, useState, Dispatch, SetStateAction } from 'react'
import styles from './ChatBlock.module.css'
import { ContentCategory } from '../../../PersonalPage'

enum onlineStatus {
    offline,
    desctop,
    mobile
}
interface person {
    firstName: string,
    lastName: string,
    onlineStatus: number,
    personalImg: string,
    unreadedMsg: number,
    subjects: string[],
    chatId: string,
}
const friends: person[] = [
    // {
    //     firstName: 'Малина',
    //     lastName: 'Асафьева',
    //     onlineStatus: onlineStatus.desctop,
    //     personalImg: 'Malina',
    //     unreadedMsg: 0,
    //     subjects: ['Python', 'Web'],
    //     chatId: '1',

    // },
    // {
    //     firstName: 'Иван',
    //     lastName: 'Маликов',
    //     onlineStatus: onlineStatus.mobile,
    //     personalImg: 'Ivan',
    //     unreadedMsg: 3,
    //     subjects: ['C++'],
    //     chatId: '2',
    // },
    // {
    //     firstName: 'Слава',
    //     lastName: 'Агатов',
    //     onlineStatus: onlineStatus.offline,
    //     personalImg: 'Yaebualibabu',
    //     unreadedMsg: 0,
    //     subjects: ['Java', '1С', 'C'],
    //     chatId: '3',
    // },
    // {
    //     firstName: 'Афоня',
    //     lastName: 'Петров',
    //     onlineStatus: onlineStatus.mobile,
    //     personalImg: 'Ivan',
    //     unreadedMsg: 1,
    //     subjects: ['Html', 'React'],
    //     chatId: '4',
    // },
    // {
    //     firstName: 'Лана',
    //     lastName: 'Мороз',
    //     onlineStatus: onlineStatus.offline,
    //     personalImg: 'Malina',
    //     unreadedMsg: 7,
    //     subjects: ['Fortran', 'ОУК'],
    //     chatId: '5',
    // },
]

const tutors: person[] = [
    {
        firstName: 'Елена',
        lastName: 'Владимировна',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'elenaV',
        unreadedMsg: 0,
        subjects: ['Python', 'Web'],
        chatId: '6',
    },
    {
        firstName: 'Александр',
        lastName: 'Николаевич',
        onlineStatus: onlineStatus.mobile,
        personalImg: 'Ivan',
        unreadedMsg: 3,
        subjects: ['C++'],
        chatId: '7',
    },
    {
        firstName: 'Наталья',
        lastName: 'Васильевна',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'Yaebualibabu',
        unreadedMsg: 0,
        subjects: ['Java', '1С', 'C'],
        chatId: '8',
    },
    {
        firstName: 'Андрей',
        lastName: 'Недобренко',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'neDobrenko',
        unreadedMsg: 1,
        subjects: ['Java', 'C++'],
        chatId: 'Не Добренко, а Пидоренко',
    },
    {
        firstName: 'Андрей',
        lastName: 'Апидренко',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'aPidrenko',
        unreadedMsg: 7,
        subjects: ['Модификации Minecraft', 'Скрипты Roblox'],
        chatId: '10',
    },
]

const support: person[] = [
    {
        firstName: 'Техническая',
        lastName: 'поддержка',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'supportAllTypes',
        unreadedMsg: 0,
        subjects: ['На связи 24/7'],
        chatId: '-1',
    },
    {
        firstName: 'Вопросы по',
        lastName: 'оплате',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'supportAllTypes',
        unreadedMsg: 0,
        subjects: ['Заявки принимаются моментально'],
        chatId: '-2',
    },
    {
        firstName: 'Учебный',
        lastName: 'отдел',
        onlineStatus: onlineStatus.desctop,
        personalImg: 'supportAllTypes',
        unreadedMsg: 0,
        subjects: ['Заявки принимаются моментально'],
        chatId: '-3',
    },
]

enum echatCategory {
    friends,
    tutors,
    support
}
const desctopOnlineStyles: CSSProperties = {
    width: '0.78125vw',
    top: '89.64%'
}
const mobileOnlineStyles: CSSProperties = {
    width: '0.52083vw',
    top: '91.3%'
}

const activeCategoryStyles: CSSProperties = {
    cursor: 'default',
    userSelect: 'all',
    '--extend__width': '60%',
} as CSSProperties

interface IChatBlock {
    setActiveContentCategory: Dispatch<SetStateAction<number>>;
    setActiveChatIdMsgBlock: Dispatch<SetStateAction<string>>;
}

const ChatBlock: FC<IChatBlock> = ({ setActiveContentCategory, setActiveChatIdMsgBlock }) => {
    const [chatCategory, setChatCategory] = useState<number>(echatCategory.friends);
    const activeCategory = (
        chatCategory === echatCategory.friends
            ? friends
            : chatCategory === echatCategory.tutors
                ? tutors
                : support
    )
    const chatContent = activeCategory.map(
        (human, index) => <div
            className={styles.msg__Content}
            key={`msg__Content__${chatCategory}__${index}`}
            onClick={() => {
                setActiveChatIdMsgBlock(human.chatId);
                setActiveContentCategory(ContentCategory.Messenger);
            }}
        >
            <div className={styles.msg__Content__left}>
                <div className={styles.avatar__Block}>
                    <img src={`/img/temporaryAvatars/${human.personalImg}.png`}
                        alt=''
                        className={styles.personal__Img} />
                    {human.onlineStatus && <img
                        src={`/svg/chatIcons/${human.onlineStatus === onlineStatus.desctop ? 'desctopOnline' : 'mobileOnline'}.svg`}
                        alt=''
                        className={styles.online__Status}
                        style={human.onlineStatus === onlineStatus.desctop
                            ? desctopOnlineStyles
                            : mobileOnlineStyles}
                    />}
                </div>
                <div className={styles.txt__Block}>
                    <h1>{human.firstName} {human.lastName}</h1>
                    <p>{human.subjects.join(', ')}</p>
                </div>
            </div>
            <div className={styles.msg__Content__right}>
                <div className={styles.unreaded__Msg} style={{ opacity: human.unreadedMsg ? '1' : '0' }}>{human.unreadedMsg}</div>
                <svg
                    viewBox="0 0 16 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.img__Arrow}>
                    <path
                        d="M1.80416 30.2273C1.47267 30.2273 1.14117 30.1058 0.879471 29.8453C0.37351 29.3419 0.37351 28.5085 0.879471 28.005L12.2549 16.6854C13.0923 15.852 13.0923 14.4979 12.2549 13.6645L0.879471 2.34487C0.37351 1.84139 0.37351 1.00804 0.879471 0.504564C1.38543 0.00108296 2.22288 0.00108296 2.72884 0.504564L14.1042 11.8242C14.994 12.7096 15.5 13.9076 15.5 15.175C15.5 16.4423 15.0115 17.6403 14.1042 18.5257L2.72884 29.8453C2.46714 30.0884 2.13565 30.2273 1.80416 30.2273Z"
                    />
                </svg>
            </div>
        </div>)
    const nonExistentContent = <div
        className={styles.non__Existing__Friends__wrapper}
    >
        <div className={styles.non__Existing__Friends__Inner__Content}>
            <h1>Нет актуальных чатов</h1>
            <div
                onClick={() => {
                    setActiveChatIdMsgBlock('NewChat');
                    setActiveContentCategory(ContentCategory.Messenger);
                }}
                className={styles.cool__Button__wrapper}
            >
                <div className={styles.animated__cool__Button}>
                    <p>Добавить</p>
                </div>
                <img src='/svg/chaticons/plusPerson.svg' alt='' className={styles.plusPerson__Button} />
            </div>
        </div>
    </div>
    return (
        <section className={styles.main__Chat__Block}>
            <div className={styles.chat__Block__Menu}>
                <div
                    onClick={() => { if (chatCategory !== echatCategory.friends) setChatCategory(echatCategory.friends) }}
                    className={styles.chat__Division}
                    style={chatCategory === echatCategory.friends ? activeCategoryStyles : { cursor: 'pointer' }}
                >
                    <img
                        src='/svg/chaticons/groupChat.svg'
                        alt=''
                        className={`${styles.chat__Icons} ${styles.chat__Group}`}
                    />
                </div>
                <div
                    onClick={() => { if (chatCategory !== echatCategory.tutors) setChatCategory(echatCategory.tutors) }}
                    className={styles.chat__Division}
                    style={chatCategory === echatCategory.tutors ? activeCategoryStyles : { cursor: 'pointer' }}
                >
                    <img
                        src='/svg/chaticons/tutorChat.svg'
                        alt=''
                        className={`${styles.chat__Icons} ${styles.chat__Tutor}`}
                    />
                </div>
                <div
                    onClick={() => { if (chatCategory !== echatCategory.support) setChatCategory(echatCategory.support) }}
                    className={styles.chat__Division}
                    style={chatCategory === echatCategory.support ? activeCategoryStyles : { cursor: 'pointer' }}
                >
                    <img
                        src='/svg/chaticons/supportChat.svg'
                        alt=''
                        className={`${styles.chat__Icons} ${styles.chat__Support}`}
                    />
                </div>
            </div>
            <div className={styles.link__Chat__Block}
                style={{ paddingRight: activeCategory.length && activeCategory.length < 4 ? '0.57292vw' : '' }}
            >
                {activeCategory.length ? chatContent : nonExistentContent}
            </div>
        </section>
    )
}

export default ChatBlock