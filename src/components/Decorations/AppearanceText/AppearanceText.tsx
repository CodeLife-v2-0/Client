import {FC} from 'react'

interface IAppearanceText{
    letter: String,
    doAnimation: boolean,
}

const AppearanceText: FC<IAppearanceText> = ({ letter, doAnimation }) => {
    return (
        <span className="appearance__text" style={{opacity: `${doAnimation ? 0 : 1}`, display: 'inline-block'}}>{letter}&nbsp;</span>
    )
}

export default AppearanceText;