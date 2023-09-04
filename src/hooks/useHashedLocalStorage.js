import { useState } from "react";
import bcrypt from "bcryptjs";

export default function useHashedLocalStorage(key, salt, transformValue = value => value) {

    const hashValue = (value) => {
        return bcrypt.hashSync(value, salt);
    }

    const getValue = () => {
        const itemString = localStorage.getItem(key);
        const item = JSON.parse(itemString);
        return item;
    }

    const [storedValue, setStoredValue] = useState(getValue());

    const saveValue = (value) => {
        if (value === "") {
            removeValue();
            return;
        }
        const transformedValue = transformValue(value);
        const hashedValue = hashValue(transformedValue);
        localStorage.setItem(key, JSON.stringify(hashedValue));
        setStoredValue(hashedValue);
    }

    const removeValue = () => {
        localStorage.removeItem(key);
        setStoredValue(undefined);
    }

    const validate = (value) => {
        return storedValue === hashValue(transformValue(value));
    }

    return {
        hashValue,
        setValue: saveValue,
        removeValue,
        validateValue: validate
    }
}

export function usePassword() {
    const FIXED_SALT = "$2a$10$Fz7YTLrzWgJb4cULtr0Mt."
    const { hashValue: hashPassword, setValue: setPassword, validateValue: validatePassword } = useHashedLocalStorage("password", FIXED_SALT);

    return {
        hashPassword,
        setPassword,
        validatePassword
    }
}


export function useUsername() {
    const FIXED_SALT = "$2a$12$9C3yfLfPx7CtSd5jYBFZqe";
    const { hashValue: hashUsername, setValue: setUsername, validateValue: validateUsername } = useHashedLocalStorage("username", FIXED_SALT);

    return {
        hashUsername,
        setUsername,
        validateUsername
    }
}