import { FC, useContext, useState, useEffect, MouseEvent, Dispatch, SetStateAction, useRef, CSSProperties, ReactNode } from 'react'
import { Context } from '../../../..'
import styles from './Activities.module.css'
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import AdminService from '../../../../servies/AdminService';
import { ILecruter } from '../../../../models/Lecturer';
import { IUserR } from '../../../../models/IUserR';
import { ActivitiesData } from '../../../../localizationData'
import DropDownWithImg from '../../../../components/UI/DropDownWithImg/DropDownWithImg';
import { observer } from 'mobx-react-lite';
import UserService from '../../../../servies/UserService';
import { ICourseR } from '../../../../models/Course';
import DateTimeDialogWindow from '../../../../components/UI/Datetime/DatetimeDialodWindow/DateTimeDialogWindow';
import DialogWindowFillEmail from './DialogWindowFillEmail';
import DialogWindowCheckAll from './DialogWindowCheckAll';
import { dateToStringDMY, dateToStringHM, isInPast } from '../../../../utils/getDate';
import { IActivites } from '../../../../models/Activites';
import CubeAdder from '../../../../components/Decorations/TableLoader/CubeAdder';
import { motion, AnimatePresence } from 'framer-motion'
import ParticipantsSelectionWindow from './ParticipantsSelectionWindow/ParticipantsSelectionWindow';
import GroupSelectionWindow from './GroupSelectionWindow/GroupSelectionWindow';
import PrivateImage from '../../../../components/PA/PrivateImage/PrivateImage';
import DisabledInput from '../../../../components/UI/DisabledInput/DisabledInput';
import DropdownTimeSelect from '../../../../components/UI/DropdownTimeSelect/DropdownTimeSelect';


export const defaultPhrase = 'мир Code Life рад открыть для тебя новые границы. Мы гарантируем предоставление тебе новых  возможностей для расширения твоего кругозора и улучшения твоей жизни.';
export interface AvatarList {
    [key: string]: ReactNode;
}

const fetchData = async () => {
    try {
        const requiredFieldsLecruters = 'userId subjects';
        const requiredFieldsUsers = 'name surName avatar';
        const requriedCourses = 'name';

        const responseLecruters = await AdminService.getLecruters(requiredFieldsLecruters);
        const responseUsers = await AdminService.getUsers(requiredFieldsUsers, 0, 100);
        const responseCourses = await UserService.getCourses(requriedCourses)
        if (responseLecruters.data.lecruters && responseUsers.data.users && responseCourses.data.courses) {
            const lecturers: ILecruter[] = responseLecruters.data.lecruters;
            const users: IUserR[] = responseUsers.data.users;
            const courses: ICourseR[] = responseCourses.data.courses;
            if (lecturers && users && courses) {
                const lecturersList: IUserR[] = [];
                for (let lecturer of lecturers) {
                    const userByLecturerId = await AdminService.getUserById(lecturer.userId, requiredFieldsUsers);
                    if (userByLecturerId.data.user) lecturersList.push({ ...userByLecturerId.data.user, subjects: lecturer.subjects });
                }
                if (!lecturersList.length || !users.length) return null;
                return { lecturersList, userList: users, courseList: courses };
            }
        }
        return null;
    } catch (error) {
        console.log('Ошибка при получении данных: ' + error);
    }
};

export enum FieldDR {
    type,
    lector,
    participants,
    duration,
    groupName,
    subject,
    frequency,
}

interface IDialogRow {
    variablesList: string[];
    placeholderTitle: string;
    example: string;
    lecruters: IUserR[];
    users: IUserR[];
    courses: ICourseR[];
    index: number;
    inputState: [string, Dispatch<SetStateAction<string>>];
    checkState: Dispatch<SetStateAction<boolean>>;
    textState: [string, Dispatch<SetStateAction<string>>];
    setTitle: Dispatch<SetStateAction<string>>;
    setHint: Dispatch<SetStateAction<string>>;
    avatar: AvatarList;
    isGroup: boolean;
}

