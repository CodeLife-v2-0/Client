import { FC } from 'react'
import styles from './ResultDivision.module.css'


type Content = {
    title: string;
    text: string;
    logo: string;
}

type ResultData = {
    title: string;
    align: string;
    content: Content[];
}[]

interface IResultDivision {
    data: ResultData
}

const ResultDivision: FC<IResultDivision> = ({ data }) => {
    const content = [];
    for (let contentBlockData of data) {
        const innerContent = contentBlockData.content.map(
            (tile) => <div className={styles.mainTileWrapper}>
                <div className={styles.innerTileWrapper}>
                    <div className={styles.leftTile}>
                        <div className={styles.titleTile}>
                            {tile.title.toUpperCase()}
                        </div>
                        <div className={styles.bodyTile}>
                            {tile.text}
                        </div>
                    </div>
                    <div className={styles.rightTile}>
                        <img src={`img/courses_data/${tile.logo}.png`} alt="123" />
                    </div>
                </div>
            </div>
        );
        const contentBlock = <div className={styles.content_block} >
            <div className={styles.titleBlock} style={{alignSelf: contentBlockData.align}}>
                {contentBlockData.title}
            </div>
            <div className={styles.tiles}>
                {innerContent}
            </div>
        </div>
        content.push(contentBlock);
    }
    return (
        <div className={styles.wrapper}>
            {content}
        </div>
    )
}

export default ResultDivision