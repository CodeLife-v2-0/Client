import {FC} from 'react'
import CircularIcon from '../CircularIcon/CircularIcon'
import styles from './CircularIconPanel.module.css'

interface ICircularIconPanel{
    dataIcons: string[]
}

const CircularIconPanel:FC<ICircularIconPanel> = ({ dataIcons, ...props }) => {
    const IconsPanel = dataIcons.map(
        (element, index) =>
            <CircularIcon
                imgSrc={element}
                key={`authorization-icon-${index}`}
            />
    );
    return (
        <div className={styles.icons_panel} {...props}>
            {IconsPanel}
        </div>
    )
}

export default CircularIconPanel