const DialogRow: FC<IDialogRow> = ({
    variablesList,
    placeholderTitle,
    example,
    lecruters,
    users,
    index,
    courses,
    inputState,
    checkState,
    textState,
    setTitle,
    setHint,
    avatar,
    isGroup
}) => {
    return <div className={styles.dialog__row}>
        {[FieldDR.lector, FieldDR.subject, FieldDR.participants].includes(index)
            ? <DropDownWithImg
                elements={index === FieldDR.lector ? lecruters : index === FieldDR.participants ? users : courses}
                title={placeholderTitle}
                setHint={setHint}
                signature={index}
                example={example}
                inputState={inputState}
                checkState={checkState}
                textState={textState}
                setTitle={setTitle}
                unselectedLogo={index === FieldDR.lector ? 'lector' : index === FieldDR.participants ? 'group' : 'lesson'}
                avatar={avatar}
            />
            : index === FieldDR.groupName
                ? <>
                    <DisabledInput
                        isActive={isGroup}
                        inputState={inputState}
                        checkState={checkState}
                        setHint={setHint}
                        setTitle={setTitle}
                    />
                    <div className={styles.invisibleBlock} />
                </>
                : index === FieldDR.duration
                    ? <>
                        <DropdownTimeSelect
                            inputState={inputState}
                            title={placeholderTitle}
                            checkState={checkState}
                            setHint={setHint}
                            setTitle={setTitle}
                        />
                        <div className={styles.invisibleBlock} />
                    </>
                    : <Dropdown
                        elements={variablesList}
                        title={placeholderTitle}
                        setHint={setHint}
                        signature={index}
                        inputState={inputState}
                        checkState={checkState}
                        setTitle={setTitle}
                    />
        }
    </div>
}

const { dialogWindowContent } = ActivitiesData;

interface IDialogCreateActivite {
    closeDialog: () => void;
    lecruters: IUserR[];
    users: IUserR[];
    courses: ICourseR[];
    avatar: AvatarList;
}

export interface shortInfo {
    name: string,
    avatar: string,
    email: string,
}

const enum DP {
    mainInfo,
    selectDateTime,
    fillEmail,
    checkAll,
}

