import useAuthenticationState from "../hooks/useAuthenticationState";
import { handleLogin } from "../hooks/useLogin";
import PropTypes from "prop-types";

import { useToken } from "../../../hooks/useLocalStorage";
import { useUsername, usePassword } from "../../../hooks/useHashedLocalStorage";

import style from "./LoginForm.module.css"

export default function LoginForm() {

    const { username, password, setUsername, setPassword } = useAuthenticationState();

    const { hashUsername, setUsername: setHashedUsername } = useUsername();
    const { hashPassword, setPassword: setHashedPassword } = usePassword();
    const { setToken } = useToken();

    const handleSubmit = e => {
        e.preventDefault();
        const hashedUsername = hashUsername(username);
        const hashedPassword = hashPassword(password);
        handleLogin(hashedUsername, setHashedUsername, hashedPassword, setHashedPassword, setToken);
    }

    const onClickCreate = () => {
        const hashedUsername = hashUsername(username);
        const hashedPassword = hashPassword(password);
        fetch("http://aaronmuetze.ddns.net:8080/player", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: hashedUsername, password: hashedPassword })
        })
    }

    return (
        <form className={style["login-form"]} onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" autoComplete="username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Passwort" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="dark">Submit</button>
            <button type="button" onClick={onClickCreate} className="dark">Create</button>
        </form>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
}