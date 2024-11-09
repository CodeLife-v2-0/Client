import { FC } from 'react'

interface ISvgForMatrix {
    data: number[][];
}

const isDigit = (char: string) => /^\d$/.test(char)

const shiftPath = (d: string, dx: number, dy: number) => {

    // разделитель команд - пустота
    // разделитель чисел - пробел
    // дробь - точка
    // MLY - x y
    // H - x
    // V - y
    // C - x y x y x y
    // SQ - x y x y
    // A - пока нет и надеюсь не будет
    // Z - пустота

    let newD = ''
    let currentComand = ''
    let countNumberInSet = 0
    let partNumber = ''
    for (let char of d) {
        if ("MLYHVCSQAZ".includes(char)) {
            if (partNumber) {
                const totalNumber = Number(partNumber)
                switch (currentComand) {
                    case 'M':
                    case 'L':
                    case 'Y':
                        // первое число x
                        if (countNumberInSet === 0) {
                            newD += String(totalNumber + dx)
                            countNumberInSet = 1
                        } else {
                            // вТорое y
                            newD += String(totalNumber + dy)
                        }
                        break;
                    case 'H':
                        // тут одно число - х
                        newD += String(totalNumber + dx)
                        break;
                    case 'V':
                        // тут одно число - y
                        newD += String(totalNumber + dy)
                        break;
                    case 'C':
                    case 'S':
                    case 'Q':
                        // несколько x и y подряд
                        if (countNumberInSet % 2 === 0) {
                            newD += String(totalNumber + dx)
                            countNumberInSet += 1
                        } else {
                            newD += String(totalNumber + dy)
                            countNumberInSet += 1
                        }
                        break;
                    case 'A':
                        // у нас их нет и надеюсь не будет
                        break;
                    case 'Z':
                        // за z не должно быть числа
                        break;
                }
                partNumber = ''
            }
            currentComand = char
            countNumberInSet = 0
            newD += currentComand

        } else if (isDigit(char) || char === '.') {
            partNumber += char
        }
        else if (char === ' ') {
            const totalNumber = Number(partNumber)
            switch (currentComand) {
                case 'M':
                case 'L':
                case 'Y':
                    // первое число x
                    if (countNumberInSet === 0) {
                        newD += String(totalNumber + dx)
                        countNumberInSet = 1
                    } else {
                        // вТорое y
                        newD += String(totalNumber + dy)
                    }
                    break;
                case 'H':
                    // тут одно число - х
                    newD += String(totalNumber + dx)
                    break;
                case 'V':
                    // тут одно число - y
                    newD += String(totalNumber + dy)
                    break;
                case 'C':
                case 'S':
                case 'Q':
                    // несколько x и y подряд
                    if (countNumberInSet % 2 === 0) {
                        newD += String(totalNumber + dx)
                        countNumberInSet += 1
                    } else {
                        newD += String(totalNumber + dy)
                        countNumberInSet += 1
                    }
                    break;
                case 'A':
                    // у нас их нет и надеюсь не будет
                    break;
                case 'Z':
                    // за z не должно быть числа
                    break;
            }
            partNumber = ''
            
            newD += ' '
        }
    }
    return newD
}
const svgSet = [
    {
        filling: 'M1.88043 4L1.38043 3.61217L2 2.72243L1 2.38023L1.18478 1.76426L2.18478 2.10646V1H2.81522V2.10646L3.80435 1.76426L4 2.38023L3 2.72243L3.61957 3.61217L3.11957 4L2.5 3.11027L1.88043 4Z',
        color: '7B7B7B'
    },
    {
        filling: 'M4.5 0.5H0.5V4.5H4.5V0.5Z',
        color: '7B7B7B'
    },
    {
        filling: 'M4 2.50774C4 3.0547 3.96682 3.50361 3.90047 3.85449C3.83412 4.20021 3.73223 4.46852 3.59479 4.65944C3.50948 4.77296 3.37678 4.8581 3.19668 4.91486C3.02133 4.97162 2.7891 5 2.5 5C2.20142 5 1.96446 4.97162 1.7891 4.91486C1.61848 4.8581 1.48815 4.7678 1.3981 4.64396C1.1327 4.27761 1 3.56553 1 2.50774C1 1.97626 1.03318 1.52993 1.09953 1.16873C1.17062 0.807533 1.27014 0.536636 1.3981 0.356037C1.48815 0.232198 1.61848 0.141899 1.7891 0.0851391C1.96446 0.0283797 2.20142 0 2.5 0C3.01185 0 3.35782 0.0928793 3.53791 0.278638C3.68957 0.433436 3.80332 0.699174 3.87915 1.07585C3.95972 1.45253 4 1.92982 4 2.50774ZM2.5 4.40402C2.69905 4.40402 2.8436 4.39112 2.93365 4.36532C3.02844 4.33953 3.09716 4.29567 3.13981 4.23375C3.28673 4.04283 3.36019 3.46749 3.36019 2.50774C3.36019 2.2291 3.35308 1.98658 3.33886 1.78019C3.32938 1.56863 3.3128 1.38545 3.2891 1.23065L2.08768 4.37306C2.17773 4.3937 2.31517 4.40402 2.5 4.40402ZM1.63981 2.50774C1.63981 2.75542 1.64455 2.97988 1.65403 3.18111C1.66351 3.37719 1.67773 3.55005 1.69668 3.69969L2.84834 0.588235C2.75355 0.572755 2.63744 0.565016 2.5 0.565016C2.28673 0.565016 2.13033 0.583075 2.03081 0.619195C1.93602 0.650155 1.86967 0.704334 1.83175 0.781734C1.7654 0.915893 1.71564 1.12487 1.68246 1.40867C1.65403 1.68731 1.63981 2.05366 1.63981 2.50774Z',
        color: 'BBBBBB'
    },
    {
        filling: 'M2.75 0.8L1.5 1.86V0.97L2.72 0H3.5V5H2.75V0.8Z',
        color: 'BBBBBB'
    },
    {
        filling: 'M5.00001 0H0V5H5.00001V0Z',
        color: 'FFFFFF'
    },
]

const volumeImg = 5;
const gap = 1;
const totalSize = volumeImg + gap

enum content {
    path,
    color
}

const SvgForMatrix: FC<ISvgForMatrix> = ({ data }) => {
    const rowAmount = data.length;
    const columnAmount = data[0].length;
    const innerSvgs: [string, string][] = []
    for (let rowNumber = 0; rowNumber < rowAmount; rowNumber++) {
        for (let columnNumber = 0; columnNumber < columnAmount; columnNumber++) {
            const numSvgData = data[rowNumber][columnNumber]
            if (numSvgData) {
                const currentSvgData = svgSet[numSvgData - 1]
                innerSvgs.push(
                    [
                        shiftPath(currentSvgData.filling, totalSize * columnNumber, totalSize * rowNumber),
                        currentSvgData.color
                    ]
                )
            }
        }
    }
    return (
        <svg
            viewBox={`0 0 ${columnAmount * totalSize - 1} ${rowAmount * totalSize - 1} `}
            fill='none'
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: (columnAmount * totalSize - 1) / 19.2 + 'vw'
            }}
        >
            {innerSvgs.map((pathData, index) => <path d={pathData[content.path]} fill={`#${pathData[content.color]}`} key={index} />)}
        </svg>
    )
}

export default SvgForMatrix