const DialogCreateActivite: FC<IDialogCreateActivite> = ({
    closeDialog,
    lecruters,
    users,
    courses,
    avatar
}) => {
    const [hint, setHint] = useState('');
    const [title, setTitle] = useState('');
    const [isStudentChoiceCelected, hasStudentChoiceCelected] = useState(true);
    const allInputs = Array(Object.keys(FieldDR).length / 2).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][];
    useEffect(() => {
        allInputs[FieldDR.frequency][1](ActivitiesData.dialogWindowContent[FieldDR.frequency].variablesList[store.isEng][0]);
    }, [])
    const stateDates = useState<string[]>([]);
    const allInputsCheck = Array(Object.keys(FieldDR).length / 2).fill(false).map(useState) as [boolean, Dispatch<SetStateAction<boolean>>][];
    const allInputsTextState = Array(Object.keys(FieldDR).length / 2).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][];
    const { store } = useContext(Context);
    const [dialogPage, setDialogPage] = useState<number>(DP.mainInfo);
    const notSelectedIndividualActivities = allInputs[FieldDR.type][0] !== dialogWindowContent[FieldDR.type].variablesList[store.isEng][1];
    const isActiveRightFormMainPage = allInputs[FieldDR.participants][0] && notSelectedIndividualActivities;
    const isGroup = allInputs[FieldDR.participants][0].includes(';') || notSelectedIndividualActivities;
    const correctFilling = allInputsCheck.every(
        (element, index) => element[0] === true
            || [FieldDR.participants, FieldDR.frequency].includes(index)
    );
    const letterTextState = useState(defaultPhrase);
    const mainDialogWindow = <>
        <div className={styles.dialog__wrapper__main_dialog__left}>
            {dialogWindowContent.map(
                (rowContent, index) => {
                    return <DialogRow
                        variablesList={rowContent.variablesList[store.isEng]}
                        placeholderTitle={rowContent.placeholder[store.isEng]}
                        example={rowContent.example[store.isEng]}
                        lecruters={lecruters}
                        users={users}
                        index={index}
                        courses={courses}
                        key={`dialog-rowField-${index}`}
                        inputState={allInputs[index]}
                        checkState={allInputsCheck[index][1]}
                        textState={allInputsTextState[index]}
                        setTitle={setTitle}
                        setHint={setHint}
                        avatar={avatar}
                        isGroup={isGroup}
                    />
                }
            )}
        </div>
        <div className={styles.dialog__wrapper__main_dialog__right}>
            <div className={styles.dialog__wrapper__main_dialog__right__hintBlock}>
                <h2>{title}</h2>
                <p>{hint}</p>
            </div>
            <div className={styles.dialog__wrapper__main_dialog__right_windowMultiSelect}>
                <div
                    className={styles.dialog__wrapper__main_dialog__right_windowMultiSelect__header}
                    style={
                        !isActiveRightFormMainPage
                            ? {
                                '--headerTextColor': '#343434',
                                '--headerBorderColor': '#343434',
                                userSelect: 'none'
                            } as CSSProperties
                            : {}
                    }
                >
                    <div
                        className={
                            !isActiveRightFormMainPage || isStudentChoiceCelected
                                ? styles.dialog__wrapper__main_dialog__right_windowMultiSelect__selectTitle
                                : ''
                        }
                        onClick={() => {
                            if (isActiveRightFormMainPage && !isStudentChoiceCelected) hasStudentChoiceCelected(true)
                        }
                        }
                    >
                        Выбор участников
                    </div>
                    <div
                        className={
                            !isActiveRightFormMainPage || !isStudentChoiceCelected
                                ? styles.dialog__wrapper__main_dialog__right_windowMultiSelect__selectTitle
                                : ''
                        }
                        onClick={() => {
                            if (isActiveRightFormMainPage && isStudentChoiceCelected) hasStudentChoiceCelected(false)
                        }}
                    >
                        Выбор группы
                    </div>
                </div>
                {isActiveRightFormMainPage
                    ? isStudentChoiceCelected ?
                        <ParticipantsSelectionWindow
                            users={users}
                            avatar={avatar}
                            dataState={allInputs[FieldDR.participants]}
                        /> :
                        <GroupSelectionWindow />
                    : <div className={styles.dialog__wrapper__main_dialog__right_windowMultiSelect__passive}>
                        Окно множественного выбора
                    </div>

                }
            </div>
        </div>
    </>
    const dateTimeDialog = <DateTimeDialogWindow
        stateDates={stateDates}
    />
    const selectUsers = allInputs[FieldDR.participants][0].split(' ');
    const fillEmailDialogWindow = <div></div>//<DialogWindowFillEmail
    //     letterTextState={letterTextState}
    //     recipients={
    //         (selectUsers.map(id => id && users.find(el => el._id === id)) as IUserR[]).map(
    //             el => {
    //                 return {
    //                     'name': `${el.surName} ${el.name}`,
    //                     'email': el.email || '',
    //                     'avatar': el.avatar || ''
    //                 } as shortInfo
    //             }
    //         )
    //     }
    // />
    const checkAllDialogWindow = <DialogWindowCheckAll
        participants={users.filter(el => el._id && allInputs[FieldDR.participants][0].includes(el._id)).map(el => `${el.surName} ${el.name}`)}
        date={stateDates[0][0]}
        course={courses.find(el => el._id == allInputs[FieldDR.subject][0])?.name?.split(';')[1] || ''}
        letterText={letterTextState[0]}
    />
    const allContent = [
        mainDialogWindow,
        dateTimeDialog,
        fillEmailDialogWindow,
        checkAllDialogWindow
    ];
    const hundleLeftButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (dialogPage < DP.checkAll) setDialogPage(dialogPage + 1)
        else {
            closeDialog();
            const inputData = allInputs.map(el => el[0]);
            const dateData = stateDates[0];

            const typeActivite = String(ActivitiesData.dialogWindowContent[FieldDR.type].variablesList[store.isEng].indexOf(inputData[FieldDR.type]))
            const typePeriodicity = String(ActivitiesData.dialogWindowContent[FieldDR.frequency].variablesList[store.isEng].indexOf(inputData[FieldDR.frequency]))
            const createResult = store.createNewRecordActivities([typeActivite, ...inputData.slice(1, 5), typePeriodicity], dateData)
            //if(createResult.){
            //    alert(1);
            //}else{
            //    alert(0);
            //}
        }
    }

    const hundleRightButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (dialogPage === DP.mainInfo) {
            for (let i = 0; i < allInputs.length - 1; i++) {
                allInputs[i][1]('');
                allInputsCheck[i][1](false);
                allInputsTextState[i][1]('');
            }
        } else {
            setDialogPage(dialogPage - 1);
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.dialog__wrapper}
        >
            <div className={styles.dialog__wrapper_inner}>
                <div className={styles.dialog__header}>
                    <h1>
                        {ActivitiesData.createActivity[store.isEng]}
                    </h1>
                    <img src='/svg/logo/close.svg' className={styles.dialog__close} onClick={closeDialog} />
                </div>
                <div className={styles.dialog__body}>
                    {allContent[dialogPage]}
                    <button
                        onClick={hundleRightButton}
                        className={
                            `${styles.navigationButton} ${styles.backButton} ${styles.activeButton}`}
                    >
                        {
                            dialogPage === DP.mainInfo
                                ? <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1299 17.0596H5.12988C4.71988 17.0596 4.37988 16.7196 4.37988 16.3096C4.37988 15.8996 4.71988 15.5596 5.12988 15.5596H13.1299C15.4699 15.5596 17.3799 13.6496 17.3799 11.3096C17.3799 8.96957 15.4699 7.05957 13.1299 7.05957H2.12988C1.71988 7.05957 1.37988 6.71957 1.37988 6.30957C1.37988 5.89957 1.71988 5.55957 2.12988 5.55957H13.1299C16.2999 5.55957 18.8799 8.13957 18.8799 11.3096C18.8799 14.4796 16.2999 17.0596 13.1299 17.0596Z" fill="white" />
                                    <path d="M4.42957 9.55988C4.23957 9.55988 4.04957 9.48988 3.89957 9.33988L1.33957 6.77988C1.04957 6.48988 1.04957 6.00988 1.33957 5.71988L3.89957 3.15988C4.18957 2.86988 4.66957 2.86988 4.95957 3.15988C5.24957 3.44988 5.24957 3.92988 4.95957 4.21988L2.92957 6.24988L4.95957 8.27988C5.24957 8.56988 5.24957 9.04988 4.95957 9.33988C4.81957 9.48988 4.61957 9.55988 4.42957 9.55988Z" fill="white" />
                                </svg>
                                : <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.52366 9.16591L10.9937 4.69591L9.81533 3.51758L3.33366 9.99924L9.81533 16.4809L10.9937 15.3026L6.52366 10.8326H16.667V9.16591H6.52366Z" fill="white" />
                                </svg>
                        }
                        <div className={styles.hiddendWord}>
                            {dialogPage === DP.mainInfo
                                ? 'Сброс'
                                : 'Назад'
                            }
                        </div>
                    </button>
                    <button
                        disabled={!correctFilling}
                        onClick={hundleLeftButton}
                        className={
                            `${styles.navigationButton} ${styles.forwardButton} ${correctFilling
                                ? styles.activeButton
                                : styles.passiveButton
                            }`
                        }
                    >
                        <div className={styles.hiddendWord}>
                            Далее
                        </div>
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.4763 9.16591L9.00634 4.69591L10.1847 3.51758L16.6663 9.99924L10.1847 16.4809L9.00634 15.3026L13.4763 10.8326H3.33301V9.16591H13.4763Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

