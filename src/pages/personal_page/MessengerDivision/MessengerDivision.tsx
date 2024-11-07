import {  FC, useState, Dispatch, SetStateAction } from 'react'

interface IMessengerDivision {
    activeChatIdState: [string, Dispatch<SetStateAction<string>>]
}

const MessengerDivision: FC<IMessengerDivision> = ({activeChatIdState}) => {
    const [activeChatId, setActiveChatId] = activeChatIdState;
    return (
        <div>Id выбранного чата: {activeChatId}</div>
    )
}

export default MessengerDivision