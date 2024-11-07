import { FC, useContext } from 'react'
import styles from './UnderFinder.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'


const data = {
    1: ['Программирование', 'Дизайн'],
    2: ['Новые курсы', 'Скидки на курсы'],
    3: ['Курсы обучающие профессии']
}
const data2 = {
    1: ['Programming', 'Disain'],
    2: ['New courses', 'Discounts'],
    3: ['Courses teaching professions']
}

const UnderFinder: FC = () => {
    const { store } = useContext(Context);
    const UnderFinderBlock = []
    const curdata = store.isEng ? data2 : data
    for (let numberRow in curdata) {
        const row = curdata[(parseInt(numberRow)) as keyof typeof curdata];
        const wordLengths = row.map((word: string) => word.length);
        const sum = wordLengths.reduce((a: number, b: number) => a + b, 0);
        const row_content = row.map((block_content) => {
            return (
                <div
                 className={styles.row_element}
                  style={{ width: 100 * (block_content.length / sum) - 1 * (row.length - 1) + '%' }}
                  key={`underFinder-block-${block_content}`}
                  >
                    {block_content}
                </div>
            )
        })
        UnderFinderBlock.push(
            <div className={styles.row} key={`row-number-${numberRow}`}>
                {row_content}
            </div>
        )
    }
    return (
        <div className={styles.wrapper}>
            {UnderFinderBlock}
        </div>
    )
}

export default observer(UnderFinder)