const accessDenied = <div className={styles.accessDenied}>
    <h1>Доступ запрещён</h1>
</div>

enum IChangeCategory {
    All,
    Planned,
    Conducted,
    Cancelled,
}

interface FormatActivities {
    dateTime: Date;
    date: string;
    time: string;
    signature: string;
    typeActivities: string;
    isPast: boolean;
    isPostponed: boolean;
    isCancelled: boolean;
    subjectID: string;
    subjectName: string;
    lecturerID: string;
    lecturerName: string;
    title: string;
}

interface IActivities { }

const Activities: FC<IActivities> = () => {
    const { store } = useContext(Context);
    const [activites, setActivites] = useState<FormatActivities[]>([]);
    const [access, setAccess] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const lecruters = useRef<IUserR[]>([]);
    const users = useRef<IUserR[]>([]);
    const courses = useRef<ICourseR[]>([]);
    const [filterText, setFilterText] = useState('');
    const [isOpenCategoryMenu, setOpenCategoryMenu] = useState(false);
    const [categoryChange, setCategoryChange] = useState(0);
    const [tableLoader, setTableLoader] = useState(false);
    const [accessDeniedAnimationRefreshButton, setAccessDeniedAnimationRefreshButton] = useState(true)
    const [avatar, setAvatar] = useState<AvatarList>({});
    useEffect(() => {
        const avatarList: AvatarList = {}
        for (let user of users.current) {
            if (user.avatar)
                avatarList[user.avatar as string] = <PrivateImage imageName={user.avatar as string} />
        }
        if (avatarList) setAvatar(avatarList);
    }, [activites])
    const getActivitesList = () => {
        const response = store.getActivites(setAccess);
        response.then((result) => {
            if (result) {
                setActivites(toFormatActivities(result));
            }
        })
    }

    const fetchAllData = (loaderAnimate: boolean = true) => {
        if (loaderAnimate) setTableLoader(true);
        const response = fetchData();
        response.then(result => {
            if (result) {
                const { lecturersList, userList, courseList } = result;
                if (lecturersList && userList) {
                    lecruters.current = lecturersList;
                    users.current = userList;
                    courses.current = courseList;
                }
                getActivitesList()
            }
        }).finally(() => {
            if (loaderAnimate) setTimeout(() => {
                setTableLoader(false);
            }, 200);
        })

    }

    useEffect(() => {
        fetchAllData(!openDialog);
    }, [openDialog])


    const findNameSurnameByIdLecruter = (id: string) => {
        for (let lecruter of lecruters.current) {
            if (lecruter._id === id) {
                return `${lecruter.name} ${lecruter.surName}`;
            }
        }
        return id;
    }
    const findNameCourseById = (id: string) => {
        for (let course of courses.current) {
            if (course._id === id) {
                return course.name?.split(';')[store.isEng] || id;
            }
        }
        return id;
    }
    const filtredActivities = (filter: string) => {
        if (!(filter || categoryChange)) return activites;
        return activites.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(filter.toLowerCase())
            ) && (
                !categoryChange ||
                categoryChange === IChangeCategory.Planned && (!item.isPast) ||
                categoryChange === IChangeCategory.Conducted && (item.isPast) ||
                categoryChange === IChangeCategory.Cancelled && (item.isCancelled)
            ))
    }
    const toFormatActivities = (result: IActivites[]) => {
        const formatResult: FormatActivities[] = [];
        result.forEach(
            active => {
                const dateActivite = new Date(active.date);
                formatResult.push({
                    dateTime: dateActivite,
                    date: dateToStringDMY(dateActivite),
                    time: dateToStringHM(dateActivite),
                    isPast: isInPast(dateActivite),
                    signature: ActivitiesData.dialogWindowContent[0].variablesList[store.isEng][Number(active.signature)],
                    typeActivities: active.typeActivites,
                    isPostponed: false,
                    isCancelled: false,
                    subjectID: active.subject,
                    subjectName: findNameCourseById(active.subject),
                    lecturerID: active.lecturer,
                    lecturerName: findNameSurnameByIdLecruter(active.lecturer),
                    title: active.title,
                })
            }
        )
        return formatResult;
    }

    const content = []

    const visibleActivities = filtredActivities(filterText)
    for (let active of visibleActivities) {
        content.push(
            <div
                key={`notew-${active.subjectName}-${active.lecturerName}-${content.length}`}
                className={styles.notes}
                style={{
                    '--borderColor': active.isPast ? '#666666' : '#009AAD',
                    '--hoverBgColor': active.isPast ? 'rgba(102, 102, 102, 0.4)' : 'rgba(0, 154, 173, 0.2)',
                } as CSSProperties}
            >
                <div className={styles.datetimeTablet}>
                    <span className={styles.datePoint}>{active.date}</span>
                    <span className={styles.timePoint}>{active.time}</span>
                    {
                        active.isCancelled
                            ? <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={styles.closeSvg}>
                                <path d="M2 3L3 2L10.0533 9.05328L17 2L18 3L11 10L18 17L17 18L10.0533 11.0533L3 18L2 17L9 10L2 3Z"
                                    fill="#666666"
                                    stroke="#666666"
                                    strokeLinecap="round"
                                />
                            </svg>
                            :
                            active.isPast
                                ? <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={styles.completeSvg}>
                                    <path d="M5 11.6364L8.4323 15.0063C8.92564 15.4906 9.7499 15.3402 10.0404 14.7128L15 4"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="square"
                                    />
                                </svg>

                                : <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={styles.clockSvg}>
                                    <path d="M10.1195 18.4523C5.51709 18.4523 1.78613 14.7214 1.78613 10.119C1.78613 5.5166 5.51709 1.78564 10.1195 1.78564C14.7218 1.78564 18.4528 5.5166 18.4528 10.119C18.4477 14.7193 14.7197 18.4473 10.1195 18.4523ZM10.1195 3.45231C6.43757 3.45231 3.4528 6.43708 3.4528 10.119C3.4528 13.8009 6.43757 16.7856 10.1195 16.7856C13.8014 16.7856 16.7861 13.8009 16.7861 10.119C16.782 6.43879 13.7997 3.45644 10.1195 3.45231ZM14.2861 10.9523H9.28613V5.95231H10.9528V9.28564H14.2861V10.9523Z"
                                        fill="#999999" />
                                </svg>
                    }
                </div>
                <div>{active.signature}</div>
                <div>{active.subjectName}</div>
                <div>{active.lecturerName}</div>
                <div>{active.title}</div>
            </div>
        )
    }

    const categoriesRow = ActivitiesData.categories[store.isEng].map(
        (category, index) => <div
            className={styles.title_column}
            key={`categories-${index}`}
        >
            {category}
        </div>
    )
    const notActivites = <div className={styles.not_activites}>
        <h1>{ActivitiesData.noActivity[store.isEng]}</h1>
        <div className={styles.newRow}>
            <div
                className={styles.createNewRow}
                onClick={(e) => {
                    e.preventDefault();
                    setOpenDialog(true);
                }}
            >
                <div className={styles.createNewRowHeidenText}>
                    {ActivitiesData.newActivity[store.isEng]}
                </div>
                <img src="/svg/logo/plus.svg" alt="plus" />
            </div>
        </div>
    </div>

    const closeDialog = () => {
        setOpenDialog(false);
    }

    const categoryList = <>
        <div
            key={`Change-category-${ActivitiesData.changeCategory[store.isEng][categoryChange]}`}
            className={
                `${styles.changeActiviteButtonCategory} ${isOpenCategoryMenu
                    ? styles.changeActiviteButtonCategoryPassive
                    : ''
                }
                `}
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setOpenCategoryMenu(!isOpenCategoryMenu)
            }}
        >
            <img src="/svg/logo/pointer.svg" alt="pointer" className={styles.changeActiviteButtonPointer} />
            {ActivitiesData.changeCategory[store.isEng][categoryChange]}
        </div>
        {ActivitiesData.changeCategory[store.isEng].map(
            (categoryName, index) => index !== categoryChange && <div
                key={`Change-category-${categoryName}`}
                className={`${styles.changeActiviteButtonCategory} ${styles.changeActiviteButtonDropdawnPoints}`}
                onClick={() => {
                    setCategoryChange(index);
                    setOpenCategoryMenu(false);
                }}
            >
                {categoryName}
            </div>)}
    </>

    return (
        <div className={styles.wrapper}>
            <AnimatePresence>
                {openDialog && <DialogCreateActivite
                    closeDialog={closeDialog}
                    lecruters={lecruters.current}
                    users={users.current}
                    courses={courses.current}
                    avatar={avatar}
                />}
            </AnimatePresence>
            <div className={styles.header}>
                <div className={styles.header_title}>
                    {ActivitiesData.activePanel[store.isEng]}
                </div>
                <div>
                    <div className={styles.inputWrapper}>
                        <img src="/svg/logo/searchLoup.svg" alt="search" className={styles.inputSearchLoup} />
                        <input
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            type="text"
                            placeholder={ActivitiesData.whatWant[store.isEng]}
                        />
                    </div>
                    <div
                        className={styles.refreshActivitiesButton}
                        onClick={() => {
                            store.checkAuth(false, setTableLoader).then(result =>
                                fetchAllData()
                            )
                        }}
                        onMouseEnter={() => {
                            if (!access) setAccessDeniedAnimationRefreshButton(false);
                        }}
                        onMouseLeave={() => {
                            if (!access) setAccessDeniedAnimationRefreshButton(true);
                        }}
                    >
                        <div className={styles.refreshActivitiesButtonText}>
                            Обновить
                        </div>
                        {access
                            ? <img src="/svg/logo/refresh.svg" alt="refresh" />
                            : <svg
                                viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{ animationName: accessDeniedAnimationRefreshButton ? '' : 'none' }}
                            >
                                <g filter="url(#filter0_d_1388_500)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.6923 10C11.0747 10 11.3846 10.31 11.3846 10.6923V13.572C11.6562 13.2952 11.9714 13.0011 12.3305 12.707C13.8021 11.5014 16.029 10.2816 19 10.2816C23.988 10.2816 28 14.2384 28 19.1408C28 24.0447 23.9594 28 19 28C14.0406 28 10 24.0447 10 19.1408C10 18.7585 10.31 18.4485 10.6923 18.4485C11.0747 18.4485 11.3846 18.7585 11.3846 19.1408C11.3846 23.2578 14.7829 26.6154 19 26.6154C23.2171 26.6154 26.6154 23.2578 26.6154 19.1408C26.6154 15.0224 23.2428 11.6662 19 11.6662C16.4325 11.6662 14.5056 12.715 13.208 13.778C12.7674 14.139 12.4016 14.5 12.1109 14.8188H14.9893C15.3717 14.8188 15.6816 15.1287 15.6816 15.5111C15.6816 15.8934 15.3717 16.2034 14.9893 16.2034H10.6923C10.31 16.2034 10 15.8934 10 15.5111V10.6923C10 10.31 10.31 10 10.6923 10Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <filter id="filter0_d_1388_500" x="0" y="0" width="36" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1388_500" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        }
                    </div>
                    <div className={styles.changeActiviteButtonWrapper}>
                        <div
                            className={styles.changeActiviteButton}
                            style={{
                                height: isOpenCategoryMenu ? '13.33333vh' : '',
                            }}>
                            {categoryList}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.tableWrapper}>
                <div className={styles.tableWrapper__header}>
                    {categoriesRow}
                </div>
                <div
                    className={styles.tableWrapper__body}
                >
                    {tableLoader
                        ? <CubeAdder
                            wrapperStyle={{
                                width: '100%',
                                height: '73.42592vh',
                                borderRight: '0.05208vw solid #009aad',
                                borderLeft: '0.05208vw solid #009aad',
                            }}
                        />
                        : access
                            ? visibleActivities.length > 0
                                ? content
                                : notActivites
                            : accessDenied}
                </div>
                {visibleActivities.length > 0 && <div className={styles.newRow}>
                    <div
                        className={styles.createNewRow}
                        style={
                            visibleActivities.length >= 16 ? {
                                position: 'absolute',
                                bottom: '5.55556vh',
                            } : {}}
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenDialog(true);
                        }}
                    >
                        <div className={styles.createNewRowHeidenText}>
                            {ActivitiesData.newActivity[store.isEng]}
                        </div>
                        <img src="/svg/logo/plus.svg" alt="plus" />
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default observer(Activities)