import { FC, ReactNode, useState, Dispatch, SetStateAction } from 'react'
import styles from './ParticipantsSelectionWindow.module.css'
import { IUserR } from '../../../../../models/IUserR'
import { AvatarList } from '../Activities';

interface IRecord {
    user: IUserR,
    avatar: ReactNode,
    dataState: [string, Dispatch<SetStateAction<string>>],
}

const Record: FC<IRecord> = ({
    user,
    avatar,
    dataState,
}) => {
    console.log(avatar);
    const [participants, setParticipants] = dataState;
    const isSelected = participants.includes(user._id);
    return <div className={styles.record} key={user._id}>
        <div className={styles.recordAvatarBlock}>
            {avatar}
        </div>
        <div className={styles.infoBlock}>
            <div>{user.surName} {user.name}</div>
            <div>{
                user.subjects
                    ? `Изучаемые предметы: ${user.subjects}`
                    : 'Нет изучаемых предметов'
            }</div>
        </div>
        <div className={styles.checkPointWrapper}>
            <div className={styles.checkPoint} onClick={() => {
                if (isSelected) setParticipants(
                    participants.split(';').filter(
                        userID => userID !== user._id).join(';')
                );
                else setParticipants(participants + ';' + user._id)
            }}
            >
                {isSelected && <div className={styles.checkPointSignature} />}
            </div>
        </div>
    </div>
}

interface IParticipantsSelectionWindow {
    users: IUserR[],
    avatar: AvatarList,
    dataState: [string, Dispatch<SetStateAction<string>>],
}

const ParticipantsSelectionWindow: FC<IParticipantsSelectionWindow> = ({
    users,
    avatar,
    dataState
}) => {
    const [searchText, setSearchText] = useState('');
    const participants = dataState[0];
    const filtredUsers = users.filter(user => (
        (user.name + user.surName).toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        || (user.surName + user.name).toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    ))
    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder='Поиск'
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                />
                <img src="/svg/logo/searchLoupWhite.svg" alt="search" />
            </div>
            {searchText
                ? filtredUsers.map(
                    user => <Record
                        dataState={dataState}
                        user={user}
                        avatar={user.avatar && avatar[user.avatar]}
                    />
                )
                : participants.split(';').map(
                    userId => {
                        const user = users.find(userData => userData._id == userId);
                        if (user) return <Record
                            dataState={dataState}
                            user={user}
                            avatar={user.avatar && avatar[user.avatar]}
                        />
                    }
                )}
        </div>
    )
}

export default ParticipantsSelectionWindow