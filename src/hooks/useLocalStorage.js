import { useState } from "react";

export default function useLocalStorage(key, transformValue = value => value) {

    const getValue = () => {
        const itemString = localStorage.getItem(key);
        const item = JSON.parse(itemString);
        return transformValue(item);
    }

    const [storedValue, setStoredValue] = useState(getValue());

    const saveValue = (value) => {
        if(value === "") {
            removeValue();
            return;
        }
        const transformedValue = transformValue(value);
        localStorage.setItem(key, JSON.stringify(transformedValue));
        setStoredValue(transformValue);
    }

    const removeValue = () => {
        localStorage.removeItem(key);
        setStoredValue(undefined);
    }

    return {
        setValue: saveValue,
        value: storedValue,
        removeValue
    }
}

export function useToken() {
    const { value: token, setValue: setToken, removeValue: removeToken } = useLocalStorage("token");

    return {
        token,
        setToken,
        removeToken,
    };
}