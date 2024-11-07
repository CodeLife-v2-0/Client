import { FC, ReactNode, MouseEvent } from 'react';
import classes from './AuthButton.module.css';

interface IDesignButton {
    children: ReactNode;
    switchFunc: () => void;
    serverFunc?: () => void;
    checkStates?: [string, React.Dispatch<React.SetStateAction<boolean>>][];
}

enum FieldTypes {
    Field = 0,
    Error = 1
}

enum FieldNames {
    email = 0,
    password = 1,
    name = 2,
    surName = 3,
    passwordRepeat = 4,
}

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\/\(\)-=/\|_"№;:?])[A-Za-z\d!@#$%^&*\/\(\)-=/\|_"№;:?]{5,}$/;
    return passwordRegex.test(password);
};

const validateName = (name: string): boolean => {
    return name.length >= 2;
};

const validateSurname = (surname: string): boolean => {
    return surname.length >= 2;
};

const validatePasswordRepeat = (passwordRepeat: string, password: string): boolean => {
    return passwordRepeat.length > 2 && passwordRepeat === password;
};

const DesignButton: FC<IDesignButton> = ({ children, switchFunc, serverFunc, checkStates }) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (checkStates?.length) {
            let validateResult = true;

            const login = checkStates[FieldNames.email][FieldTypes.Field];
            const loginError = checkStates[FieldNames.email][FieldTypes.Error];
            const password = checkStates[FieldNames.password][FieldTypes.Field];
            const passwordError = checkStates[FieldNames.password][FieldTypes.Error];

            const isLoginValid = validateEmail(login);
            if (!isLoginValid) {
                validateResult = false;
                loginError(true);
            } else {
                loginError(false);
            }

            const isPasswordValid = validatePassword(password);
            if (!isPasswordValid) {
                validateResult = false;
                passwordError(true);
            } else {
                passwordError(false);
            }

            if (checkStates.length > 2) {
                const name = checkStates[FieldNames.name][FieldTypes.Field];
                const surname = checkStates[FieldNames.surName][FieldTypes.Field];
                const passwordRepeat = checkStates[FieldNames.passwordRepeat][FieldTypes.Field];
                const nameError = checkStates[FieldNames.name][FieldTypes.Error];
                const surnameError = checkStates[FieldNames.surName][FieldTypes.Error];
                const passwordRepeatError = checkStates[FieldNames.passwordRepeat][FieldTypes.Error];

                const isNameValid = validateName(name);
                if (!isNameValid) {
                    validateResult = false;
                    nameError(true);
                } else {
                    nameError(false);
                }

                const isSurnameValid = validateSurname(surname);
                if (!isSurnameValid) {
                    validateResult = false;
                    surnameError(true);
                } else {
                    surnameError(false);
                }

                const isPasswordRepeatValid = validatePasswordRepeat(passwordRepeat, password);
                if (!isPasswordRepeatValid) {
                    validateResult = false;
                    passwordRepeatError(true);
                } else {
                    passwordRepeatError(false);
                }
            }

            if (validateResult && serverFunc) {
                serverFunc();
            }

            if (!serverFunc) {
                switchFunc();
            }
        } else {
            switchFunc();
        }
    };

    return (
        <button className={classes.DesignButton} onClick={handleClick}>
            {children}
        </button>
    );
};

export default DesignButton;
