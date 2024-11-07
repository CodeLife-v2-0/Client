import { FC, CSSProperties, HTMLAttributes, useEffect, useRef } from 'react'
import styles from './CompanyTitle.module.css'


interface ICompanyTitle extends HTMLAttributes<HTMLDivElement> {
    wrapperStyle?: CSSProperties;
    textStyle?: CSSProperties;
    additionalText?: string;
}


const CompanyTitle: FC<ICompanyTitle> = ({ wrapperStyle, textStyle, additionalText = '', ...props }) => {
    const additionalTextRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        if (additionalTextRef.current) {
            setTimeout(() => {
                if(additionalTextRef.current)
                additionalTextRef.current.style.opacity = '1'
            }, 10);
        }
    }, [additionalText])
    return (
        <div className={styles.company_title_wrapper} style={wrapperStyle} {...props}>
            <div
                className={styles.company_title}
                style={textStyle}
            >
                Code Live
                {additionalText && <div
                    className={styles.additionaalText}
                    ref={additionalTextRef}>
                    {additionalText}
                </div>}
            </div>
        </div>
    )
}

export default CompanyTitle